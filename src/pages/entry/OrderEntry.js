import React from 'react';
import { useOrderDetails } from '../../contexts/OrderDetails';
import Options from './Options';
const OrderEntry = () => {
	const [orderDetails] = useOrderDetails();

	return (
		<>
			<Options optionType="scoops" />
			<Options optionType="toppings" />
			<h2 data-testid="grand-total">Grand Total: {orderDetails.totals.grandTotal}</h2>
		</>
	);
};
export default OrderEntry;
