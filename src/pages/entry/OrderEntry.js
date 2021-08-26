import React, { useEffect } from 'react';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { useWorkflow } from '../../contexts/Workflow';
import Options from './Options';
const OrderEntry = () => {
	const [orderDetails, updateItemCount, reset] = useOrderDetails();
	const { setOrderPhase } = useWorkflow();

	const numOfScoops = orderDetails.scoops.size;
	
	useEffect(() => {
		/* Reset the count */
		reset();
	}, []);
	
	return (
		<>
			<Options optionType="scoops" />
			<Options optionType="toppings" />
			<h2 data-testid="grand-total">Grand Total: {orderDetails.totals.grandTotal}</h2>
			<button disabled={numOfScoops > 0 ? null : 'disabled'} onClick={() => setOrderPhase('review')}>
				Order Sundae!
			</button>
		</>
	);
};
export default OrderEntry;
