import React from "react";
import VpnKeyOffIcon from "@mui/icons-material/VpnKeyOff";
import { Stack } from "@mui/material";

export const NoProfileView = ({ userName }) => {
	return (
		<div className="container__message">
			<div className="container__message__box">
				<Stack spacing={2} justifyContent="flex-start" alignItems="center">
					<VpnKeyOffIcon color="primary" fontSize="large" />
					<h1>Not authorized</h1>
					<p>
						Lo sentimos, el usuario <b>{userName} </b>no tiene los permisos
						requeridos para operar esta aplicacion. Por favor póngase en
						contacto con su supervisor.
					</p>
				</Stack>
			</div>
		</div>
	);
};
