import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Paper,
	Stack,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import { getMovements } from "./selectors/getMovements";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { useForm } from "../customHooks/useForm";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import esLocale from "date-fns/locale/es";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

export const MovementsList = () => {
	const navigate = useNavigate();
	const [rows, setRows] = useState([]);

	const search = () => {
		setRows(getMovements());
	};

	const [
		formValues,
		handleInputChange,
		handleValueChange,
		handleCheckChange,
		handleComplexInputChange,
		reset,
	] = useForm({
		codeCliente: "",
		fechaInicial: null,
		fechaFinal: null,
		llaveMaestraFlag: false,
	});

	const { codeCliente, fechaInicial, fechaFinal, llaveMaestraFlag } =
		formValues;

	const clear = () => {
		setRows([]);
		reset();
	};

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Searching with:", formValues);
		search();
	};

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
				<form
					className="container__form"
					onSubmit={handleSubmit}
				>
					<Grid container spacing={2} rowSpacing={1}>
						<Grid item xs={3}>
							<Item className="">
								<TextField
									label="Cliente"
									error={false}
									id="codeCliente"
									type="text"
									name="codeCliente"
									autoComplete="off"
									size="small"
									value={codeCliente}
									onChange={handleInputChange}
									className="form-control"
									disabled={false}
								/>
							</Item>
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
											handleValueChange("fechaInicial", newValue);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												size="small"
												className="form-control"
												error={false}
											/>
										)}
										disabled={false}
									/>
								</LocalizationProvider>
							</Item>
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
											handleValueChange("fechaFinal", newValue);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												size="small"
												className="form-control"
												error={false}
											/>
										)}
										disabled={false}
									/>
								</LocalizationProvider>
							</Item>
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
									className="mt-3 mx-2"
									color="warning"
									variant="contained"
									style={{ textTransform: "none" }}
									startIcon={<ArrowBackIcon />}
									onClick={handleClickOut}
								>
									Volver
								</Button>
								<Button
									color="error"
									variant="contained"
									className="mt-3 mx-2"
									startIcon={<CleaningServicesIcon />}
									style={{ textTransform: "none" }}
									onClick={clear}
								>
									Limpiar
								</Button>
								<Button
									color="primary"
									variant="contained"
									className="mt-3 mx-2"
									startIcon={<SearchIcon />}
									style={{ textTransform: "none" }}
									type="submit"
									onClick={handleSubmit}
								>
									Buscar
								</Button>
							</div>
						</Grid>
					</Grid>
				</form>
			</div>
		</div>
	);
};
