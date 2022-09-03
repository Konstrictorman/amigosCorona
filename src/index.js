import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App.js";
import "./assets/styles/styles.scss";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./auth/authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
	<MsalProvider instance={msalInstance}>
		<App />
	</MsalProvider>,
	document.getElementById("root")
);
