import { render, screen } from '../../../test-utils/testing-library-utils';

import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import Options from '../Options';
import OrderEntry from '../OrderEntry';
import { WorkflowProvider } from '../../../contexts/Workflow';

test('update scoop subtotal when scoops change', async () => {
	render(<Options optionType="scoops" />);

	//make sure total starts at $0.00
	const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
	expect(scoopsSubtotal).toHaveTextContent('0.00');

	//update vanilla scoops to 1 and check subtotal
	const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, '1');
	expect(scoopsSubtotal).toHaveTextContent('2.00');

	//update choc. scoops to 2 and check substotal
	const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
	userEvent.clear(chocolateInput);
	userEvent.type(chocolateInput, '2');
	expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when toppings change', async () => {
	render(<Options optionType="toppings" />);

	const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });

	expect(toppingsSubtotal).toHaveTextContent('0.00');

	// const checkbox = await screen.findByRole('checkbox', { name: "Hot fudge", exact:false });
	const checkbox = await screen.findByTestId('toppings-Hot fudge');
	const anotherCheckbox = await screen.findByTestId('toppings-Cherries');

	userEvent.click(checkbox);
	expect(checkbox).toBeChecked();
	expect(toppingsSubtotal).toHaveTextContent('1.50');

	userEvent.click(checkbox);
	expect(checkbox).not.toBeChecked();
	expect(toppingsSubtotal).toHaveTextContent('0.00');

	userEvent.click(checkbox);
	userEvent.click(anotherCheckbox);

	expect(checkbox).toBeChecked();
	expect(anotherCheckbox).toBeChecked();
	expect(toppingsSubtotal).toHaveTextContent('3.00');

	userEvent.click(anotherCheckbox);
	expect(checkbox).toBeChecked();
	expect(anotherCheckbox).not.toBeChecked();
	expect(toppingsSubtotal).toHaveTextContent('1.50');
	userEvent.click(checkbox);
	expect(checkbox).not.toBeChecked();
	expect(toppingsSubtotal).toHaveTextContent('0.00');
});

describe('grand total', () => {
	test('grand total updates properly if scoop is added first', async () => {
		render(
			<WorkflowProvider>
				<OrderEntry />
			</WorkflowProvider>
		);
		const grandTotal = await screen.findByTestId('grand-total');

		expect(grandTotal).toHaveTextContent('Grand Total: $0.00');
		const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, '1');

		expect(grandTotal).toHaveTextContent('2.00');

		const hotFudge = await screen.findByTestId('toppings-Hot fudge');
		userEvent.click(hotFudge);
		expect(grandTotal).toHaveTextContent('3.50');
	});

	test('grand total updates properly if topping is added first', async () => {
		render(
			<WorkflowProvider>
				<OrderEntry />
			</WorkflowProvider>
		);
		const grandTotal = await screen.findByTestId('grand-total');

		const hotFudge = await screen.findByTestId('toppings-Hot fudge');
		userEvent.click(hotFudge);
		expect(grandTotal).toHaveTextContent('1.50');

		const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, '1');

		expect(grandTotal).toHaveTextContent('3.50');
	});

	test('grand total updates properly if item is removed', async () => {
		render(
			<WorkflowProvider>
				<OrderEntry />
			</WorkflowProvider>
		);
		const grandTotal = await screen.findByTestId('grand-total');

		const hotFudge = await screen.findByTestId('toppings-Hot fudge');
		userEvent.click(hotFudge);

		const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, '1');

		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, '0');

		expect(grandTotal).toHaveTextContent('1.50');

		userEvent.click(hotFudge);
		expect(grandTotal).toHaveTextContent('0.00');
	});
});
