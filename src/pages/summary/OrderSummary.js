import React from 'react';
import { useOrderDetails } from '../../contexts/OrderDetails';
import SummaryForm from './SummaryForm';
const OrderSummary = () => {
	const [orderDetails] = useOrderDetails();

	const toppingsCount = orderDetails.toppings.size;
	return toppingsCount > 0 ? (
		<>
			<h2>Order Summary: </h2>
			<h3>Scoops: {orderDetails.totals.scoops}</h3>
			<ul>
				{[...orderDetails.scoops.keys()].map((scoop) => {
					return (
						<li key={scoop}>
							{orderDetails.scoops.get(scoop)} {scoop}
						</li>
					);
				})}
			</ul>
			<br />

			<h2>Toppings: {orderDetails.totals.toppings}</h2>
			<ul>
				{[...orderDetails.toppings.keys()].map((topping) => {
					return (
						<li key={topping}>
							{orderDetails.scoops.get(topping)} {topping}
						</li>
					);
				})}
			</ul>
			<SummaryForm />
		</>
	) : (
		<>
			<h2>Order Summary: </h2>
			<h3>Scoops: {orderDetails.totals.scoops}</h3>
			<ul>
				{[...orderDetails.scoops.keys()].map((scoop) => {
					return (
						<li key={scoop}>
							{orderDetails.scoops.get(scoop)} {scoop}
						</li>
					);
				})}
			</ul>
			<SummaryForm />
		</>
	);
};
export default OrderSummary;
