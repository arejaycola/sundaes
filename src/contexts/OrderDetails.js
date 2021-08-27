import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { pricePerItem } from '../constants';
import { formatCurrency } from '../utilities';

const OrderDetails = createContext();

//create custom hook to check where we are inside a provider
export const useOrderDetails = () => {
	const context = useContext(OrderDetails);

	if (!context) {
		throw Error('userOrderDetails must be used within an OrderDetailsProvider');
	}

	return context;
};

const calculateSubTotal = (optionType, optionCounts) => {
	let optionCount = 0;
	for (const count of optionCounts[optionType].values()) {
		optionCount += count;
	}

	return optionCount * pricePerItem[optionType];
};

export const OrderDetailsProvider = (props) => {
	const [optionCounts, setOptionCounts] = useState({ scoops: new Map(), toppings: new Map() });

	const zeroCurrency = formatCurrency(0);

	const [totals, setTotals] = useState({
		scoops: zeroCurrency,
		toppings: zeroCurrency,
		grandTotal: zeroCurrency,
	});

	useEffect(() => {
		const scoopsSubtotal = calculateSubTotal('scoops', optionCounts);
		const toppingSubtotal = calculateSubTotal('toppings', optionCounts);

		const grandTotal = scoopsSubtotal + toppingSubtotal;

		setTotals({ scoops: formatCurrency(scoopsSubtotal), toppings: formatCurrency(toppingSubtotal), grandTotal: formatCurrency(grandTotal) });
	}, [optionCounts]);

	const value = useMemo(() => {
		function updateItemCount(itemName, newItemCount, optionType) {
			const newOptionCounts = { ...optionCounts };

			// update option count for this item with the new value
			const optionCountsMap = optionCounts[optionType];

			if (newItemCount === '0') {
				optionCountsMap.delete(itemName);
			} else {
				optionCountsMap.set(itemName, parseInt(newItemCount));
			}
			setOptionCounts(newOptionCounts);
		}

		const reset = () => {
			setTotals({ scoops: zeroCurrency, toppings: zeroCurrency, grandTotal: zeroCurrency });
		};
		//getter: object containing option counts for scoops and toppings, subtotals, and totals
		//setter: updateOptionCount

		return [{ ...optionCounts, totals }, updateItemCount, reset];
	}, [optionCounts, totals]);

	return <OrderDetails.Provider value={value} {...props} />;
};
