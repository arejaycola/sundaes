import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useWorkflow } from '../../contexts/Workflow';

const OrderConfirmation = () => {
	const [orderNumber, setOrderNumber] = useState(null);
	const { setOrderPhase } = useWorkflow();

	const submitData = async () => {
		const response = await axios.post('http://localhost:3030/order');
		setOrderNumber(response.data.orderNumber);
	};

	useEffect(() => {
		submitData();
	}, []);

	return (
		<>
			<h2>Thank you!</h2>
			<p>
				Your order number is #{orderNumber}
			</p>
			<button onClick={() => setOrderPhase('inProgress')}>Create new order</button>
		</>
	);
};
export default OrderConfirmation;
