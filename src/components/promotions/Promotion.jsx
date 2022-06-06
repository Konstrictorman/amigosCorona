import React, { useEffect, useMemo, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { getSalesPoints } from "../salesPoint/selectors/getSalesPoints";
import { getPromoById } from "./selectors/getPromoById";
import { useLocation, useNavigate } from "react-router";
import queryString from "query-string";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import {
	Autocomplete,
	Button,
	FormControlLabel,
	FormHelperText,
	Grid,
	InputAdornment,
	Switch,
	TextField,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import esLocale from "date-fns/locale/es";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { useForm } from "../customHooks/useCustomForm";
import { DesktopDatePicker } from "@mui/lab";
import { getSalesPointsForCombo } from "../salesPoint/selectors/getSalesPointsForCombo";
import { Spinner } from "../general/Spinner";
import { SalesPointsCombo } from "../salesPoint/SalesPointsCombo";
import { useSelector } from "react-redux";
import { INPUT_TYPE } from "../../config/config";

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
//	const [sortedSalesPoints, setSortedSalesPoints] = useState([]);
	const componentMounted = useRef(true);
	const [loading, setLoading] = useState(false);


	const [formState, setFormState] = useState({
		id: 0,
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
	} = formState;

   /**
   const idPuntoVentaRef = useRef(idPuntoVenta);

	useEffect(() => {
		const getSalesPointsList = async () => {
			setLoading(true);
			const sps = await getSalesPointsForCombo();

			if (componentMounted.current) {
				setSortedSalesPoints(sps);
				const sel = sps.filter((s) => s.id === idPuntoVentaRef.current.toString());
				setSelected(sel[0]);
			}
			setLoading(false);
		};

		getSalesPointsList();
		return () => {
			componentMounted.current = false;
			setLoading(null);
		};
	}, []);
   */

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/promotionsList",
	});

	//Desestructura del event, el objeto target en el argumento
	const handleInputChange = ({ target }) => {
		setFormState({
			...formState,
			[target.name]: target.value,
		});
		console.log("sp?:", formState);
	};

	const handleValueChange = (name, value) => {
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleCheckChange = ({ target }) => {
		console.log("target:", target.name);
		setFormState({
			...formState,
			[target.name]: target.checked,
		});
	};



	const handleSave = () => {
		console.log(formState);
	};

	if (loading) {
		return <Spinner />;
	}

	return (
		<div
			className={
				"d-flex flex-column container animate__animated " + animatedStyle
			}
		>
			{formState && (
				<h4 className="title align-self-center" style={{ width: "80%" }}>
					Promoción / Exclusión {promo?.id ? promo.name : "nueva"}
				</h4>
			)}
			<div
				className="align-self-center"
				style={{
					height: 460,
					width: "80%",
				}}
			>
				{formState && (
					<form className="container__form">
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
                              variant={INPUT_TYPE}
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
                                       variant={INPUT_TYPE}
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
                              variant={INPUT_TYPE}
									/>
								</Item>
								<FormHelperText className="helperText">
									{" "}
								</FormHelperText>
							</Grid>

							<Grid item xs={6}>
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
                                       variant={INPUT_TYPE}
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
								<Item className=" right">
                           {/*
									<Autocomplete
										disablePortal
										id="salesPoint"
										options={sortedSalesPoints}
										value={selected}
										onChange={(event, newValue) => {
											handleChange(event, newValue);
										}}
										inputValue={nomPuntoVenta}
										onInputChange={(event, newInputValue) => {
											setNomPuntoVenta(newInputValue);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												className="form-control"
												size="small"
												label="Punto de venta"
												required
											/>
										)}
                              />*/}

                              <SalesPointsCombo id={idPuntoVenta} handleValueChange={handleValueChange}/>
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
                              variant={INPUT_TYPE}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													%
												</InputAdornment>
											),
										}}
									/>
								</Item>
								<FormHelperText> </FormHelperText>
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
				)}
				<div>
					<Button
						variant="contained"
						className="mt-3 mx-2 btn-error"
						startIcon={<ClearIcon />}
						style={{ textTransform: "none" }}
						onClick={handleClickOut}
					>
						Cancelar
					</Button>
					<Button
						variant="contained"
						className="mt-3 mx-2 btn-primary"
						startIcon={<CheckIcon />}
						style={{ textTransform: "none" }}
						type="submit"
						onClick={handleSave}
					>
						Guardar
					</Button>
				</div>
			</div>
		</div>
	);
};
