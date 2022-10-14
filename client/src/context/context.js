import React, { useReducer, createContext, useState, useEffect } from 'react';
import Reducer from './Reducer';
var initialState = {
	user: JSON.parse(localStorage.getItem('user')) || null,
	isFetching: false,
	error: false,
};

export const InvestmentTrackerContext = createContext();

export const Provider = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, initialState);
	const [balance, setBalance] = useState(0);
	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(state.user));
		if(state.user) {
			const total = state.user.investments.reduce(
				(acc, currVal) => (acc + currVal.amount),
				0
			);
			setBalance(total);
		} else {
			setBalance(0);
		}
	}, [state]);
	return (
		<InvestmentTrackerContext.Provider value={{
			user: state.user,
			isFetching: state.isFetching,
			error: state.error,
			dispatch,
			balance,
		}}>
			{children}
		</InvestmentTrackerContext.Provider>
	);
};
