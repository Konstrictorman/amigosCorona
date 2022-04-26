import React, { useEffect, useMemo, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import {
   Autocomplete,
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Spinner } from "../general/Spinner";
import { getBillColumns } from "./selectors/getBillColumns";
import { getBills } from "./selectors/getBills";
import { getSalesPointsForCombo } from "../salesPoint/selectors/getSalesPointsForCombo";
import { PAGE_SIZE } from "../../config/config";

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
   const [sortedSalesPoints, setSortedSalesPoints] = useState([]);
	const [rows, setRows] = useState([]);
   const [loading, setLoading] = useState(false);
   const componentMounted = useRef(true);

   useEffect(() => {
      const getSalesPointsList = async () => {
			setLoading(true);
			const sps = await getSalesPointsForCombo();

			if (componentMounted.current) {
				setSortedSalesPoints(sps);
			}
			setLoading(false);
		};
   
		getSalesPointsList();
		return () => {
			componentMounted.current = false;
			setLoading(null);
		};

   }, []);
   


	const handleClick = (params) => {
		const { field, row } = params;
		if (field === "numeroFactura") {
			navigate(`/bill?id=${row.id}`);
		}
	};   

	const search = () => {
		setRows(getBills());
	};

	const clear = () => {
		setRows([]);
		reset();
	};

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
		search();
	};

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

   
	if (loading) {
		return <Spinner />;
	}

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
				<form
					className="container__form"
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

						<Grid item xs={6}>
							<Item className="">
                     <Autocomplete
											disablePortal
											id="puntoDeVenta"
											options={sortedSalesPoints}
											renderInput={(params) => (
												<TextField
													{...params}
													className="form-control"
													size="small"
													label="Punto de venta"
													onChange={handleInputChange}
													value={puntoDeVenta}
													required
												/>
											)}
										/>
{/*
								<TextField
									label="Punto de venta"
									error={false}
									id="puntoDeVenta"
									select
									name="puntoDeVenta"
									autoComplete="off"
									size="small"
									value={puntoDeVenta}
									onChange={handleInputChange}
									className="form-control"
									disabled={false}
                        >
									<MenuItem value="">...</MenuItem>
									{sortedSalesPoints.map((sp) => (
										<MenuItem key={sp.id} value={sp.id}>
											{sp.name}
										</MenuItem>
									))}                           
                        </TextField>
*/}								
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
			{rows.length > 0 && (
				<div className="topMargin">
					<Typography variant="h6" className="left-align">
						{rows.length} Resultados
					</Typography>
					<div className="container__dataTable ">
						{
							<DataTable
								rows={rows}
								columns={columns}
								pageSize={PAGE_SIZE}
								onCellClick={handleClick}
								disableSelectionOnClick={true}
							/>
						}
					</div>
				</div>
			)}
		</div>
	);
};
