import React from "react";
import {
	AuthenticatedTemplate,
	UnauthenticatedTemplate,
} from "@azure/msal-react";

import { AppRouter } from "../../routers/AppRouter";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { LoginView } from "../login/LoginView";

export const PageLayout = (props) => {
	return (
		<div>
			<AuthenticatedTemplate>
				<Provider store={store}>
					<AppRouter />
				</Provider>
			</AuthenticatedTemplate>
			<UnauthenticatedTemplate>
				<LoginView />
			</UnauthenticatedTemplate>
		</div>
	);
};
