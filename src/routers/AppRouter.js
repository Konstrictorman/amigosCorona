import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginView } from "../components/login/LoginView";
import { DashRouter } from "./DashRouter";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export const AppRouter = () => {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Router>
				<div>
					<Routes>
						<Route exact path="/login" element={<LoginView/>} />
						<Route path="/*" element={<DashRouter/>} />
					</Routes>
				</div>
			</Router>
		</LocalizationProvider>
	);
};
