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
import * as yup from "yup";

function Validator(id, validationType, validations) {
	this.id = id;
	this.validationType = validationType;
	this.validations = validations;
}

const schema = {
   $schema: "http://json-schema.org/draft-07/schema#",
   $id: "http://example.com/person.schema.json",
   title: "Person",
   description: "A person",
   type: "object",
   properties: {
      id_punto: {
       type: "string",
       required: true       
     },
     id_prog: {
       type: "string",
       required: true,
     },
     fecha_ini: {
       type: "string",
       required: true
     },
     fecha_fin: {
       type: "string",
       required: true
     },
     referen: {
       type: "string",
       required: true       
     }
   },
   required: ["id_punto", "id_prog","fecha_ini","fecha_fin","referen"]
 };

 const config = {
   // for error messages...
   errMessages: {
      id_punto: {
       required: "You must enter an id_punto"
     },
     id_prog: {
       required: "You must enter an id_prog ",
     },
     fecha_ini: {
      required: "You must enter an fecha_ini ",
    },
    fecha_fin: {
      required: "You must enter an fecha_fin ",
    },
    referen: {
      required: "You must enter an referen ",
    }
   }
 };

export const ReportComponents = ({ idReporte, show }) => {
	const [loading, setLoading] = useState(false);
	const [params, setParams] = useState([]);
	//const [validationSchema, setValidationSchema] = useState({});
	const dispatch = useDispatch();
	const initialValues = {};

	useEffect(() => {
		if (show) {
			setLoading(true);
			//const config = [];
			getReportDefinitionsParamsById(idReporte)
				.then((response) => {
					setParams(response);
					response.forEach((p) => {
						initialValues[`${p.codParametro}`] = null;
                  /*
						let id = p.codParametro;
						let type = "";
						if (p.tipoDato === "DATE") {
							type = "date";
						} else if (p.ptioDato === "NUMBER") {
							type = "number";
						} else {
							type = "string";
						}
						let vals = [
							{
								type: "required",
								params: [`El campo ${p.descripcion} es requerido`],
							},
						];

						let obj = new Validator(id, type, vals);
						config.push(obj);
                  */
					});

					//console.log("schema:", JSON.stringify(config, null, 2));
               //const yupSchema = buildYup(schema, config);
               //setValidationSchema(yupSchema);
					setLoading(false);
					//console.log(initialValues);
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

	const [formState, setFormState] = useState(initialValues);

	const formik = useFormik({
		initialValues: formState,
		//validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(JSON.stringify(values, null, 2));
		},
		enableReinitialize: true,
	});

	const handleReset = () => {
		formik.handleReset();
		setParams([]);
	};

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
                                       required={true}
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
                                       required={true}
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
                                       required={true}
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
