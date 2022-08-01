import React from "react";
import queryString from "query-string";
import {
	Autocomplete,
	Button,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	MenuItem,
	TextField,
	Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { useCustomForm } from "../customHooks/useCustomForm";
import { getClientByCode } from "../clients/selectors/getClientByCode";
import UploadIcon from "@mui/icons-material/Upload";
import { useMemo } from "react";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SellIcon from "@mui/icons-material/Sell";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { getSalesPoints } from "../salesPoint/selectors/getSalesPoints";
import { useState } from "react";
import { Item } from "../general/Item";
import * as yup from "yup";
import { useFormik } from "formik";
import { Spinner } from "../general/Spinner";
import { getRedemptionById } from "./selectors/getRedemptionById";
import Swal from "sweetalert2";
import { ERROR_MSG, INPUT_TYPE } from "../../config/config";
import { useEffect } from "react";
import { SalesPointsCombo } from "../salesPoint/SalesPointsCombo";
import SearchIcon from "@mui/icons-material/Search";
import { SearchTableModal } from "../general/SearchTableModal";
import { FieldsComboBox } from "../fields/FieldsComboBox";
import { getReferrerByCode } from "../clients/selectors/getReferrerByCode";
import { useDispatch } from "react-redux";
import { setError } from "../general/actions/uiActions";

const validationSchema = yup.object({
	codReferrer: yup
		.string()
		.min(6, "El código del referenciador debe tener al menos 6 caracteres")
		.required("El código del referenciador es requerido"),
});

const validationSchema2 = yup.object({
	redemptionType: yup.string().required("El tipo de redención es requerido"),
	monto: yup
		.number()
		.min(0, "El monto de la redención no puede tener valores negativos")
		.required("El monto de la redención es requerido"),
	idPuntoVenta: yup.string().required("El punto de venta es requerido"),
	ref: yup.string().required("La referencia es requerida"),
});

export const Redemption = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);
	const [loading, setLoading] = useState(false);
	const [referrer, setReferrer] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
   const dispatch = useDispatch();

	const initialValues = {
		id: 0,
		codReferrer: "",
	};

	const [formState, setFormState] = useState(initialValues);

	const initialValues2 = {
		id: 0,
		redemptionType: null,
		monto: "",
		idPuntoVenta: "",
		referencia: "",
		newBalance: "",
	};

	const [formState2, setFormState2] = useState(initialValues2);

	useEffect(() => {
		const getRedemption = async (id) => {
			setLoading(true);
			try {
				if (id) {
					const data = await getRedemptionById(id);
					setFormState({ ...data });
					setFormState2({ ...data });
				}
			} catch (e) {
				console.log(e);
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
			}

			setLoading(false);
		};
		getRedemption(id);
	}, [id]);

	const formik = useFormik({
		initialValues: formState,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			//console.log(JSON.stringify(values, null, 2));
			loadReferrerInfo(values.codReferrer);
		},
		enableReinitialize: true,
	});

	const formik2 = useFormik({
		initialValues: formState2,
		validationSchema: validationSchema2,
		onSubmit: (values) => {
			console.log(JSON.stringify(values, null, 2));
			//loadReferrerInfo(values);
		},
		enableReinitialize: true,
	});

	const loadReferrerInfo = (values) => {
		//console.log("loading info");
		getReferrerByCode(values)
         .then((response) => {
            setReferrer(response);
         })
         .catch((err)=> {
				Swal.fire(
					"Error",
					`No es posible realizar la redención para el código ${values}`,
					"error"
				);
				dispatch(setError(err));
         });
      console.log(JSON.stringify(referrer,null,2));
		
	};



	const handleCustomChange = (name, val) => {
		//console.log("Cambiando valores:", name, val);
		formik2.setFieldValue(name, val);
	};



	const handleClick = (params) => {
		const { field, row } = params;
		console.log("click on ", row);
		if (field === "codigoCliente") {
			formik.setFieldValue("codReferrer", row.codigoCliente);
		}
		handleCloseModal();
	};

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/redemptionsList",
	});

	if (loading) {
		return <Spinner />;
	}

	return (
		<div
			className={" d-flex flex-column   animate__animated " + animatedStyle}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Redención nueva
			</h4>

			<div
				className="align-self-center"
				style={{
					width: "100%",
				}}
			>
				<form
					id="ref-form"
					className="container__form"
					onSubmit={formik.handleSubmit}
				>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Item className="half-quarter-width right">
								<TextField
									label="Código referenciador *"
									id="codReferrer"
									type="text"
									name="codReferrer"
									autoComplete="off"
									size="small"
									value={formik.values.codReferrer}
									onChange={formik.handleChange}
									error={
										formik.touched.codReferrer &&
										Boolean(formik.errors.codReferrer)
									}
									className="form-control"
									variant={INPUT_TYPE}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													onClick={handleOpenModal}
													disabled={
														formik.values.codReferrer.length < 4
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
								{formik.touched.codReferrer &&
									formik.errors.codReferrer}
							</FormHelperText>
						</Grid>

						<Grid item xs={6} className="left-align">
							<Button
								color="primary"
								variant="contained"
								className="mt-2"
								startIcon={<UploadIcon />}
								style={{ textTransform: "none" }}
								type="submit"
							>
								Cargar información
							</Button>
						</Grid>
					</Grid>
				</form>
				{referrer && (
					<form
						id="redemption-form"
						className="container__form"
						onSubmit={formik2.handleSubmit}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<AssignmentIndIcon color="primary" />
								<Typography variant="caption" className="left-align">
									Información acumulada referenciador
								</Typography>
							</Grid>

							<Grid item xs={6} className="grid-item">
								<Item className="">
									<TextField
										label="Nombre"
										id="name"
										type="text"
										name="name"
										autoComplete="off"
										size="small"
										value={referrer.nombre}
										//onChange={handleInputChange}
										error={false}
										className="form-control"
										variant={INPUT_TYPE}
										disabled={true}
									/>
								</Item>
							</Grid>

							<Grid item xs={3} className="grid-item">
								<Item className="">
									<TextField
										label="N° Celular Nequi"
										id="nequi"
										type="text"
										name="nequi"
										autoComplete="off"
										size="small"
										value={referrer.celNequi}
										//onChange={handleInputChange}
										error={false}
										className="form-control"
										variant={INPUT_TYPE}
										disabled={true}
									/>
								</Item>
							</Grid>

							<Grid item xs={3} className="grid-item">
								<Item className="">
									<TextField
										label="Saldo disponible"
										id="newBalance"
										type="text"
										name="newBalance"
										autoComplete="off"
										size="small"
										value={referrer.saldo}
										//onChange={handleInputChange}
										error={false}
										className="form-control"
										variant={INPUT_TYPE}
										disabled={true}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													$
												</InputAdornment>
											),
										}}
									/>
								</Item>
							</Grid>
							<Grid item xs={12}>
								<SellIcon color="primary" />
								<Typography variant="caption" className="left-align">
									Información redención
								</Typography>
							</Grid>

							<Grid item xs={4}>
								<Item>
                        <FieldsComboBox
									id="redemptionType"
									label="Tipo redención *"
									value={formik.values.redemptionType}
									type="tiposRedencion"
									handleChange={(e) => {
										formik.handleChange(e);
									}}
									valueType="valor"
                           labelType="valor"
									error={
										formik.touched.redemptionType &&
										Boolean(formik.errors.redemptionType)
									}
								/>             
								</Item>
								<FormHelperText className="helperText">
									{formik2.touched.redemptionType &&
										formik2.errors.redemptionType}
								</FormHelperText>
							</Grid>

							<Grid item xs={4} className="">
								<Item className="">
									<TextField
										label="Monto redención *"
										id="monto"
										type="number"
										name="monto"
										autoComplete="off"
										size="small"
										value={formik2.values.monto}
										onChange={formik2.handleChange}
										error={
											formik2.touched.monto &&
											Boolean(formik2.errors.monto)
										}
										className="form-control"
										variant={INPUT_TYPE}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													$
												</InputAdornment>
											),
										}}
									/>
								</Item>
								<FormHelperText className="helperText">
									{formik2.touched.monto && formik2.errors.monto}
								</FormHelperText>
							</Grid>

							<Grid item xs={4} className="">
								<Item className="">
									<SalesPointsCombo
										label="Punto de venta *"
										id={"idPuntoVenta"}
										value={formik2.values.idPuntoVenta}
										handleValueChange={(val) => {
											handleCustomChange("idPuntoVenta", val);
										}}
										error={
											formik2.touched.idPuntoVenta &&
											Boolean(formik2.errors.idPuntoVenta)
										}
									/>
								</Item>
								<FormHelperText className="helperText">
									{formik2.touched.idPuntoVenta &&
										formik2.errors.idPuntoVenta}
								</FormHelperText>
							</Grid>

							<Grid item xs={4} className="">
								<Item className="">
									<TextField
										label="Referencia *"
										id="referencia"
										type="text"
										name="referencia"
										autoComplete="off"
										size="small"
										value={formik2.values.referencia}
										onChange={formik2.handleChange}
										error={
											formik.touched.referencia &&
											Boolean(formik.errors.referencia)
										}
										className="form-control"
										variant={INPUT_TYPE}
									/>
								</Item>
								<FormHelperText className="helperText">
									{formik.touched.referencia &&
										formik.errors.referencia}
								</FormHelperText>
							</Grid>

							<Grid item xs={4} className="">
								<Item className="">
									<TextField
										label="Nuevo saldo"
										id="newBalance"
										type="number"
										name="newBalance"
										autoComplete="off"
										size="small"
										value={formik2.values.newBalance}
										onChange={formik2.handleChange}
										error={false}
										className="form-control"
                              disabled={true}
										variant={INPUT_TYPE}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													$
												</InputAdornment>
											),
										}}
									/>
								</Item>
								<FormHelperText className="helperText">
									{formik2.touched.newBalance &&
										formik2.errors.newBalance}
								</FormHelperText>
							</Grid>
						</Grid>
					</form>
				)}
				<div>
					<Button
						color="error"
						variant="contained"
						className="mt-3 mx-2"
						startIcon={<ClearIcon />}
						style={{ textTransform: "none" }}
						onClick={handleClickOut}
					>
						Cancelar
					</Button>
					<Button
						form="redemption-form"
						color="primary"
						variant="contained"
						className="mt-3 mx-2"
						startIcon={<CheckIcon />}
						style={{ textTransform: "none" }}
						type="submit"
                  disabled={!formik.values.redemptionType}
					>
						Generar {formik.values.redemptionType}
					</Button>
				</div>

				<SearchTableModal
					handleClose={handleCloseModal}
					handleAction={handleClick}
					open={openModal}
					filter={formik.values.codReferrer}
					pageSize={10}
					//items={selectedIds}
				></SearchTableModal>
			</div>
		</div>
	);
};
