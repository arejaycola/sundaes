import React, { useEffect, useState } from 'react';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { useWorkflow } from '../../contexts/Workflow';
import Options from './Options';
const OrderEntry = () => {
	const [orderDetails, updateItemCount, reset] = useOrderDetails();
	const { setOrderPhase } = useWorkflow();
	const [validInput, setValidInput] = useState(true);
	useEffect(() => {
		/* Reset the count */
		reset();
	}, []);

	const numOfScoops = orderDetails.scoops.size;

	useEffect(() => {
		[...orderDetails.scoops.values()].map((scoop) => {
			if (scoop < 0) {
				setValidInput(false);
			} else {
				setValidInput(true);
			}
			return null;
		});
	}, [orderDetails]);

	return (
		<>
			<Options optionType="scoops" />
			<Options optionType="toppings" />
			<h2 data-testid="grand-total">Grand Total: {orderDetails.totals.grandTotal}</h2>
			<button disabled={numOfScoops > 0 && validInput ? null : 'disabled'} onClick={() => setOrderPhase('review')}>
				Order Sundae!
			</button>
		</>
	);
};
export default OrderEntry;
