import React from "react";
import BugReportIcon from "@mui/icons-material/BugReport";
import "../../assets/styles/global.css";

export const PageNotFound = () => {
	return (
		<div className="mt-5 d-flex align-items-center">
			<div className="mt-5 ">
				<BugReportIcon color="primary" fontSize="large" />
				<h1>Page Not Found - 404</h1>
				<p>
					Lo sentimos, la ruta que está solicitando no pudo ser
					encontrada. Por favor regrese a la página principal o contacte al
					administrador de la aplicación
				</p>
			</div>
		</div>
	);
};
