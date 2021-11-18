import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginView } from "../components/login/LoginView";
import { DashRouter } from "./DashRouter";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export const AppRouter = () => {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Router>
				<div>
					<Switch>
						<Route exact path="/login" component={LoginView} />
						<Route path="/" component={DashRouter} />
					</Switch>
				</div>
			</Router>
		</LocalizationProvider>
	);
};
