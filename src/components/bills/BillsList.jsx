import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
	Button,
	FormHelperText,
	Grid,
	Paper,
	TextField,
} from "@mui/material";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { useNavigate } from "react-router-dom";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import esLocale from "date-fns/locale/es";
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getBillColumns } from "./selectors/getBillColumns";
import { SalesPointsCombo } from "../salesPoint/SalesPointsCombo";
import { INPUT_TYPE } from "../../config/config";
import { PagedBillDataTable } from "./PagedBillDataTable";
import moment from 'moment';
import { dateFormatter2 } from "../../helpers/dateFormatter";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

export const BillsList = () => {
	const navigate = useNavigate();
	const columns = getBillColumns();

	const [params, setParams] = useState({});
	const [show, setShow] = useState(false);

	const [formState, setFormState] = useState({
		idPuntoVenta: "",
		fechaDesde: "",
		fechaHasta: "",
		numeroFactura: "",
		pedido: "",
		clienteVta: "",
		idClienteRef: "",
	});

	const {
		idPuntoVenta,
		fechaDesde,
		fechaHasta,
		numeroFactura,
		pedido,
		clienteVta,
		idClienteRef,
	} = formState;

	//Desestructura del event, el objeto target en el argumento
	const handleInputChange = ({ target }) => {
		setFormState({
			...formState,
			[target.name]: target.value,
		});
	};

	const handleValueChange = (name, value) => {
      let m = ""
      if (name === "fechaDesde" || name === "fechaHasta") {         
         m = dateFormatter2(value);         
      } else {
         m = value;
      }
		setFormState({
			...formState,
			[name]: m,
		});
	};

	const reset = () => {
		setFormState({
			idPuntoVenta: "",
			fechaDesde: "",
			fechaHasta: "",
			numeroFactura: "",
			pedido: "",
			clienteVta: "",
			idClienteRef: "",
		});
	};

	const handleClick = (params) => {
		const { field, row } = params;
		if (field === "numeroFactura") {
			navigate(`/bill?id=${row.id}`);
		}
	};

	const handleReset = () => {
		reset();
		setParams({});
		setShow(false);
	};

	const handleSearch = () => {
		Object.entries(formState).forEach((fv) => {
			if (fv[1]) {
				setParams((_params) => {
					return {
						..._params,
						[fv[0]]: fv[1],
					};
				});
			}
		});

		setShow(true);
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
				<form className="container__form">
					<Grid container spacing={2} rowSpacing={1}>
						<Grid item xs={3}>
							<Item className="">
								<LocalizationProvider
									dateAdapter={AdapterDateFns}
									locale={esLocale}
								>
									<DesktopDatePicker
										label="Fecha inicial"
										id="fechaDesde"
										value={fechaDesde}
										maxDate={new Date()}
										onChange={(newValue) => {
											handleValueChange("fechaDesde", newValue);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												size="small"
												className="form-control"
												error={false}
												variant={INPUT_TYPE}
											/>
										)}
										disabled={false}
									/>
								</LocalizationProvider>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<LocalizationProvider
									dateAdapter={AdapterDateFns}
									locale={esLocale}
								>
									<DesktopDatePicker
										label="Fecha final"
										id="fechaHasta"
										value={fechaHasta}
										maxDate={new Date()}
										onChange={(newValue) => {
											handleValueChange("fechaHasta", newValue);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												size="small"
												className="form-control"
												error={false}
												variant={INPUT_TYPE}
											/>
										)}
										disabled={false}
									/>
								</LocalizationProvider>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={6}>
							<Item className="">
								<SalesPointsCombo
									id={idPuntoVenta}
									handleValueChange={handleValueChange}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<TextField
									label="Cliente venta"
									error={false}
									id="clienteVta"
									type="text"
									name="clienteVta"
									autoComplete="off"
									size="small"
									value={clienteVta}
									onChange={handleInputChange}
									className="form-control"
									disabled={false}
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<TextField
									label="Número de factura"
									error={false}
									id="numeroFactura"
									type="text"
									name="numeroFactura"
									autoComplete="off"
									size="small"
									value={numeroFactura}
									onChange={handleInputChange}
									className="form-control"
									disabled={false}
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<TextField
									label="Número de pedido"
									error={false}
									id="pedido"
									type="text"
									name="pedido"
									autoComplete="off"
									size="small"
									value={pedido}
									onChange={handleInputChange}
									className="form-control"
									disabled={false}
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<TextField
									label="Cliente referenciador"
									error={false}
									id="idClienteRef"
									type="text"
									name="idClienteRef"
									autoComplete="off"
									size="small"
									value={idClienteRef}
									onChange={handleInputChange}
									className="form-control"
									disabled={false}
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
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
									onClick={handleSearch}
								>
									Buscar
								</Button>
							</div>
						</Grid>
					</Grid>
				</form>
			</div>

			<PagedBillDataTable
				columns={columns}
				handleClick={handleClick}
				params={params}
				show={show}
			/>
		</div>
	);
};
