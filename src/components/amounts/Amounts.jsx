import {
	Button,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { Item } from "../general/Item";
import { SalesPointsCombo } from "../salesPoint/SalesPointsCombo";
import * as yup from "yup";
import { useFormik } from "formik";
import { INPUT_TYPE } from "../../config/config";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { SearchTableModal } from "../general/SearchTableModal";
import SearchIcon from "@mui/icons-material/Search";
import { getReferrerByCode } from "../clients/selectors/getReferrerByCode";
import { setError } from "../general/actions/uiActions";
import { useDispatch, useSelector } from "react-redux";
import { CustomDatePicker } from "../general/CustomDatePicker";
import { CustomNumberFormat } from "../general/CustomNumberFormat";
import { Spinner } from "../general/Spinner";
import { addRecordMovementSeq } from "../movements/actions/movementActions";
import Swal from "sweetalert2";
import { getClientColumns } from "../clients/selectors/getClientColumns";

const validationSchema = yup.object({
	idPuntoVenta: yup.string().required("Se requiere el punto de venta"),
	codeReferrer: yup
		.string()
		.required("Se requiere el código del referenciador"),
	fechaAsigna: yup
		.date()
		.nullable()
		.required("Se requiere la fecha de asignación"),
	valor: yup
		.number()
		.required("El valor del importe es requerido")
		.positive("Sólo se aceptan números positivos"),
	name: yup.string().nullable(),
	programaRef: yup.string().nullable(),
});

export const Amounts = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const programs = useSelector((state) => state.lists["programas"]);
	const [openModal, setOpenModal] = useState(false);
   const {tiposDocumento} = useSelector((state) => state.lists);
	const columns = getClientColumns(tiposDocumento);

	const handleCloseModal = () => setOpenModal(false);
	const dispatch = useDispatch();

	const initialValues = {
      id:0,
      idCliente:0,
		idPuntoVenta: "",
		codeReferrer: "",
		fechaAsigna: null,
		valor: 0,
		name: "",
		programaRef: "",
		idMatriculaReferenciador: 0,
	};

	const handleCustomChange = (name, val) => {
		formik.setFieldValue(name, val);
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			//console.log(JSON.stringify(values, null, 2));
			registerAmount(values);
		},

		enableReinitialize: true,
	});

	const registerAmount = (values) => {
		setLoading(true);
		addRecordMovementSeq(values)
			.then((response) => {
				setLoading(false);
				//setDisableValueFields(false);
            Swal.fire(
               "Registro exitoso",
               `Se creó el registro exitósamente por valor de $${values.valor}`,
               "success"
            );
				handleReset();            
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				Swal.fire(
					"Error",
					err.cause ? err.cause.message : err.message ? err.message : err,
					"error"
				);
				dispatch(setError(err));
			});
	};

	const handleOpenModal = () => {
		//console.log(formik.values.codeReferrer);
		setOpenModal(true);
	};

	const handleClick = (params) => {
		const { field, row } = params;
		//console.log("click on ", row);
		if (field === "codigoCliente") {
			formik.setFieldValue("codeReferrer", row.codigoCliente);
		}
		loadReferrerInfo(row.codigoCliente);
		handleCloseModal();
	};

	const handleReset = () => {
		formik.resetForm();
		setShow(false);
	};

	const loadReferrerInfo = (values) => {
		//console.log("loading info");
		setLoading(true);
		getReferrerByCode(values)
			.then((response) => {
				formik.setFieldValue("name", response.nombre);
				const prog = programs.filter(
					(p) =>
						p.idProgramaReferenciacion ===
						response.idProgramaReferenciacion
				);
            //console.log(JSON.stringify(prog,null,2));
				formik.setFieldValue("programaRef", prog[0].valor);
				formik.setFieldValue("idMatriculaReferenciador", response.id);
            //formik.setFieldValue("idCliente", response.idCliente);
				setShow(true);
				setLoading(false);
				//console.log(JSON.stringify(response, null, 2));
			})
			.catch((err) => {
				setShow(true);
				setLoading(false);
				dispatch(setError(err));
			});
		//console.log(JSON.stringify(referrer, null, 2));
	};

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

	if (loading) {
		return <Spinner css="text-center spinner-top-margin" />;
	}

	return (
		<div
			className={
				"d-flex flex-column container animate__animated " + animatedStyle
			}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Asignación de montos
			</h4>
			<div
				className="align-self-center"
				style={{
					width: "100%",
				}}
			>
				<form
					id="amount-form"
					className="container__form"
					onSubmit={formik.handleSubmit}
				>
					<Grid container spacing={2}>
						<Grid item xs={show ? 4 : 12}>
							<Item className={show ? "" : "half-width center"}>
								<TextField
									label="Código referenciador"
									id="codeReferrer"
									type="text"
									name="codeReferrer"
									autoComplete="off"
									size="small"
									value={formik.values.codeReferrer}
									onChange={formik.handleChange}
									className="form-control"
									error={
										formik.touched.codeReferrer &&
										Boolean(formik.errors.codeReferrer)
									}
									variant={INPUT_TYPE}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													onClick={handleOpenModal}
													disabled={
														formik.values.codeReferrer?.length < 4
													}
												>
													<SearchIcon />
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.codeReferrer &&
									formik.errors.codeReferrer}
							</FormHelperText>
						</Grid>

						{show && (
							<>
								<Grid item xs={4}>
									<Item className="">
										<TextField
											label="Nombre"
											id="name"
											type="text"
											name="name"
											autoComplete="off"
											size="small"
											value={formik.values.name}
											//onChange={formik.handleChange}
											className="form-control"
											error={false}
											variant={INPUT_TYPE}
											disabled
										/>
									</Item>
								</Grid>

								<Grid item xs={4}>
									<Item className="">
										<TextField
											label="Programa"
											id="programaRef"
											type="text"
											name="programaRef"
											autoComplete="off"
											size="small"
											value={formik.values.programaRef}
											//onChange={formik.handleChange}
											className="form-control"
											error={false}
											variant={INPUT_TYPE}
											disabled
										/>
									</Item>
								</Grid>

								<Grid item xs={4}>
									<Item>
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

								<Grid item xs={4}>
									<Item className="">
										<CustomDatePicker
											label="Fecha asignación *"
											id="fechaAsigna"
											value={formik.values.fechaAsigna}
											onChange={(val) => {
												handleCustomChange("fechaAsigna", val);
											}}
											disableFuture={true}
											error={
												formik.touched.fechaAsigna &&
												Boolean(formik.errors.fechaAsigna)
											}
										/>
									</Item>
									<FormHelperText className="helperText">
										{formik.touched.fechaAsigna &&
											formik.errors.fechaAsigna}
									</FormHelperText>
								</Grid>

								<Grid item xs={4}>
									<Item>
										<TextField
											label="Valor *"
											id="valor"
											name="valor"
											autoComplete="off"
											size="small"
											value={formik.values.valor}
											onChange={formik.handleChange}
											error={
												formik.touched.valor &&
												Boolean(formik.errors.valor)
											}
											className="form-control"
											variant={INPUT_TYPE}
											InputProps={{
												inputComponent: CustomNumberFormat,
												startAdornment: (
													<InputAdornment position="start">
														$
													</InputAdornment>
												),
											}}

										/>
									</Item>
									<FormHelperText className="helperText">
										{formik.touched.valor && formik.errors.valor}
									</FormHelperText>
								</Grid>
							</>
						)}
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
						form="amount-form"
						color="primary"
						variant="contained"
						className="mt-3 mx-2"
						startIcon={<AttachMoneyIcon />}
						style={{ textTransform: "none" }}
						type="submit"
						disabled={!show}
					>
						Registrar monto
					</Button>
				</div>

				<SearchTableModal
               title="Referenciadores"
					handleClose={handleCloseModal}
					handleAction={handleClick}
					open={openModal}
               criteria="codigoCliente"
					filter={formik.values.codeReferrer}
					pageSize={10}
               columns={columns}
					//items={selectedIds}
				/>
			</div>
		</div>
	);
};
