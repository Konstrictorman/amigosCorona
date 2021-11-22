import React, { useMemo } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { getSalesPoints } from "../salesPoint/selectors/getSalesPoints";
import { getPromoById } from "./selectors/getPromoById";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import {
	Button,
	FormControlLabel,
	FormHelperText,
	Grid,
	Input,
	InputAdornment,
	MenuItem,
	Switch,
	TextField,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import esLocale from "date-fns/locale/es";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { CalendarTextField } from "../general/CalendarTextField";
import "../../assets/styles/global.css";
import { useForm } from "../customHooks/useForm";
import { DesktopDatePicker } from "@mui/lab";
import { CustomTextField } from "../general/CustomTextField";
import { createTheme } from "@mui/system";
import { Label } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	/*
	
	paddingBottom: theme.spacing(1.5),
	paddingLeft: theme.spacing(2),
	paddingRight: theme.spacing(2),
   color: theme.palette.text.secondary,
   */
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

export const Promotion = () => {
	const history = useHistory();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);
	const promo = useMemo(() => getPromoById(id), [id]);
	const salePoints = getSalesPoints();

	const sortSalesPoints = () => {
		const array = salePoints.sort((a, b) => a.name.localeCompare(b.name));
		return array;
	};

	const sortedSalePoints = useMemo(() => sortSalesPoints(), [salePoints]);

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		history,
		path: "/promotionsList",
	});

	const [formValues, handleInputChange, handleDateChange, handleCheckChange] =
		useForm({
			name: promo?.name ? promo.name : "",
			startDate: promo?.fechaInicio ? promo.fechaInicio : "",
			endDate: promo?.fechaFin ? promo.fechaFin : "",
			article: promo?.idArticulo ? promo.idArticulo : "",
			salesPoint: promo?.idPuntoVenta ? promo.idPuntoVenta : "",
			percentage: promo?.pctPromo ? promo.pctPromo : "",
			excluded: promo?.flagExclusion ? promo.flagExclusion : false,
			all: promo?.flagTodos ? promo.flagTodos : false,
		});

	const {
		name,
		startDate,
		endDate,
		article,
		salesPoint,
		percentage,
		excluded,
		all,
	} = formValues;

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formValues);
	};

	return (
		<div
			className={"d-flex flex-column container animate__animated " + animatedStyle}
			style={{ overflow: "hidden" }}
		>
			<h4 className="title align-self-center"  style={{ width: "80%" }}>
				Promoción / Exclusión {promo?.id ? promo.name : "nueva"}
			</h4>
			<div
				className="align-self-center"
				style={{
					height: 460,
					width: "80%",
				}}
			>
				<form
					className="form border border-primary rounded"
					onSubmit={handleSubmit}
				>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Item>
								<TextField
									label="Nombre de la promoción/exclusión"
									error={false}
									id="name"
									type="text"
									name="name"
									autoComplete="off"
									size="small"
									required
									value={name}
									onChange={handleInputChange}
									className="form-control"
								/>
							</Item>
							<FormHelperText className="helperText">
								{" "}
								
							</FormHelperText>
						</Grid>

						<Grid item xs={6}>
							<Item className="item half-width">
								<LocalizationProvider
									dateAdapter={AdapterDateFns}
									locale={esLocale}
								>
									<DesktopDatePicker
										label="Fecha inicio vigencia"
										id="startDate"
										value={startDate}
										minDate={new Date()}
										onChange={(newValue) => {
											handleDateChange("startDate", newValue);
										}}
										className="form__control"
										renderInput={(params) => (
											<TextField
												{...params}
												size="small"
												required
												className="form-control"
												error={false}
											/>
										)}
									/>
								</LocalizationProvider>
							</Item>
							<FormHelperText className="helperText">
								{" "}
								xilofoniando
							</FormHelperText>
						</Grid>

						<Grid item xs={6} className="grid-item">
							<Item>
								<TextField
									label="Artículo"
									error={false}
									id="article"
									type="text"
									name="article"
									autoComplete="off"
									size="small"
									required
									value={article}
									onChange={handleInputChange}
									className="form-control"
								/>
							</Item>
							<FormHelperText className="helperText">
								{" "}
								xilofoniando
							</FormHelperText>
						</Grid>

						<Grid item xs={6} className="grid-item">
							<Item className="item half-width">
								<LocalizationProvider
									dateAdapter={AdapterDateFns}
									locale={esLocale}
								>
									<DesktopDatePicker
										label="Fecha final vigencia"
										id="endDate"
										value={endDate}
										minDate={new Date()}
										onChange={(newValue) => {
											handleDateChange("endDate", newValue);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												size="small"
												required
												className="form-control"
												error={false}
											/>
										)}
									/>
								</LocalizationProvider>
							</Item>
							<FormHelperText className="helperText">x </FormHelperText>
						</Grid>

						<Grid item xs={6} className="grid-item">
							<Item className="item half-quarter-width right">
								<TextField
									label="Punto de venta"
									error={false}
									id="salesPoint"
									select
									name="salesPoint"
									size="small"
									value={salesPoint}
									onChange={handleInputChange}
									className="form-control"
								>
									<MenuItem value="">...</MenuItem>
									{sortedSalePoints.map((sp) => (
										<MenuItem key={sp.id} value={sp.id}>
											{sp.name}
										</MenuItem>
									))}
								</TextField>
							</Item>
							<FormHelperText className="helperText half-quarter-width right">
								{" "}
								x
							</FormHelperText>
						</Grid>

						<Grid item xs={6} className="grid-item">
							<Item className="item half-width">
								<TextField
									label="Porcentaje"
									type="number"
									error={false}
									id="percentage"
									name="percentage"
									autoComplete="off"
									size="small"
									required
									value={percentage}
									onChange={handleInputChange}
									className="form-control"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												%
											</InputAdornment>
										),
									}}
								/>
							</Item>
							<FormHelperText> x</FormHelperText>
						</Grid>

						<Grid item xs={9} className=" right-align">
							<FormControlLabel
								className=""
								control={
									<Switch
										id="excluded"
										name="excluded"
										checked={excluded}
										onChange={handleCheckChange}
									/>
								}
								labelPlacement="start"
								label="Artículo excluido de acumulación"
							/>
						</Grid>

						<Grid item xs={9} className=" right-align">
							<FormControlLabel
								className="right primary-font"
								control={
									<Switch
										id="all"
										name="all"
										checked={all}
										onChange={handleCheckChange}
									/>
								}
								labelPlacement="start"
								label="Aplica para todos los puntos de venta"
							/>
						</Grid>

						<Grid item xs={12} />
					</Grid>
				</form>
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
						color="primary"
						variant="contained"
						className="mt-3 mx-2"
						startIcon={<CheckIcon />}
						style={{ textTransform: "none" }}
						type="submit"
						onClick={handleSubmit}
					>
						Guardar
					</Button>
				</div>
			</div>
		</div>
	);
};
