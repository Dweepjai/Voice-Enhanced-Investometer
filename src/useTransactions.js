import { useContext } from 'react';
import { InvestmentTrackerContext } from './context/context';

import { equityCategories, cryptoCategories, resetCategories } from './constants/categories';

const useTransactions = (title) => {
	resetCategories();
	const { transactions } = useContext(InvestmentTrackerContext);
	const transactionsPerType = transactions.filter((t) => t.type === title);
	const total = transactionsPerType.reduce((acc, currVal) => (acc += currVal.amount), 0);
	const categories = title === 'Equity' ? equityCategories : cryptoCategories;

	transactionsPerType.forEach((t) => {
		const category = categories.find((c) => c.type === t.category);

		if (category) category.amount += t.amount;
	});

	const filteredCategories = categories.filter((c) => c.amount > 0);

	const chartData = {
		datasets: [
			{
				data: filteredCategories.map((c) => c.amount),
				backgroundColor: filteredCategories.map((c) => c.color)
			}
		],
		labels: filteredCategories.map((c) => c.type)
	};

	return { total, chartData };
};

export default useTransactions;
