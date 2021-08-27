import React, { useEffect, useState } from 'react';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { useWorkflow } from '../../contexts/Workflow';
import Options from './Options';
const OrderEntry = () => {
	const [orderDetails, updateItemCount, reset] = useOrderDetails();
	const [numScoops, setNumScoops] = useState(orderDetails.scoops.size);
	const { setOrderPhase } = useWorkflow();
	const [validInputs, setValidInputs] = useState(true);
	useEffect(() => {
		/* Reset the count */
		reset();
	}, []);

	useEffect(() => {
		[...orderDetails.scoops.values()].map((scoop) => {
			if (scoop < 0) {
				setValidInputs(false);
			} else {
				setValidInputs(true);
			}
			return null;
		});
		console.log(orderDetails.scoops);
		setNumScoops(orderDetails.scoops.size);
	}, [orderDetails]);

	return (
		<>
			<Options optionType="scoops" validInputs={validInputs} numScoops={numScoops} />
			<Options optionType="toppings" validInputs={validInputs} numScoops={numScoops} />
			<h2 data-testid="grand-total">Grand Total: {validInputs ? orderDetails.totals.grandTotal : '$0.00'}</h2>
			<button disabled={numScoops > 0 && validInputs ? null : 'disabled'} onClick={() => setOrderPhase('review')}>
				Order Sundae!
			</button>
		</>
	);
};
export default OrderEntry;
