import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('default values are correct', async () => {
	render(<SummaryForm />);
	//checkbox is unchecked by default
	const checkbox = await screen.findByRole('checkbox', { name: 'I agree to Terms and Conditions' });
	expect(checkbox).not.toBeChecked();

	// button is disabled by default
	const button = await screen.findByRole('button', { name: 'Confirm Order' });
	expect(button).toBeDisabled();
});

test('clicking checkbox enables button', async () => {
	render(<SummaryForm />);

	const checkbox = await screen.findByRole('checkbox', { name: 'I agree to Terms and Conditions' });
	const button = await screen.findByRole('button', { name: 'Confirm Order' });

	userEvent.click(checkbox);

	expect(checkbox).toBeChecked();
	expect(button).toBeEnabled();

	userEvent.click(checkbox);

	expect(checkbox).not.toBeChecked();
	expect(button).toBeDisabled();
});

test('popover responds to hover', async () => {
	render(<SummaryForm />);

	//popover starts hidden
	const nullPopover = screen.queryByText('No ice cream will actually be delivered');
	expect(nullPopover).not.toBeInTheDocument();

	//popover appers upon mouseover of checkbox label
	const termsAndConditions = screen.getByText('Terms and Conditions');
	userEvent.hover(termsAndConditions);

	const popover = screen.getByText('No ice cream will actually be delivered');
	expect(popover).toBeInTheDocument();

	//popover disappears when we mouse out
	userEvent.unhover(termsAndConditions);
	await waitForElementToBeRemoved(() => screen.queryByText('No ice cream will actually be delivered'));
	
	const nullPopoverAgain = screen.queryByText('No ice cream will actually be delivered');
	expect(nullPopoverAgain).not.toBeInTheDocument();
});
