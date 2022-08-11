import React, { useState } from "react";
import { Button, FormHelperText, Grid, TextField } from "@mui/material";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SalesPointsCombo } from "../salesPoint/SalesPointsCombo";
import { INPUT_TYPE } from "../../config/config";
import { PagedBillDataTable } from "./PagedBillDataTable";
import { CustomDatePicker } from "../general/CustomDatePicker";
import { Item } from "../general/Item";
import * as yup from "yup";
import { useFormik } from "formik";
import { Spinner } from "../general/Spinner";

const validationSchema = yup.object({
	fechaDesde: yup.date().nullable().required("Se requiere la fecha inicial"),
	fechaHasta: yup
		.date()
		.nullable()
		.required("Se requiere la fecha final")
		.min(
			yup.ref("fechaDesde"),
			"La fecha final debe ser mayor a la fecha inicial"
		),
	idPuntoVenta: yup.string().required("Se requiere el punto de venta"),
	clienteVta: yup.string(),
	numeroFactura: yup.string(),
	pedido: yup.string(),
	idClienteRef: yup.string(),
});

export const BillsList = () => {
	const navigate = useNavigate();

	const [params, setParams] = useState({});
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);
	const [resetFlag, setResetFlag] = useState(false);

	const initialValues = {
		idPuntoVenta: "",
		fechaDesde: null,
		fechaHasta: null,
		numeroFactura: "",
		pedido: "",
		clienteVta: "",
		idClienteRef: "",
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

	const handleCustomChange = (name, val) => {
		formik.setFieldValue(name, val);
	};

	const handleClick = (params) => {
		const { field, row } = params;
		if (field === "numeroFactura") {
			navigate(`/bill?id=${row.id}`);
		}
	};

	const handleSearch = () => {
		setLoading(true);
		setShow(false);
		Object.entries(formik.values).forEach((fv) => {
			if (fv[1]) {
				setParams((_params) => {
					//console.log("fv:", fv);
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
		setResetFlag(!resetFlag);
		setParams({});
		setShow(false);
	};

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

	return (
		<div
			className={
				"d-flex flex-column container animate__animated " + animatedStyle
			}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Consulta de facturas
			</h4>
			<div
				className="align-self-center"
				style={{
					width: "100%",
				}}
			>
				<form
					id="bill-form"
					className="container__form"
					onSubmit={formik.handleSubmit}
				>
					<Grid container spacing={2} rowSpacing={1}>
						<Grid item xs={3}>
							<Item className="">
								<CustomDatePicker
									label="Fecha desde *"
									id="fechaDesde"
									value={formik.values.fechaDesde}
									maxDate={new Date()}
									onChange={(val) => {
										handleCustomChange("fechaDesde", val);
									}}
									error={
										formik.touched.fechaDesde &&
										Boolean(formik.errors.fechaDesde)
									}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.fechaDesde && formik.errors.fechaDesde}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<CustomDatePicker
									label="Fecha hasta *"
									id="fechaHasta"
									value={formik.values.fechaHasta}
									onChange={(val) => {
										handleCustomChange("fechaHasta", val);
									}}
									maxDate={new Date()}
									error={
										formik.touched.fechaHasta &&
										Boolean(formik.errors.fechaHasta)
									}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.fechaHasta && formik.errors.fechaHasta}
							</FormHelperText>
						</Grid>

						<Grid item xs={6}>
							<Item className="">
								<SalesPointsCombo
									label="Punto de venta *"
									id="salesPoint"
                           value={formik.values.idPuntoVenta}
									handleValueChange={(val) => {
										handleCustomChange("idPuntoVenta", val);
									}}
									error={
										formik.touched.idPuntoVenta &&
										Boolean(formik.errors.idPuntoVenta)
									}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.idPuntoVenta &&
									formik.errors.idPuntoVenta}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<TextField
									label="Cliente venta"
									id="clienteVta"
									type="text"
									name="clienteVta"
									autoComplete="off"
									size="small"
									value={formik.values.clienteVta}
									onChange={formik.handleChange}
									className="form-control"
									error={
										formik.touched.clienteVta &&
										Boolean(formik.errors.clienteVta)
									}
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.clienteVta && formik.errors.clienteVta}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<TextField
									label="Número de factura"
									id="numeroFactura"
									type="text"
									name="numeroFactura"
									autoComplete="off"
									size="small"
									value={formik.values.numeroFactura}
									onChange={formik.handleChange}
									className="form-control"
									error={
										formik.touched.numeroFactura &&
										Boolean(formik.errors.numeroFactura)
									}
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.numeroFactura &&
									formik.errors.numeroFactura}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<TextField
									label="Número de pedido"
									id="pedido"
									type="text"
									name="pedido"
									autoComplete="off"
									size="small"
									value={formik.values.pedido}
									onChange={formik.handleChange}
									className="form-control"
									error={
										formik.touched.pedido &&
										Boolean(formik.errors.pedido)
									}
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.pedido && formik.errors.pedido}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<TextField
									label="Cliente referenciador"
									id="idClienteRef"
									type="text"
									name="idClienteRef"
									autoComplete="off"
									size="small"
									value={formik.values.idClienteRef}
									onChange={formik.handleChange}
									className="form-control"
									error={
										formik.touched.idClienteRef &&
										Boolean(formik.errors.idClienteRef)
									}
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.idClienteRef &&
									formik.errors.idClienteRef}
							</FormHelperText>
						</Grid>

						<Grid item xs={12}></Grid>
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
						form="bill-form"
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

			{loading && <Spinner  css="text-center spinner-top-margin"/>}

			<PagedBillDataTable
				handleClick={handleClick}
				params={params}
				show={show}
			/>
		</div>
	);
};
