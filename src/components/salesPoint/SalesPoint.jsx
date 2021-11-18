import React, { useMemo } from "react";
import { Button, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import "../../assets/styles/global.css";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import { getSalesPointsStatusSelect } from "./selectors/getSalesPointStatusSelect";
import { CheckList } from "../general/CheckList";
import { getPromos } from "../promotions/selectors/getPromos";
import { getSalesPointById } from "./selectors/getSalesPointById";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));





//Aún no se sabe si se van a usar las promociones en esta pantalla.  Lo más probable es que no
const promos = getPromos();

export const SalesPoint = () => {
	const history = useHistory();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const sp = useMemo(() => getSalesPointById(id), [id]);
	const statusOptions = getSalesPointsStatusSelect();

	const onSubmit = (data) => {
		console.log("submitting:", data);
	};

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		history,
		path: "/salesPointList",
	});

	return (
		<div
			className={"container animate__animated " + animatedStyle}
			style={{ overflow: "hidden" }}
		>
			<h4 className="title">
				Punto de venta {sp?.name ? sp.name : "nuevo"}
			</h4>
			<div>
				<form
					className="form  border border-primary rounded"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Item>
								<label for="name">Punto de venta</label>
								<input
									id="name"
									type="text"
									className="form__control inputBox"
									name="name"
									autoComplete="off"
									defaultValue={sp?.name}
									{...register("name", {
										required: true,
										maxLength: 50,
										minLength: 5,
										pattern: /^[A-Za-z]+$/i,
									})}
								/>

								{errors?.name?.type === "required" && (
									<p className="error">Dato obligatorio</p>
								)}
								{errors?.name?.type === "maxLength" && (
									<p className="error">
										La longitud máxima es de 50 caracteres
									</p>
								)}
								{errors?.name?.type === "minLength" && (
									<p className="error">
										la longitud mínima es de 5 caracteres
									</p>
								)}
								{errors?.name?.type === "pattern" && (
									<p className="error">
										Solamente se permiten caracteres alfabéticos
									</p>
								)}
							</Item>
						</Grid>

						<Grid item xs={12}>
							<Item>
								<label for="description">Descripción</label>
								<input
									id="description"
									type="text"
									className="form__control inputBox"
									name="description"
									autoComplete="off"
									defaultValue={sp?.description}
									{...register("description", {
										required: true,
										maxLength: 100,
										minLength: 5,
									})}
								/>
								{errors?.description?.type === "required" && (
									<p className="error">Dato obligatorio</p>
								)}
								{errors?.description?.type === "maxLength" && (
									<p className="error">
										La longitud máxima es de 100 caracteres
									</p>
								)}
								{errors?.description?.type === "minLength" && (
									<p className="error">
										la longitud mínima es de 5 caracteres
									</p>
								)}
							</Item>
						</Grid>

						<Grid item xs={6}>
							<Item>
								<label for="state">Estado</label>
								<select
									id="state"
									name="state"
									className="form__select inputBox"
									value={sp?.status}
									{...register("state", {
										required: true,
									})}
								>
									<option value="">...</option>
									{statusOptions.map((so) => (
										<option key={so.label} value={so.value}>
											{so.label}
										</option>
									))}
								</select>
								{errors?.state?.type === "required" && (
									<p className="error">Dato obligatorio</p>
								)}
							</Item>
						</Grid>
						<Grid item xs={6} className="text-start">
							<Item>
								<label for="promos">Promociones / Exclusiones</label>
								<CheckList id="promos" />
							</Item>
						</Grid>
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
					>
						Guardar
					</Button>
				</div>
			</div>
		</div>
	);
};
