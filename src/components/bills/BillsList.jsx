import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
	Button,
	FormHelperText,
	Grid,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { useForm } from "../customHooks/useForm";
import { useNavigate } from "react-router-dom";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import esLocale from "date-fns/locale/es";
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { DataTable } from "../general/DataTable";
import { NoRowsOverlay } from "../general/NoRowsOverlay";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getBillColumns } from "./selectors/getBillColumns";
import { getBills } from "./selectors/getBills";
import { GridLoadingOverlay } from "@mui/x-data-grid";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

export const BillsList = () => {
	const navigate = useNavigate();
	
   const handleClick = (params) => {
		const { field, row } = params;
		if (field === "numeroFactura") {
			navigate(`/bill?id=${row.id}`);
		}
	};

	const columns = getBillColumns();
   const [rows, setRows] = useState([])

   const search = () => {
      setRows(getBills());      
   }

   const clear = () => {
      setRows([]);
      reset();
   }

	const [
		formValues,
		handleInputChange,
		handleValueChange,
		handleCheckChange,
		handleComplexInputChange,
      reset,
	] = useForm({
		puntoDeVenta: "",
		fechaInicial: "",
		fechaFinal: "",
		numFactura: "",
		numPedido: "",
		clienteVenta: "",
		clienteReferenciador: "",
	});

	const {
		puntoDeVenta,
		fechaInicial,
		fechaFinal,
		numFactura,
		numPedido,
		clienteVenta,
		clienteReferenciador,
	} = formValues;

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formValues);
      search();
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
			<h4 className="title align-self-center" style={{ width: "80%" }}>
				Buscar Facturas
			</h4>
			<div
				className="align-self-center"
				style={{
					width: "80%",
				}}
			>
				<form
					className="form border border-primary rounded"
					onSubmit={handleSubmit}
				>
					<Grid container spacing={2} rowSpacing={1}>
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
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<TextField
									label="Punto de venta"
									error={false}
									id="puntoDeVenta"
									type="text"
									name="puntoDeVenta"
									autoComplete="off"
									size="small"
									value={puntoDeVenta}
									onChange={handleInputChange}
									className="form-control"
									disabled={false}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<TextField
									label="Cliente venta"
									error={false}
									id="clienteVenta"
									type="text"
									name="clienteVenta"
									autoComplete="off"
									size="small"
									value={clienteVenta}
									onChange={handleInputChange}
									className="form-control"
									disabled={false}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<TextField
									label="Número de factura"
									error={false}
									id="numFactura"
									type="text"
									name="numFactura"
									autoComplete="off"
									size="small"
									value={numFactura}
									onChange={handleInputChange}
									className="form-control"
									disabled={false}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<TextField
									label="Número de pedido"
									error={false}
									id="numPedido"
									type="text"
									name="numPedido"
									autoComplete="off"
									size="small"
									value={numPedido}
									onChange={handleInputChange}
									className="form-control"
									disabled={false}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<TextField
									label="Cliente referenciador"
									error={false}
									id="clienteReferenciador"
									type="text"
									name="clienteReferenciador"
									autoComplete="off"
									size="small"
									value={clienteReferenciador}
									onChange={handleInputChange}
									className="form-control"
									disabled={false}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
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
			{rows && (
				<div className="topMargin">
					<Typography variant="h6" className="left-align">
						{rows.length} Resultados
					</Typography>
					<div className="align-self-center dataTableContainer ">
						{
							<DataTable
								rows={rows}
								columns={columns}
								pageSize={10}
								onCellClick={handleClick}
								disableSelectionOnClick={true}
								components={{
									NoRowsOverlay: NoRowsOverlay,
                           LoadingOverlay: GridLoadingOverlay
								}}
							/>
						}
					</div>
				</div>
			)}
		</div>
	);
};
