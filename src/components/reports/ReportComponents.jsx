import { Button, FormHelperText, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { INPUT_TYPE } from "../../config/config";
import { setError } from "../general/actions/uiActions";
import { Item } from "../general/Item";
import { Spinner } from "../general/Spinner";
import { getReportDefinitionsParamsById } from "./selectors/getReportDefinitionsParamsById";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";
import { VistaCombo } from "./VistaCombo";
import { CustomDatePicker } from "../general/CustomDatePicker";


export const ReportComponents = ({ idReporte, show }) => {
	const [loading, setLoading] = useState(false);
	const [params, setParams] = useState([]);
	//const [validationSchema, setValidationSchema] = useState({});
	const dispatch = useDispatch();
	const initialValues = {};
   const [formState, setFormState] = useState({});

	useEffect(() => {
		if (show) {
			setLoading(true);
			getReportDefinitionsParamsById(idReporte)
				.then((response) => {
					setParams(response);
               
					response.forEach((p) => {
						initialValues[`${p.codParametro}`] = null;
					});
					setLoading(false);
               setFormState(initialValues);
				})
				.catch((e) => {
					setLoading(false);
					Swal.fire("Error", e.message, "error");
					dispatch(setError(e));
				});
		} else {
			setParams([]);
			setLoading(false);
		}
	}, [show, dispatch, idReporte]);

	

	const formik = useFormik({
		initialValues: formState,
		//validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(JSON.stringify(values, null, 2));
		},
		enableReinitialize: true,
	});


	const handleDateChange = (name, val) => {
		formik.setFieldValue(name, val);
	};


	if (loading) {
		return <Spinner />;
	}

	return (
		<>
			{show && (
				<div>
					<form
						id="parameters-form"
						className="container__form"
						onSubmit={formik.handleSubmit}
					>
						<Grid container spacing={2}>
							{params.map((p, index) => {
                        console.log(p);
								let css = "half-width";
								let width = 6;
								if (params.length === 1 && index === 0) {
									css += " center";
									width = 12;
								} else if (index % 2 === 0) {
									css += " right";
								}
								if (p.tipoDato === "VISTA") {
									return (
										<Grid item xs={width}>
											<Item className={css}>
												<VistaCombo
													label={p.descripcion}
													id={p.codParametro}
													name={p.codParametro}
													value={
														formik.values[`${p.codParametro}`]
													}
													onChange={formik.handleChange}
													variant={INPUT_TYPE}
													idDefinicionParametroReporte={p.id}
													error={
														formik.touched[`${p.codParametro}`] &&
														Boolean(
															formik.errors[`${p.codParametro}`]
														)
													}
                                       required={p.requerido}
												/>
											</Item>
											<FormHelperText className="helperText">
												{formik.touched[`${p.codParametro}`] &&
													formik.errors[`${p.codParametro}`]}
											</FormHelperText>
										</Grid>
									);
								} else if (p.tipoDato === "DATE") {
									return (
										<Grid item xs={width}>
											<Item className={css}>
												<CustomDatePicker
													label={p.descripcion}
													id={p.codParametro}
													name={p.codParametro}
													onChange={(val) => {
														handleDateChange(p.codParametro, val);
													}}
													value={
														formik.values[`${p.codParametro}`]
													}
													maxDate={new Date()}
													error={
														formik.touched[`${p.codParametro}`] &&
														Boolean(
															formik.errors[`${p.codParametro}`]
														)
													}
                                       required={p.requerido}
												/>
											</Item>
											<FormHelperText className="helperText">
												{formik.touched[`${p.codParametro}`] &&
													formik.errors[`${p.codParametro}`]}
											</FormHelperText>
										</Grid>
									);
								} else {
									return (
										<Grid item xs={width}>
											<Item className={css}>
												<TextField
													label={p.descripcion}
													id={p.codParametro}
													type="text"
													name={p.codParametro}
													autoComplete="off"
													size="small"
													value={
														formik.values[`${p.codParametro}`]
													}
													onChange={formik.handleChange}
													variant={INPUT_TYPE}
													error={
														formik.touched[`${p.codParametro}`] &&
														Boolean(
															formik.errors[`${p.codParametro}`]
														)
													}
                                       required={p.requerido}
												/>
											</Item>
											<FormHelperText className="helperText">
												{formik.touched[`${p.codParametro}`] &&
													formik.errors[`${p.codParametro}`]}
											</FormHelperText>
										</Grid>
									);
								}
							})}
						</Grid>
					</form>
					<div>
						<Button
							form="parameters-form"
							variant="contained"
							className="mt-3 mx-2 btn-primary"
							startIcon={<ReplayCircleFilledIcon />}
							style={{ textTransform: "none" }}
							type="submit"
						>
							Generar Reporte/Proceso
						</Button>
					</div>
				</div>
			)}
		</>
	);
};
