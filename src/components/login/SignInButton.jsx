import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../auth/authConfig";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

function handleLogin(instance) {
	instance.loginRedirect(loginRequest).catch((e) => {
		console.error(e);
	});
}

/**
 * Renders a button which, when selected, will redirect the page to the login prompt
 */
export const SignInButton = (props) => {

   const { instance } = useMsal();

   const {caption} = props;

	return (
		<Button
      {...props}
			onClick={() => handleLogin(instance)}
			variant="contained" 
         startIcon={<LoginIcon />}> {caption}
		</Button>

		//<Button variant="secondary" className="ml-auto" onClick={() => handleLogin(instance)}>Sign in using Redirect</Button>
	);
};
