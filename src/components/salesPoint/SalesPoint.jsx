import React from "react";
import { Button, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";


import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

import "../../assets/styles/global.css";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

export const SalesPoint = () => {

	const handleSubmit = (e) => {
		console.log("submitting");
		/*
      e.preventDefault();
      if (inputValue.trim().length > 2) {
         setCategories(cats => [inputValue, ...cats]);
         setInputValue('');
      } 
      */
	};



	return (
		<div>
			<h1>SalesPoint</h1>
			<div>
				<form className="form border border-primary rounded" onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Item>
								<input
									type="text"
									className="form-control"
									placeholder="Punto de venta"
									aria-label="Punto de venta"
								/>
							</Item>
						</Grid>

						<Grid item xs={12}>
							<Item>
								<input
									type="text"
									className="form-control"
									placeholder="Descripción"
									aria-label="Descripción"
								/>
							</Item>
						</Grid>

						<Grid item xs={6}>
							<Item>
								<select
									className="form-select"
									aria-label="Default select example"
								>
									<option selected>Open this select menu</option>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
								</select>
							</Item>
						</Grid>
						<Grid item xs={6} className="text-start">
							<Button
								className="mt-2"
								color="warning"
								variant="contained"
								style={{ textTransform: "none" }}
								startIcon={<VisibilityIcon />}
							>
								Ver Exclusiones/Promociones
							</Button>
						</Grid>
						<Grid item xs={12} />
						<Grid item xs={12} />

						<Grid item xs={6} className="text-end">
							<Button
								color="primary"
								variant="contained"
								startIcon={<CheckIcon />}
								style={{ textTransform: "none" }}
							>
								Crear nuevo punto de venta
							</Button>
						</Grid>
						<Grid item xs={6} className="text-start">
							<Button
								color="error"
								variant="contained"
								startIcon={<ClearIcon />}
								style={{ textTransform: "none" }}
							>
								Cancelar
							</Button>
						</Grid>
					</Grid>
				</form>
			</div>
		</div>
	);
};
