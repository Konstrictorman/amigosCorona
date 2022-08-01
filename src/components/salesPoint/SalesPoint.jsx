import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import queryString from "query-string";
import { Button, FormHelperText, Grid, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { Spinner } from "../general/Spinner";
import { getSalesPointById } from "./selectors/getSalesPointById";
import Swal from "sweetalert2";
import { FieldsComboBox } from "../fields/FieldsComboBox";
import { updateSalesPoint, addSalesPoint } from "./actions/salesPointActions";
import { ERROR_MSG, INPUT_TYPE } from "../../config/config";
import { Item } from "../general/Item";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setError } from "../general/actions/uiActions";

const validationSchema = yup.object({
	puntoVenta: yup
		.string()
      .max(6, "La longitud del nombre del punto de venta no puede ser mayor de 6 caracteres")
		.required("Se requiere el nombre del punto de venta"),
	descripcion: yup.string().required("La descripción es requerida"),
	estado: yup.string().required("El estado es requerido"),
});

export const SalesPoint = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);
	const [loading, setLoading] = useState(false);
   const dispatch = useDispatch();

	const initialValues = {
		id: 0,
		puntoVenta: "",
		descripcion: "",
		estado: "",
	};

	const [formState, setFormState] = useState(initialValues);

	useEffect(() => {
		const salesPoint = async (id) => {
			setLoading(true);
			try {
				if (id) {
					const data = await getSalesPointById(id);
					setFormState(data);
				}
			} catch (e) {
				console.log(e);
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
			}
			setLoading(false);
		};

		salesPoint(id);
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

	const update = (values) => {
		setLoading(true);
		updateSalesPoint(id, values)

			.then((response) => {
            setLoading(false);
				Swal.fire(
					"Cambio exitoso",
					"El registro se modificó con éxito",
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

	const create = (values) => {
		setLoading(true);

		addSalesPoint(values)
			.then((response) => {
            setLoading(false);            
				Swal.fire(
					"Registro exitoso",
					"El registro se agregó con éxito",
					"success"
				);
            handleClickOut();            
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
		path: "/salesPointList",
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
			{formState && (
				<h4 className="title align-self-center" style={{ width: "100%" }}>
					Punto de venta{" "}
					{formState?.id ? formik.values.puntoVenta : "nuevo"}
				</h4>
			)}
			<div
				className="align-self-center"
				style={{
					width: "100%",
				}}
			>
				
					<form id="salesPoint-form" className="container__form"
               onSubmit={formik.handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={8}>
								<Item>
									<TextField
										label="Nombre *"
										id="puntoVenta"
										type="text"
										name="puntoVenta"
										autoComplete="off"
										size="small"										
										value={formik.values.puntoVenta}
										onChange={formik.handleChange}
										className="form-control"
                              error={
                                 formik.touched.puntoVenta &&
                                 Boolean(formik.errors.puntoVenta)
                              }                              
										variant={INPUT_TYPE}
                              inputProps={{
                                 maxLength: 6,
                               }}                              
									/>
								</Item>
								<FormHelperText className="helperText">
                           {formik.touched.puntoVenta && formik.errors.puntoVenta}
								</FormHelperText>
							</Grid>

							<Grid item xs={4}>
								<Item>
									<FieldsComboBox
										id="estado"
                              label="Estado *"
										value={formik.values.estado}
                              type="estados"
                              handleChange={formik.handleChange}
										valueType="valor"
                              labelType="descripcion"
                              error={
                                 formik.touched.estado &&
                                 Boolean(formik.errors.estado)
                              }                              
									/>
								</Item>
                        <FormHelperText className="helperText">
								{formik.touched.estado && formik.errors.estado}
							</FormHelperText>                        
							</Grid>

							<Grid item xs={12}>
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
										minRows={2}
										maxRows={2}
										multiline={true}
										variant={INPUT_TYPE}
									/>
								</Item>
								<FormHelperText className="helperText">
								{formik.touched.descripcion &&
									formik.errors.descripcion}
								</FormHelperText>
							</Grid>

							<Grid></Grid>

							<Grid item xs={12} />
							<Grid item xs={12} />
						</Grid>
					</form>
				
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
               form="salesPoint-form"
					variant="contained"
					className="mt-3 mx-2 btn-primary"
					startIcon={<CheckIcon />}
					style={{ textTransform: "none" }}
					type="submit"									
				>
					Guardar
				</Button>
			</div>
		</div>
	);
};
