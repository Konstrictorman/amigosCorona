import React from "react";
import { useMsal } from "@azure/msal-react";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const handleLogout = (instance) => {
	instance.logoutRedirect().catch((e) => {
		console.error(e);
	});
};

/**
 * Renders a button which, when selected, will redirect the page to the logout prompt
 */
export const SignOutButton = () => {
	const { instance } = useMsal();

	return (
		<Button
			startIcon={<LogoutIcon />}
			variant="contained"
			className="ml-auto"
			color="warning"
			onClick={() => handleLogout(instance)}
		>
			Salir
		</Button>
	);
};
