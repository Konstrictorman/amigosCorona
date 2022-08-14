import React from "react";
import { AppRouter } from "./routers/AppRouter";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";


const msalInstance = new PublicClientApplication(msalConfig);

export const App = () => {
	return (
      <MsalProvider instance={msalInstance}>
		<Provider store={store}> 
			<AppRouter />
         
		</Provider>
      </MsalProvider>
	);
};
