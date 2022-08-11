import React, { useState } from "react";
import {
	Button,
	FormHelperText,
	Grid,
	Tab,
	TextField,
	Typography,
} from "@mui/material";

import { getRedemptions } from "./selectors/getRedemptions";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import {
	TabContext,
	TabList,
} from "@mui/lab";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import Box from "@mui/material/Box";
import { withStyles } from "@mui/styles";
import SellIcon from "@mui/icons-material/Sell";
import { RedemptionBasicDataTab } from "./tabs/RedemptionBasicDataTab";
import { RedemptionAuditTab } from "./tabs/RedemptionAuditTab";
import ArticleIcon from "@mui/icons-material/Article";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { Spinner } from "../general/Spinner";
import { SalesPointsCombo } from "../salesPoint/SalesPointsCombo";
import { INPUT_TYPE } from "../../config/config";
import { Item } from "../general/Item";
import { useFormik } from "formik";
import * as yup from "yup";
import { CustomDatePicker } from "../general/CustomDatePicker";
import { ReverseConfirmationModal } from "../general/ReverseConfirmationModal";
import { reverseRedemption } from "./actions/redemptionActions";
import Swal from "sweetalert2";
import { setError, setMessage } from "../general/actions/uiActions";
import { useDispatch } from "react-redux";

const StyledTabs = withStyles({
	indicator: {
		backgroundColor: "pantone300C",
		height: "3px",
	},
})(TabList);

const validationSchema = yup.object({
	fechaInicial: yup.date().required("Se requiere la fecha inicial").nullable(),
	fechaFinal: yup
		.date()
		.nullable()
		.required("Se requiere la fecha final")
		.min(
			yup.ref("fechaInicial"),
			"La fecha final debe ser mayor a la fecha inicial"
		),
});

export const RedemptionsList = () => {
	const navigate = useNavigate();
	const [tabIndex, setTabIndex] = useState("0");
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [params, setParams] = useState({});
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
	const [selected, setSelected] = useState({});
	const dispatch = useDispatch();

	const initialValues = {
		codeCliente: "",
		idPuntoVenta: "",
		fechaInicial: null,
		fechaFinal: null,
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

	const handleSearch = async () => {
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
		const redemptions = await getRedemptions();
		setRows(redemptions);
		setLoading(false);
		setShow(true);
	};

	const handleReset = () => {
		formik.resetForm();
		setRows([]);
		setShow(false);
	};

	const handleTabChange = (e, newValue) => {
		setTabIndex(newValue);
	};

	const handleClick = (params) => {
		setSelected(params);
		handleOpenModal();

	};

	const reverseItem = () => {
		handleCloseModal();
		setLoading(true);
		//const index = rows.findIndex((item) => item.id === selected.id);

		reverseRedemption(selected)
			.then((response) => {
				setLoading(false);
				//handleReset();
				dispatch(
					setMessage({
						msg: "Registro actualizado exitosamente",
						severity: "success",
					})
				);
				setSelected(null);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
				Swal.fire(
					"Error",
					err.cause ? err.cause.message : err.message ? err.message : err,
					"error"
				);
				dispatch(setError(err));
			});
	};

	const handleCustomChange = (name, val) => {
		formik.setFieldValue(name, val);
	};

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

	const [animatedStyle2, handleClickCreate] = useAnimatedStyle({
		navigate,
		path: "/redemption",
	});

	if (loading) {
		return <Spinner  css="text-center spinner-top-margin"/>;
	}

	return (
		<div
			className={
				" d-flex flex-column   animate__animated " +
				animatedStyle +
				" " +
				animatedStyle2
			}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Consulta de redenciones
			</h4>
			<div
				className="align-self-center"
				style={{
					width: "100%",
				}}
			>
				<form
					id="search-form"
					className="container__form"
					onSubmit={formik.handleSubmit}
				>
					<Grid container spacing={2} rowSpacing={1}>
						<Grid item xs={3}>
							<Item className="">
								<CustomDatePicker
									label="Fecha inicial *"
									id="fechaInicial"
									value={formik.values.fechaInicial}
									maxDate={new Date()}
									onChange={(val) => {
										handleCustomChange("fechaInicial", val);
									}}
									error={
										formik.touched.fechaInicial &&
										Boolean(formik.errors.fechaInicial)
									}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.fechaInicial &&
									formik.errors.fechaInicial}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<CustomDatePicker
									label="Fecha final *"
									id="fechaFinal"
									value={formik.values.fechaFinal}
									maxDate={new Date()}
									onChange={(val) => {
										handleCustomChange("fechaFinal", val);
									}}
									error={
										formik.touched.fechaFinal &&
										Boolean(formik.errors.fechaFinal)
									}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.fechaFinal && formik.errors.fechaFinal}
							</FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item className="">
								<SalesPointsCombo
									label="Punto de venta"
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
						</Grid>

						<Grid item xs={2}>
							<Item className="">
								<TextField
									label="Código cliente"
									id="codeCliente"
									type="text"
									name="codeCliente"
									autoComplete="off"
									size="small"
									value={formik.values.codeCliente}
									onChange={formik.handleChange}
									className="form-control"
									error={
										formik.touched.codeCliente &&
										Boolean(formik.errors.codeCliente)
									}
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.codeCliente &&
									formik.errors.codeCliente}
							</FormHelperText>
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
									className="mt-3 mx-2 btn-secondary"
									variant="contained"
									style={{ textTransform: "none" }}
									startIcon={<SellIcon />}
									onClick={handleClickCreate}
								>
									Crear nueva redención
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
									form="search-form"
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

				{loading && <Spinner  css="text-center spinner-top-margin"/>}

				{show && rows.length > 0 && (
					<div className="topMargin">
						<Typography variant="h6" className="left-align">
							{rows.length} Resultados
						</Typography>
						<Box
							className="align-self-center container__dataTable "
							sx={{
								border: 1,
								borderColor: "orange",
								borderRadius: "5px",
							}}
						>
							<TabContext value={tabIndex}>
								<StyledTabs
									onChange={handleTabChange}
									sx={{ backgroundColor: "#e6e6e6" }}
								>
									<Tab
										value="0"
										label="Datos básicos"
										style={{ textTransform: "none" }}
										icon={<ArticleIcon fontSize="large" />}
										wrapped
									/>
									<Tab
										value="1"
										label="Auditoría"
										style={{ textTransform: "none" }}
										icon={<LocationSearchingIcon fontSize="large" />}
										wrapped
									/>
								</StyledTabs>
								<RedemptionBasicDataTab
									index="0"
									rows={rows}
                           params={params}
									handleClick={handleClick}
								/>
								<RedemptionAuditTab index="1" rows={rows} />
							</TabContext>
						</Box>
					</div>
				)}

				{show && rows.length === 0 && (
					<div className="topMargin">
						<Typography variant="h6" className="left-align">
							No se encontraron resultados
						</Typography>
					</div>
				)}
			</div>

			<ReverseConfirmationModal
				handleClose={handleCloseModal}
				handleAction={reverseItem}
				open={openModal}
				items={selected?.id}
				recordDesc={selected?.referencia}
			/>
		</div>
	);
};
