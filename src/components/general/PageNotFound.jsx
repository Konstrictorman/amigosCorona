import React from "react";
import BugReportIcon from "@mui/icons-material/BugReport";
import { Stack } from "@mui/material";

export const PageNotFound = () => {
	return (
		<div className="container__message">
			<div className="container__message__box">
				<Stack spacing={2} justifyContent="flex-start" alignItems="center">
					<BugReportIcon color="primary" fontSize="large" />
					<h1>Page Not Found - 404</h1>
					<p>
						Lo sentimos, la ruta que está solicitando no pudo ser
						encontrada. Por favor regrese a la página principal o contacte
						al administrador de la aplicación
					</p>
				</Stack>
			</div>
		</div>
	);
};
