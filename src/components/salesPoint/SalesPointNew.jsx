import React, { useEffect } from "react";
import { Button, Grid, switchClasses } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import "../../assets/styles/global.css";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

export const SalesPointNew = ({ history }) => {

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log("submitting:", data);
	};

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		history,
		path: "/salesPointList",
	});


   

	return (
		<div
			className={"text-center animate__animated " + animatedStyle}
			style={{ overflow: "hidden" }}
		>
			<h4 className="title">Nuevo punto de venta</h4>
			<div>
				<form
					className="form border border-primary rounded"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Item>
								<input
									type="text"
									className="form-control"
									placeholder="Punto de venta"
									name="name"
									autoComplete="off"                           
									{...register("name", {
										required: true,
										maxLength: 50,
										minLength: 5,
										pattern: /^[A-Za-z]+$/i,
									})}
								/>
                        {errors?.name?.type === "required" &&  ( <p className="error">Dato obligatorio</p>)}
                        {errors?.name?.type === "maxLength" &&  ( <p className="error">La longitud máxima es de 50 caracteres</p>)}
                        {errors?.name?.type === "minLength" &&  ( <p className="error">la longitud mínima es de 5 caracteres</p>)}
                        {errors?.name?.type === "pattern" &&  ( <p className="error">Solamente se permiten caracteres alfabéticos</p>)}
							</Item>
						</Grid>

						<Grid item xs={12}>
							<Item>
								<input
									type="text"
									className="form-control"
									placeholder="Descripción"
									name="description"
									autoComplete="off"                           
									{...register("description", {
										required: true,
										maxLength: 100,
										minLength: 5,                              
									})}
								/>
                        {errors?.description?.type === "required" &&  ( <p className="error">Dato obligatorio</p>)}
                        {errors?.description?.type === "maxLength" &&  ( <p className="error">La longitud máxima es de 100 caracteres</p>)}
                        {errors?.description?.type === "minLength" &&  ( <p className="error">la longitud mínima es de 5 caracteres</p>)}
							</Item>
						</Grid>

						<Grid item xs={6}>
							<Item>
								<select
									name="state"
									className="form-select"
									{...register("state",{
										required: true,
									})}
								>
									<option value="">Estado...</option>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
								</select>
                        {errors?.state?.type === "required" &&  ( <p className="error">Dato obligatorio</p>)}
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
								color="error"
								variant="contained"
								startIcon={<ClearIcon />}
								style={{ textTransform: "none" }}
								onClick={handleClickOut}
							>
								Cancelar
							</Button>
						</Grid>
						<Grid item xs={6} className="text-start">
							<Button
								color="primary"
								variant="contained"
								startIcon={<CheckIcon />}
								style={{ textTransform: "none" }}
								type="submit"
							>
								Guardar
							</Button>
						</Grid>
					</Grid>
				</form>
			</div>
		</div>
	);
};
