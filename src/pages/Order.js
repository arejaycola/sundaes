import React from 'react';
import { useWorkflow } from '../contexts/Workflow';
import OrderEntry from './entry/OrderEntry';
import OrderConfirmation from './OrderConfirmation/OrderConfirmation';
import OrderSummary from './summary/OrderSummary';

const Order = () => {
	const { orderPhase } = useWorkflow();

	return (
		<>
			{orderPhase === 'inProgress' && <OrderEntry />}
			{orderPhase === 'review' && <OrderSummary />}
			{orderPhase === 'complete' && <OrderConfirmation />}
		</>
	);
};
export default Order;
