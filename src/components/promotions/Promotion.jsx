import React, { useMemo } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { getSalesPoints } from "../salesPoint/selectors/getSalesPoints";
import { getPromoById } from "./selectors/getPromoById";
import { useLocation, useNavigate } from "react-router";
import queryString from "query-string";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import {
	Button,
	FormControlLabel,
	FormHelperText,
	Grid,
	InputAdornment,
	MenuItem,
	Switch,
	TextField,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import esLocale from "date-fns/locale/es";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import "../../assets/styles/global.css";
import { useForm } from "../customHooks/useForm";
import { DesktopDatePicker } from "@mui/lab";


const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

export const Promotion = () => {
   const navigate = useNavigate();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);
	const promo = useMemo(() => getPromoById(id), [id]);
	const salePoints = getSalesPoints();



	const sortedSalePoints = useMemo(() => {
		const array = salePoints.slice().sort((a, b) => a.name.localeCompare(b.name));
		return array;
   }, [salePoints]);

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/promotionsList",
	});

	const [formValues, handleInputChange, handleValueChange, handleCheckChange] =
		useForm({
			name: promo?.name ? promo.name : "",
			fechaInicio: promo?.fechaInicio ? promo.fechaInicio : "",
			fechaFin: promo?.fechaFin ? promo.fechaFin : "",
			idArticulo: promo?.idArticulo ? promo.idArticulo : "",
			idPuntoVenta: promo?.idPuntoVenta ? promo.idPuntoVenta : "",
			pctPromo: promo?.pctPromo ? promo.pctPromo : "",
			flagExclusion: promo?.flagExclusion ? promo.flagExclusion : false,
			flagTodos: promo?.flagTodos ? promo.flagTodos : false,
		});

	const {
		name,
		fechaInicio,
		fechaFin,
		idArticulo,
		idPuntoVenta,
		pctPromo,
		flagExclusion,
		flagTodos,
	} = formValues;

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formValues);
	};

	return (
		<div
			className={"d-flex flex-column container animate__animated " + animatedStyle}
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
							<Item className="half-quarter-width">
								<LocalizationProvider
									dateAdapter={AdapterDateFns}
									locale={esLocale}
								>
									<DesktopDatePicker
										label="Fecha inicio vigencia"
										id="fechaInicio"
										value={fechaInicio}
										minDate={new Date()}
										onChange={(newValue) => {
											handleValueChange("fechaInicio", newValue);
										}}
										className="form-control"
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
								
							</FormHelperText>
						</Grid>

						<Grid item xs={6}>
							<Item>
								<TextField
									label="Artículo"
									error={false}
									id="idArticulo"
									type="text"
									name="idArticulo"
									autoComplete="off"
									size="small"
									required
									value={idArticulo}
									onChange={handleInputChange}
									className="form-control"
								/>
							</Item>
							<FormHelperText className="helperText">
								{" "}
								
							</FormHelperText>
						</Grid>

						<Grid item xs={6} >
							<Item className=" half-quarter-width">
								<LocalizationProvider
									dateAdapter={AdapterDateFns}
									locale={esLocale}
								>
									<DesktopDatePicker
										label="Fecha final vigencia"
										id="fechaFin"
										value={fechaFin}
										minDate={new Date()}
										onChange={(newValue) => {
											handleValueChange("fechaFin", newValue);
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
							<FormHelperText className="helperText">{" "} </FormHelperText>
						</Grid>

						<Grid item xs={6} >
							<Item className="half-quarter-width right">
								<TextField
									label="Punto de venta"
									error={false}
									id="salesPoint"
									select
									name="salesPoint"
									size="small"
									value={idPuntoVenta}
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
							</FormHelperText>
						</Grid>

						<Grid item xs={6}>
							<Item className="half-width">
								<TextField
									label="Porcentaje"
									type="number"
									error={false}
									id="pctPromo"
									name="pctPromo"
									autoComplete="off"
									size="small"
									required
									value={pctPromo}
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
							<FormHelperText> {" "}</FormHelperText>
						</Grid>

						<Grid item xs={9} className=" right-align">
							<FormControlLabel
								className=""
								control={
									<Switch
										id="flagExclusion"
										name="flagExclusion"
										checked={flagExclusion}
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
										id="flagTodos"
										name="flagTodos"
										checked={flagTodos}
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
