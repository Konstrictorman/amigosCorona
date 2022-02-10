import React, { useMemo } from "react";
import {
	Button,
	FormHelperText,
	Grid,
	MenuItem,
	TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import "../../assets/styles/global.css";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

import { useNavigate, useLocation } from "react-router";
import queryString from "query-string";
import { getSalesPointsStatusSelect } from "./selectors/getSalesPointStatusSelect";
import { getSalesPointById } from "./selectors/getSalesPointById";
import { useForm } from "../customHooks/useForm";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));



//Aún no se sabe si se van a usar las promociones en esta pantalla.  Lo más probable es que no
//const promos = getPromos();

export const SalesPoint = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);
	const sp = useMemo(() => getSalesPointById(id), [id]);
	const statusMenuItems = getSalesPointsStatusSelect();

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/salesPointList",
	});

	const [formValues, handleInputChange] = useForm({
		name: sp?.name ? sp.name : "",
		description: sp?.description ? sp.description : "",
		state: sp?.status ? sp.status : "",
	});

	const { name, description, state } = formValues;

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("submitting: " + JSON.stringify(formValues));
	};

	return (
		<div
			className={
				"d-flex flex-column container animate__animated " + animatedStyle
			}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Punto de venta {sp?.name ? sp.name : "nuevo"}
			</h4>
			<div
				className="align-self-center"
				style={{					
					width: "100%",
				}}
			>
				<form
					className="form  border border-primary rounded"
					onSubmit={handleSubmit}
				>
					<Grid container spacing={2}>
						<Grid item xs={8}>
							<Item>
								<TextField
									label="Nombre"
									error={false}
									id="name"
									type="text"
									name="name"
									autoComplete="off"
									size="small"
									required
									value={name}
									onChange={handleInputChange}
									className="form-control"
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Estado"
									error={false}
									id="state"
									select
									name="state"
									size="small"
									value={state}
									onChange={handleInputChange}
									className="form-control"
								>
									<MenuItem value="">...</MenuItem>
									{statusMenuItems.map((so) => (
										<MenuItem key={so.label} value={so.value}>
											{so.label}
										</MenuItem>
									))}
								</TextField>
							</Item>
							<FormHelperText className="helperText half-quarter-width right">
								{" "}
							</FormHelperText>
						</Grid>

						<Grid item xs={12}>
							<Item>
								<TextField
									label="Descripción"
									error={false}
									id="description"
									type="text"
									name="description"
									autoComplete="off"
									size="small"
									required
									value={description}
									onChange={handleInputChange}
									className="form-control"
									minRows={2}
									maxRows={2}
									multiline={true}                           
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						{/*}
						<Grid item xs={6} className="text-start">
							<Item>
								<label for="promos">Promociones / Exclusiones</label>
								<CheckList id="promos" />
							</Item>
						</Grid>
                           */}
						<Grid></Grid>

						<Grid item xs={12} />
						<Grid item xs={12} />
					</Grid>
             
				</form>



				<div>
					<Button
						color="error"
						variant="contained"
						className="mt-3 mx-2"
						startIcon={<ClearIcon />}
						style={{ textTransform: "none" }}
						onClick={handleClickOut}
					>
						Cancelar
					</Button>
					<Button
						color="primary"
						variant="contained"
						className="mt-3 mx-2"
						startIcon={<CheckIcon />}
						style={{ textTransform: "none" }}
						type="submit"
						onClick={handleSubmit}
					>
						Guardar
					</Button>
				</div>
			</div>
		</div>
	);
};
