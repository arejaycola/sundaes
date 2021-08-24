import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
	//render app
	render(<App />);

	//add ice cream scoops and toppings
	const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
	const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });

	userEvent.clear(vanillaInput);
	userEvent.clear(chocolateInput);

	userEvent.type(vanillaInput, '2');
	userEvent.type(chocolateInput, '1');

	const hotFudge = await screen.findByTestId('toppings-Hot fudge');
	const cherries = await screen.findByTestId('toppings-Cherries');

	userEvent.click(hotFudge);
	userEvent.click(cherries);

	// find and click order button
	const orderButton = await screen.findByRole('button', { name: 'Order Sundae!' });
	userEvent.click(orderButton);

	// check summary infomeaion based on order
	const scoopsTotal = screen.getByText(/Scoops:/i);
	expect(scoopsTotal).toHaveTextContent('$6.00');

	const toppingsTotal = screen.getByText(/Toppings:/i);
	expect(toppingsTotal).toHaveTextContent('$3.00');

	// accept terms and conditions and click button to confirm order
	const tAndC = screen.getByRole('checkbox', { name: /I agree to Terms and Conditions/i });
	userEvent.click(tAndC);

	const confirmOrderButton = screen.getByRole('button', { name: 'Confirm Order' });
	userEvent.click(confirmOrderButton);

	// confirm order number on confirmation page
	const orderNumber = await screen.findByText('Your order number is #8675309');
	expect(orderNumber).toBeInTheDocument();

	// click new order button on confirmation page
	const newOrderButton = await screen.findByRole('button', { name: 'Create new order' });
	userEvent.click(newOrderButton);

	// check scoops and toppings subtotals have been reset
	const scoopsSubtotal = await screen.findByText('Scoops total: $', { exact: false });
	expect(scoopsSubtotal).toHaveTextContent('0.00');

	const toppingsSubtotal = await screen.findByText('Toppings total: $', { exact: false });
	expect(toppingsSubtotal).toHaveTextContent('0.00');
});
