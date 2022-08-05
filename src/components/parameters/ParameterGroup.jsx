import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { ERROR_MSG, INPUT_TYPE } from "../../config/config";
import * as yup from "yup";
import { useFormik } from "formik";
import { Item } from "../general/Item";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { Spinner } from "../general/Spinner";
import { Button, FormHelperText, Grid, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { getParameterGroupById } from "./selectors/getParameterGroupById";
import { Parameters } from "./Parameters";
import {
	addParameterGroup,
	updateParameterGroup,
} from "./actions/parameterActions";
import { setError } from "../general/actions/uiActions";

const validationSchema = yup.object({
	grupoParametros: yup
		.string()
		.min(
			6,
			"El nombre del grupo de parámetros debe tener al menos 6 caracteres"
		)
		.required("El nombre del nivel de beneficios es requerido"),
	descripcion: yup
		.string()
		.min(8, "La descripción debe tener al menos 8 caracteres")
		.required("La descripción es requerida"),
});

export const ParameterGroup = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const initialValues = {
		id: 0,
		grupoParametros: "",
		descripcion: "",
		requierePunto: false,
	};

	const [formState, setFormState] = useState(initialValues);

	useEffect(() => {
		const getGrupoParametro = async (id) => {
			setLoading(true);
			try {
				if (id) {
					const data = await getParameterGroupById(id);
					console.log(data);
					setFormState(data);
				}
			} catch (e) {
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
			}
			setLoading(false);
		};
		getGrupoParametro(id);
	}, [id]);

	const formik = useFormik({
		initialValues: formState,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(JSON.stringify(values, null, 2));
			if (id) {
				console.log("updating...");
				update(values);
			} else {
				console.log("creating...");
				create(values);
			}
		},
		enableReinitialize: true,
	});

	const create = (values) => {
		setLoading(true);
		addParameterGroup(values)
			.then((response) => {
				setLoading(false);
				Swal.fire(
					"Registro exitoso",
					"El registro se creó con éxito",
					"success"
				);
				navigate(`/parameterGroup?id=${response.id}`);
			})
			.catch((err) => {
				setLoading(false);				
				Swal.fire(
					"Error",
					err.cause ? err.cause.message : (err.message? err.message:err),
					"error"
				);
				dispatch(setError(err));
			}); 
	};

	const update = (values) => {
		setLoading(true);
		updateParameterGroup(id, values)
			.then((response) => {
				setLoading(false);
				Swal.fire(
					"Actualización exitosa",
					"El registro se actualizó con éxito",
					"success"
				);
			})
			.catch((err) => {
				setLoading(false);				
				Swal.fire(
					"Error",
					err.cause ? err.cause.message : (err.message? err.message:err),
					"error"
				);
				dispatch(setError(err));
			}); 
	};

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/parametersGroupList",
	});

	if (loading) {
		return <Spinner />;
	}

	return (
		<div
			className={
				"d-flex flex-column container animate__animated " + animatedStyle
			}
		>
			<h4 className="title align-self-center" style={{ width: "80%" }}>
				Grupo de parámetros{" "}
				{formState?.grupoParametros
					? formik.values.grupoParametros
					: "nuevo"}
			</h4>

			<div
				className="align-self-center"
				style={{
					width: "80%",
				}}
			>
				<form
					id="grupoParametro-form"
					className="container__form"
					onSubmit={formik.handleSubmit}
				>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<Item>
								<TextField
									label="Nombre *"
									id="grupoParametros"
									type="text"
									name="grupoParametros"
									autoComplete="off"
									size="small"
									value={formik.values.grupoParametros}
									onChange={formik.handleChange}
									error={
										formik.touched.grupoParametros &&
										Boolean(formik.errors.grupoParametros)
									}
									className="form-control"
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.grupoParametros &&
									formik.errors.grupoParametros}
							</FormHelperText>
						</Grid>

						<Grid item xs={8}>
							<Item>
								<TextField
									label="Descripción *"
									id="descripcion"
									type="text"
									name="descripcion"
									autoComplete="off"
									size="small"
									value={formik.values.descripcion}
									onChange={formik.handleChange}
									error={
										formik.touched.descripcion &&
										Boolean(formik.errors.descripcion)
									}
									className="form-control"
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.descripcion &&
									formik.errors.descripcion}
							</FormHelperText>
						</Grid>
					</Grid>
					<div>
						<Button
							variant="contained"
							className="mt-3 mx-2 btn-error"
							startIcon={<ClearIcon />}
							style={{ textTransform: "none" }}
							onClick={handleClickOut}
						>
							Cancelar
						</Button>
						<Button
							form="grupoParametro-form"
							variant="contained"
							className="mt-3 mx-2 btn-primary"
							startIcon={<CheckIcon />}
							style={{ textTransform: "none" }}
							type="submit"
						>
							Guardar
						</Button>
					</div>
				</form>

				{id && (
					
						<div item xs={12}>
							<Parameters parameterGroupId={id} isLoading={loading} handleClickOut={handleClickOut} />
						</div>
            )}

			</div>
		</div>
	);
};
