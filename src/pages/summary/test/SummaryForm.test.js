import { render, fireEvent, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

test('default values are correct', async () => {
	render(<SummaryForm />);
	//checkbox is unchecked by default
	const checkbox = await screen.findByRole('checkbox', { name: 'I agree to Terms adnd Conditions' });
	expect(checkbox).not.toBeChecked();

	// button is disabled by default
	const button = await screen.findByRole('button', {name : 'Confirm Order'});
	expect(button).toBeDisabled();
});

test('clicking checkbox enables button', async () => {
	render(<SummaryForm />);

	const checkbox = await screen.findByRole('checkbox', { name: "I agree to Terms and Conditions" });
	const button = await screen.findByRole('button', { name: 'Confirm Order' });

	fireEvent.click(checkbox);

	expect(checkbox).toBeChecked();
	expect(button).toBeEnabled();

	fireEvent.click(checkbox);

	expect(checkbox).not.toBeChecked();
	expect(button).toBeDisabled();
});
