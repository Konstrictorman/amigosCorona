import React, { useState } from "react";
import {
	Button,
	Checkbox,
	FormControlLabel,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
} from "@mui/material";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { INPUT_TYPE } from "../../config/config";
import { PagedMovementDataTable } from "./PagedMovementDataTable";
import { MovementsResume } from "./MovementsResume";
import { Item } from "../general/Item";
import * as yup from "yup";
import { useFormik } from "formik";
import { CustomDatePicker } from "../general/CustomDatePicker";
import { Spinner } from "../general/Spinner";
import { SearchTableModal } from "../general/SearchTableModal";
import { useSelector } from "react-redux";
import { getClientColumns } from "../clients/selectors/getClientColumns";

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
	codigoCliente: yup.string().nullable().required("Se requiere el código de cliente"),
	llaveMaestraFlag: yup.boolean(),
});

export const MovementsList = () => {
	const navigate = useNavigate();

	const [params, setParams] = useState({});
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
	const { tiposDocumento, motivos } = useSelector((state) => state.lists);

	const columns = getClientColumns(tiposDocumento);

	const initialValues = {
		codigoCliente: null,
		fechaDesde: null,
		fechaHasta: null,
		llaveMaestraFlag: false,
      idCliente: 0,
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			handleSearch(values);
		},

		enableReinitialize: true,
	});

	const handleClick = (params) => {
		const { field, row } = params;
		console.log("click on ", row);
		if (field === "codigoCliente") {
         formik.setFieldValue("codigoCliente", row.codigoCliente);
			formik.setFieldValue("idCliente", row.id);
		}
		handleCloseModal();
	};

	const handleSearch = (values) => {
		setLoading(true);
		setShow(false);
      setParams({});

      delete values.codigoCliente;
		console.log(JSON.stringify(values, null, 2));
		Object.entries(values).forEach((fv) => {
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

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

	return (
		<div
			className={" d-flex flex-column   animate__animated " + animatedStyle}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Consulta de movimientos
			</h4>
			<div
				className="align-self-center"
				style={{
					width: "100%",
				}}
			>
				<form className="container__form" onSubmit={formik.handleSubmit}>
					<Grid container spacing={2} rowSpacing={1}>

						<Grid item xs={3}>
							<Item className="">
								<TextField
									label="Código cliente *"
									id="codigoCliente"
									type="text"
									name="codigoCliente"
									autoComplete="off"
									size="small"
									value={formik.values.codigoCliente}
									onChange={formik.handleChange}
									error={
										formik.touched.codigoCliente &&
										Boolean(formik.errors.codigoCliente)
									}
									className="form-control"
									variant={INPUT_TYPE}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													onClick={handleOpenModal}
													disabled={
														formik.values.codigoCliente?.length < 4
													}
												>
													<SearchIcon />
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</Item>
							<FormHelperText className="helperText right">
								{formik.touched.codigoCliente && formik.errors.codigoCliente}
							</FormHelperText>
						</Grid>
{/*
						<Grid item xs={3}>
							<Item className="">
								<TextField
									label="Cliente"
									id="codigoCliente"
									type="text"
									name="codigoCliente"
									autoComplete="off"
									size="small"
									value={formik.values.codigoCliente}
									onChange={formik.handleChange}
									className="form-control"
									error={
										formik.touched.codigoCliente &&
										Boolean(formik.errors.codigoCliente)
									}
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.codigoCliente &&
									formik.errors.codigoCliente}{" "}
							</FormHelperText>
						</Grid>
                        */}
						<Grid item xs={3}>
							<Item className="">
								<CustomDatePicker
									label="Fecha inicial *"
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
									label="Fecha final *"
									id="fechaHasta"
									value={formik.values.fechaHasta}
									maxDate={new Date()}
									onChange={(val) => {
										handleCustomChange("fechaHasta", val);
									}}
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

						<Grid item xs={3}>
							<div className="center">
								<FormControlLabel
									control={
										<Checkbox
											id="llaveMaestraFlag"
											name="llaveMaestraFlag"
											checked={formik.values.llaveMaestraFlag}
											onChange={({ target }) => {
												formik.setFieldValue(
													"llaveMaestraFlag",
													target.checked
												);
											}}
										/>
									}
									label="Llave maestra"
								/>
							</div>
						</Grid>

						<Grid item xs={12}>
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
									variant="contained"
									className="mt-3 mx-2 btn-primary"
									startIcon={<SearchIcon />}
									style={{ textTransform: "none" }}
									type="submit"
								>
									Buscar
								</Button>
							</div>
						</Grid>
					</Grid>
				</form>
			</div>

			<SearchTableModal
            title="Clientes"
				handleClose={handleCloseModal}
				handleAction={handleClick}
				open={openModal}
				criteria="codigoCliente"
				filter={formik.values.codigoCliente}
				pageSize={10}
				columns={columns}
				//items={selectedIds}
			></SearchTableModal>

			{loading && <Spinner css="text-center spinner-top-margin" />}

			<PagedMovementDataTable
				handleClick={handleClick}
				params={params}
				show={show}
            motives={motivos}
			/>

			{show && (
				<MovementsResume
					fechaDesde={formik.values.fechaDesde}
					fechaHasta={formik.values.fechaHasta}
				/>
			)}
		</div>
	);
};
