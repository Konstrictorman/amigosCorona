import {
	Button,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { INPUT_TYPE } from "../../config/config";
import { setError } from "../general/actions/uiActions";
import { Item } from "../general/Item";
import { Spinner } from "../general/Spinner";
import { getReportDefinitionsParamsById } from "./selectors/getReportDefinitionsParamsById";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";
import { VistaCombo } from "./VistaCombo";
import { CustomDatePicker } from "../general/CustomDatePicker";
import { FieldsComboBox } from "../fields/FieldsComboBox";
import SearchIcon from "@mui/icons-material/Search";
import {
	executeProcess,
	launchProcess,
	saveProcessParam,
} from "./actions/reportsActions";
import { SearchTableModal } from "../general/SearchTableModal";
import { getClientColumns } from "../clients/selectors/getClientColumns";

export const ReportComponents = ({ idReporte, show, type, handleReset }) => {
	const [loading, setLoading] = useState(false);
	const [params, setParams] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
	const { tiposDocumento } = useSelector((state) => state.lists);
	const columns = getClientColumns(tiposDocumento);
	const dispatch = useDispatch();
	//const initialValues = {};
	const [formState, setFormState] = useState({});


   

	useEffect(() => {
      const loadForm = (id) => {
         if (show ) {
            setLoading(true);
            const initialValues = {};
            getReportDefinitionsParamsById(id)
               .then((response) => {
                  setParams(response);
   
                  response?.forEach((p) => {
                     initialValues[`${p.codParametro}`] = null;
                  });
                  if (type === "REPOR") {
                     initialValues.tipoArchivoSalida = null;
                  }
                  initialValues.idReporte = id;
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
            setFormState({});
         }
      }

      loadForm(idReporte);
		
  
	}, [show, dispatch, idReporte, type]);

	const formik = useFormik({
		initialValues: formState,
		//validationSchema: validationSchema,
		onSubmit: (values) => {
			//console.log(JSON.stringify(values, null, 2));
			//console.log(JSON.stringify(params, null, 2));
			//const p = params[0];
			//const q = values[p.codParametro];
			//console.log(p,q);
			execute(values);
		},
		enableReinitialize: true,
	});



	const execute = (values) => {
		setLoading(true);
      console.log(JSON.stringify(values,null,2));
      
		launchProcess("PRUEBA", type, idReporte, values.tipoArchivoSalida)
			.then(async (response) => {
				//console.log(response);
				const idx = response.data.id;
				try {
					params.forEach(async (param) => {
						const obj = {
							id: 0,
							idDefinicionPrametroReporte: param.id,
							idProceso: idx,
							valorCaracter: null,
							valorFecha: null,
							valorNumero: null,
						};
						const val = values[param.codParametro];
						if (param.tipoDato === "DATE") {
							obj.valorFecha = val;
						} else if (param.tipoDato === "NUMBER") {
							obj.Numero = val;
						} else {
							obj.valorCaracter = val;
						}

						await saveProcessParam(obj);
					});
					await executeProcess(idx);
					//console.log(res);
				} catch (e) {
					Swal.fire("Error", e.message, "error");
					setLoading(false);
				}
				Swal.fire(
					"Registro exitoso",
					`Se ejecutó el proceso exitósamente con id ${idx}`,
					"success"
				);
				setFormState({});

				handleReset();
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				Swal.fire("Error", err.message, "error");
			});
      
	};

	const handleClick = (params) => {
		const { field, row } = params;
		console.log("click on ", row);
		if (field === "codigoCliente") {
			formik.setFieldValue("referen", row.codigoCliente);
			//formik.setFieldValue("idCliente", row.id);
		}
		handleCloseModal();
	};

	const handleDateChange = (name, val) => {
		formik.setFieldValue(name, val);
	};

	if (loading) {
		return <Spinner css="text-center spinner-top-margin" />;
	}

	return (
		<div className="d-flex flex-column">
			{show && (
				<div>
					<form
						id="parameters-form"
						className="container__form"
						onSubmit={formik.handleSubmit}
					>
						<Grid container spacing={2}>
							{params.map((p, index) => {
								//console.log(JSON.stringify(p, null, 2));
								let css = "half-width";
								let width = 6;
								if (params.length === 1 && index === 0) {
									css = "quarter-width center";
									width = 12;
								} else if (index % 2 === 0) {
									css += " right";
								}
								if (p.tipoDato === "VISTA") {
									return (
										<Grid item xs={width} key={p.codParametro}>
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
										<Grid item xs={width} key={p.codParametro}>
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
								} else if (
									p.tipoDato === "2LONG" &&
									p.codParametro === "referen"
								) {
									return (
										<Grid item xs={width} key={p.codParametro}>
											<Item className={css}>
												<TextField
													label="Código cliente"
													id="referen"
													type="text"
													name="referen"
													autoComplete="off"
													size="small"
													value={formik.values.referen}
													onChange={formik.handleChange}
													error={
														formik.touched.referen &&
														Boolean(formik.errors.referen)
													}
													className="form-control"
													variant={INPUT_TYPE}
													InputProps={{
														endAdornment: (
															<InputAdornment position="end">
																<IconButton
																	onClick={handleOpenModal}
																	disabled={
																		formik.values
																			.referen
																			?.length < 4
																	}
																>
																	<SearchIcon />
																</IconButton>
															</InputAdornment>
														),
													}}
                                       required={p.requerido}
												/>
											</Item>
										</Grid>
									);
								} else {
									return (
										<Grid item xs={width} key={p.codParametro}>
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
													className="form-control"
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
										</Grid>
									);
								}
							})}
							{type === "REPOR" && (
								<Grid item xs={12}>
									<Item className="quarter-width center">
										<FieldsComboBox
											id="tipoArchivoSalida"
											label="Formato de salida"
											value={formik.values.tipoArchivoSalida}
											type="tiposArchivoSalida"
											handleChange={(e) => {
												formik.handleChange(e);
											}}
											valueType="valor"
											labelType="descripcion"
											className="form-control"
											required
											//css="half-width center"
										/>
									</Item>
								</Grid>
							)}
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

			<SearchTableModal
				title="Clientes"
				handleClose={handleCloseModal}
				handleAction={handleClick}
				open={openModal}
				criteria="codigoCliente"
				filter={formik.values.referen}
				pageSize={10}
				columns={columns}
				//items={selectedIds}
			/>
		</div>
	);
};
