import React, { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import TopBar from './components/topbar/TopBar';
import { InvestmentTrackerContext } from './context/context';

const App = () => {

	const { user } = useContext(InvestmentTrackerContext);
	return (
		<BrowserRouter>
				{user && <TopBar />}
				<Routes>
					<Route path="*" element={<Navigate replace to={user ? "/investments" : "/auth"} />} />
					<Route path="/investments" element={user ? <Home /> : <Navigate replace to="/auth" />} />
					<Route path="/auth" element={user ? <Navigate replace to="/invesments" /> : <Auth />} />
				</Routes>
		</BrowserRouter>
	);
};

export default App;