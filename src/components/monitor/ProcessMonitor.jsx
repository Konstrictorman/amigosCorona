import React, { useState } from "react";
import { CustomDatePicker } from "../general/CustomDatePicker";
import { Item } from "../general/Item";
import * as yup from "yup";
import { useFormik } from "formik";
import { INPUT_TYPE } from "../../config/config";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { useNavigate } from "react-router-dom";
import { Button, FormHelperText, Grid, InputAdornment, TextField } from "@mui/material";
import { FieldsComboBox } from "../fields/FieldsComboBox";
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PagedProcessesDataTable } from "./PagedProcessesDataTable";
import { useSelector } from "react-redux";
import { Spinner } from "../general/Spinner";
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const validationSchema = yup.object({
	fechaDesde: yup
		.date()
		.nullable()
		.max(
			yup.ref("fechaHasta"),
			"La fecha inicial debe ser menor a la fecha inicial"
		),      
	fechaHasta: yup
		.date()
		.nullable()
		.min(
			yup.ref("fechaDesde"),
			"La fecha final debe ser mayor a la fecha inicial"
		),
	estadoProceso: yup.string(),
	tipoProceso: yup.string(),
	idProceso: yup.string(),
	nombreProceso: yup.string(),
	usuario: yup.string()
   .when(["fechaDesde", "fechaHasta", "estadoProceso", "tipoProceso", "idProceso", "nombreProceso"], {
      is: (fechaDesde,fechaHasta, estadoProceso, tipoProceso, idProceso, nombreProceso) => {
         const val = (fechaDesde === null && fechaHasta ===null && estadoProceso ===undefined && tipoProceso ===undefined && idProceso ===undefined && nombreProceso ===undefined);
         return val;
      } ,
      then: yup.string().required("Se requiere al menos del nombre de usuario para realizar la búsqueda")
   }),
});

export const ProcessMonitor = () => {
	const navigate = useNavigate();
	const [params, setParams] = useState({});
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);

	const { estadosProceso } = useSelector((state) => state.lists);

	const initialValues = {
		fechaDesde: null,
		fechaHasta: null,
		estadoProceso: "",
		tipoProceso: "",
		idProceso: "",
		nombreProceso: "",
		usuario: "",
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			//console.log(JSON.stringify(values, null, 2));
			handleSearch();
		},
		enableReinitialize: true,
	});

	const handleSearch = () => {
		setLoading(true);
		setShow(false);
      setParams({});      
		Object.entries(formik.values).forEach((fv) => {
         //console.log(fv);
			if (fv[1]) {
				setParams((_params) => {
					return {
						..._params,
						[fv[0]]: fv[1],
					};
				});
			}
		});
      
		setLoading(false);
		setShow(true);
	};

	const handleReset = () => {
		formik.resetForm();
		setParams({});
		setShow(false);
	};

	const handleCustomChange = (name, val) => {
		formik.setFieldValue(name, val);
	};

   const handleIdProcessChange = (val) => {
      formik.setFieldValue("idProceso", val);
      formik.setFieldValue("fechaDesde", null);
      formik.setFieldValue("fechaHasta", null);
      formik.setFieldValue("estadoProceso", "");
      formik.setFieldValue("tipoProceso", "");
      formik.setFieldValue("nombreProceso", "");
      formik.setFieldValue("usuario", "");
   }

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

   if (loading) {
      return (<Spinner  css="text-center spinner-top-margin"/>);
   }

	return (
		<div
			className={
				"d-flex flex-column container animate__animated " + animatedStyle
			}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Monitor de procesos
			</h4>
			<div
				className="align-self-center"
				style={{
					width: "100%",
				}}
			>
				<form
					id="monitor-form"
					className="container__form"
					onSubmit={formik.handleSubmit}
				>
					<Grid container spacing={2} rowSpacing={1}>
						<Grid item xs={3}>
							<Item>
								<FieldsComboBox
									id="estadoProceso"
									label="Estado proceso"
									value={formik.values.estadoProceso}
									type="estadosProceso"
									handleChange={(e) => {
										formik.handleChange(e);
									}}
									valueType="valor"
									labelType="descripcion"
									error={
										formik.touched.estadoProceso &&
										Boolean(formik.errors.estadoProceso)
									}
                           disabled={formik.values.idProceso.length>0}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.estadoProceso &&
									formik.errors.estadoProceso}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item>
								<FieldsComboBox
									id="tipoProceso"
									label="Tipo de proceso"
									value={formik.values.tipoProceso}
									type="tiposProceso"
									handleChange={(e) => {
										formik.handleChange(e);
									}}
									valueType="valor"
									labelType="descripcion"
									error={
										formik.touched.tipoProceso &&
										Boolean(formik.errors.tipoProceso)
									}
                           disabled={formik.values.idProceso.length>0}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.tipoProceso &&
									formik.errors.tipoProceso}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<CustomDatePicker
									label="Fecha Desde"
									id="fechaDesde"
									value={formik.values.fechaDesde}
									onChange={(val) => {
										handleCustomChange("fechaDesde", val);
									}}
									disableFuture={true}
									error={
										formik.touched.fechaDesde &&
										Boolean(formik.errors.fechaDesde)
									}
                           disabled={formik.values.idProceso.length>0}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.fechaDesde && formik.errors.fechaDesde}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<CustomDatePicker
									label="Fecha hasta"
									id="fechaHasta"
									value={formik.values.fechaHasta}
									onChange={(val) => {
										handleCustomChange("fechaHasta", val);
									}}
									disableFuture={true}
									error={
										formik.touched.fechaHasta &&
										Boolean(formik.errors.fechaHasta)
									}
                           disabled={formik.values.idProceso.length>0}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.fechaHasta && formik.errors.fechaHasta}
							</FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Id de proceso"
									id="idProceso"
									type="number"
									name="idProceso"
									autoComplete="off"
									size="small"
									value={formik.values.idProceso}
									onChange={(e)=> {handleIdProcessChange(e.target.value)}}
									className="form-control"
									error={
										formik.touched.idProceso &&
										Boolean(formik.errors.idProceso)
									}
									variant={INPUT_TYPE}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<LightbulbIcon/>
											</InputAdornment>
										),
									}}
                           inputProps={{
                              inputMode: "numeric",
                              pattern: "[0-9]*",
                           }}                           
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.idProceso && formik.errors.idProceso}
							</FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Nombre de proceso"
									id="nombreProceso"
									type="text"
									name="nombreProceso"
									autoComplete="off"
									size="small"
									value={formik.values.nombreProceso}
									onChange={formik.handleChange}
									className="form-control"
									error={
										formik.touched.nombreProceso &&
										Boolean(formik.errors.nombreProceso)
									}
									variant={INPUT_TYPE}
                           disabled={formik.values.idProceso.length>0}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.nombreProceso &&
									formik.errors.nombreProceso}
							</FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Usuario °"
									id="usuario"
									type="text"
									name="usuario"
									autoComplete="off"
									size="small"
									value={formik.values.usuario}
									onChange={formik.handleChange}
									className="form-control"
									error={
										formik.touched.usuario &&
										Boolean(formik.errors.usuario)
									}
									variant={INPUT_TYPE}
                           disabled={formik.values.idProceso.length>0}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.usuario && formik.errors.usuario}
							</FormHelperText>
						</Grid>
					</Grid>
				</form>
				<div>
					<Button
						className="mt-3 mx-2 btn-warning"
						variant="contained"
						style={{ textTransform: "none" }}
						startIcon={<ArrowBackIcon />}
						onClick={handleClickOut}
					>
						Volver
					</Button>

					<Button
						variant="contained"
						className="mt-3 mx-2 btn-error"
						startIcon={<CleaningServicesIcon />}
						style={{ textTransform: "none" }}
						onClick={handleReset}
					>
						Limpiar
					</Button>
					<Button
						form="monitor-form"
						variant="contained"
						className="mt-3 mx-2 btn-primary"
						startIcon={<SearchIcon />}
						style={{ textTransform: "none" }}
						type="submit"
					>
						Buscar
					</Button>
				</div>
			</div>

			<PagedProcessesDataTable
				handleClick={()=>{}}
				params={params}
				show={show}
				estadosProceso={estadosProceso}
			/>
		</div>
	);
};
