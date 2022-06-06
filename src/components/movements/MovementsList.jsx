import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
	Button,
	Checkbox,
	FormControlLabel,
	FormHelperText,
	Grid,
	Paper,
	TextField,
} from "@mui/material";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { useCustomForm } from "../customHooks/useCustomForm";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import esLocale from "date-fns/locale/es";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { INPUT_TYPE } from "../../config/config";
import { PagedMovementDataTable } from "./PagedMovementDataTable";
import { MovementsResume } from "./MovementsResume";
import moment from "moment";
import { dateFormatter2 } from "../../helpers/dateFormatter";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

export const MovementsList = () => {
	const navigate = useNavigate();

	const [params, setParams] = useState({});
	const [show, setShow] = useState(false);
	const [errors, setErrors] = useState({});

	const [
		formValues,
		handleInputChange,
		handleValueChange,
		handleCheckChange,
		handleComplexInputChange,
		reset,
	] = useCustomForm({
		codeCliente: "",
		fechaInicial: null,
		fechaFinal: null,
		llaveMaestraFlag: false,
	});

	const { codeCliente, fechaInicial, fechaFinal, llaveMaestraFlag } =
		formValues;

	const handleClick = (params) => {
		console.log("click");
		/*
		const { field, row } = params;
		if (field === "numeroFactura") {
			navigate(`/bill?id=${row.id}`);
		}
      */
	};



	const validateForm = (values) => {
		const errors = {};

		if (!fechaInicial) {
			errors.fechaInicial = "La fecha inicial es requerida";
		}
		if (!fechaFinal) {
			errors.fechaFinal = "La fecha final es requerida";
		}
		const fInit = moment(fechaInicial);
		const fFinal = moment(fechaFinal);

		if (!fInit.isBefore(fFinal)) {
			errors.fechaFinal =
				"La fecha final debe ser posterior a la fecha inicial";
		}

		const x = Object.keys(errors).length;
		setShow(x === 0);
		return errors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		Object.entries(formValues).forEach((fv) => {
			if (fv[1]) {
				setParams((_params) => {
					return {
						..._params,
						[fv[0]]: fv[1],
					};
				});
			}
		});
		//console.log("params:", params);

		setErrors(validateForm(formValues));
	};

	const handleClean = () => {
		reset();
		setErrors({});
		setShow(false);
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
				<form className="container__form" onSubmit={handleSubmit}>
					<Grid container spacing={2} rowSpacing={1}>
						<Grid item xs={3}>
							<Item className="">
								<TextField
									label="Cliente"
									error={errors.cliente}
									id="codeCliente"
									type="text"
									name="codeCliente"
									autoComplete="off"
									size="small"
									value={codeCliente}
									onChange={handleInputChange}
									className="form-control"
									disabled={false}
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText">
								{" "}
								{errors.cliente}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<LocalizationProvider
									dateAdapter={AdapterDateFns}
									locale={esLocale}
								>
									<DesktopDatePicker
										label="Fecha inicial"
										id="fechaInicial"
										value={fechaInicial}
										maxDate={new Date()}
										onChange={(newValue) => {
											handleValueChange("fechaInicial", dateFormatter2(newValue));
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												size="small"
												className="form-control"
												error={errors.fechaInicial}
												variant={INPUT_TYPE}
												required={true}
											/>
										)}
										disabled={false}
									/>
								</LocalizationProvider>
							</Item>
							<FormHelperText className="helperText">
								
								{errors.fechaInicial}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<LocalizationProvider
									dateAdapter={AdapterDateFns}
									locale={esLocale}
								>
									<DesktopDatePicker
										label="Fecha final"
										id="fechaFinal"
										value={fechaFinal}
										maxDate={new Date()}
										onChange={(newValue) => {
											handleValueChange("fechaFinal", dateFormatter2(newValue));
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												size="small"
												className="form-control"
												error={false}
												variant={INPUT_TYPE}
												required={true}
											/>
										)}
										disabled={false}
									/>
								</LocalizationProvider>
							</Item>
							<FormHelperText className="helperText">
								{" "}
								{errors.fechaFinal}{" "}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<div className="center">
								<FormControlLabel
									control={
										<Checkbox
											id="llaveMaestraFlag"
											name="llaveMaestraFlag"
											checked={llaveMaestraFlag}
											onChange={handleCheckChange}
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
									onClick={handleClean}
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

			<PagedMovementDataTable
				handleClick={handleClick}
				params={params}
				show={show}
			/>


			{show && fechaInicial && fechaFinal &&(
				<MovementsResume
					fechaDesde={fechaInicial}
					fechaHasta={fechaFinal}
				/>
			)}
		</div>
	);
};
