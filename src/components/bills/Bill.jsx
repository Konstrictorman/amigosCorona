import React, { useMemo } from "react";
import { styled } from "@mui/material/styles";
import {
	Button,
	FormControlLabel,
	FormHelperText,
	Grid,
	InputAdornment,
	Paper,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { getBillById } from "./selectors/getBillById";
import { useForm } from "../customHooks/useForm";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import esLocale from "date-fns/locale/es";
import { getClientById } from "../clients/selectors/getClientById";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { CustomNumberFormat } from "../general/CustomNumberFormat";
import { DataGrid } from "@mui/x-data-grid";
import { getBillDetailColumns } from "./selectors/getBillDetailColumns";
import { NoRowsOverlay } from "../general/NoRowsOverlay";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

export const Bill = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);
	const fact = useMemo(() => getBillById(id), [id]);
	const ref = useMemo(() => getClientById(fact.idClienteRef), [fact]);
	const detailColumns = getBillDetailColumns();

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/billsList",
	});

	const [
		formValues,
		handleInputChange,
		handleValueChange,
		handleCheckChange,
		handleComplexInputChange,
	] = useForm({
		numFactura: fact?.numeroFactura ? fact.numeroFactura : "",
		ptoVenta: fact?.idPuntoVenta ? fact.idPuntoVenta : "",
		fechaFactura: fact?.fechaFactura ? fact.fechaFactura : "",
		clienteVenta: fact?.clienteVta ? fact.clienteVta : "",
		codReferenciador: ref?.codigoCliente ? ref.codigoCliente : "",
		nomReferenciador: ref
			? ref.primerNombre +
			  " " +
			  ref.segundoNombre +
			  " " +
			  ref.primerApellido +
			  " " +
			  ref.segundoApellido
			: "",
		estadoFactura: fact?.estadoFactura ? fact.estadoFactura : "",
		pedido: fact?.pedido ? fact.pedido : "",
		idFactOriginal: fact?.idFacturaOriginal ? fact.idFacturaOriginal : "",
		tipoFactura: fact?.tipoFactura ? fact.tipoFactura : "",
		premium: fact?.flagEsPremium ? fact.flagEsPremium : "",
		valor: fact?.valor ? fact.valor : "",
		valorAntesImpuesto: fact?.valorAntesImpuesto
			? fact.valorAntesImpuesto
			: "",
		impuesto: fact?.valor - fact?.valorAntesImpuesto,
		articulos: fact?.articulosFactura ? fact.articulosFactura : [],
	});

	const {
		numFactura,
		ptoVenta,
		fechaFactura,
		clienteVenta,
		codReferenciador,
		nomReferenciador,
		estadoFactura,
		pedido,
		idFactOriginal,
		tipoFactura,
		premium,
		valor,
		valorAntesImpuesto,
		impuesto,
		articulos,
	} = formValues;

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formValues);
	};

	return (
		<div
			className={
				"d-flex flex-column container animate__animated " + animatedStyle
			}
		>
			<h4 className="title align-self-center" style={{ width: "90%" }}>
				Factura {numFactura}
			</h4>
			<div
				className="align-self-center"
				style={{
					width: "90%",
				}}
			>
				<form
					className="form border border-primary rounded"
					onSubmit={handleSubmit}
				>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<Item>
								<TextField
									label="Punto de venta"
									error={false}
									id="ptoVenta"
									type="text"
									name="ptoVenta"
									autoComplete="off"
									size="small"
									value={ptoVenta}
									onChange={handleInputChange}
									className="form-control"
									disabled={true}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<LocalizationProvider
									dateAdapter={AdapterDateFns}
									locale={esLocale}
								>
									<DesktopDatePicker
										label="Fecha factura"
										id="fechaFactura"
										value={fechaFactura}
										minDate={new Date()}
										onChange={(newValue) => {
											handleValueChange("fechaFactura", newValue);
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
										disabled={true}
									/>
								</LocalizationProvider>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
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
									disabled={true}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Código referenciador"
									error={false}
									id="codReferenciador"
									type="text"
									name="codReferenciador"
									autoComplete="off"
									size="small"
									value={codReferenciador}
									onChange={handleInputChange}
									className="form-control"
									disabled={true}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={8}>
							<Item>
								<TextField
									label="Nombre referenciador"
									error={false}
									id="nomReferenciador"
									type="text"
									name="nomReferenciador"
									autoComplete="off"
									size="small"
									value={nomReferenciador}
									onChange={handleInputChange}
									className="form-control"
									disabled={true}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Pedido"
									error={false}
									id="pedido"
									type="text"
									name="pedido"
									autoComplete="off"
									size="small"
									value={pedido}
									onChange={handleInputChange}
									className="form-control"
									disabled={true}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Estado factura"
									error={false}
									id="estadoFactura"
									type="text"
									name="estadoFactura"
									autoComplete="off"
									size="small"
									value={estadoFactura}
									onChange={handleInputChange}
									className="form-control"
									disabled={true}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Tipo factura"
									error={false}
									id="tipoFactura"
									type="text"
									name="tipoFactura"
									autoComplete="off"
									size="small"
									value={tipoFactura}
									onChange={handleInputChange}
									className="form-control"
									disabled={true}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Factura original"
									error={false}
									id="idFactOriginal"
									type="text"
									name="idFactOriginal"
									autoComplete="off"
									size="small"
									value={idFactOriginal}
									onChange={handleInputChange}
									className="form-control"
									disabled={true}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={6} className="left-align">
							<FormControlLabel
								control={
									<Switch
										id="premium"
										name="premium"
										checked={premium}
										onChange={handleCheckChange}
									/>
								}
								labelPlacement="start"
								label="Premium"
								disabled={true}
							/>
						</Grid>

						<Grid item xs={12}>
							<MonetizationOnIcon color="primary" />
							<Typography variant="caption" className="left-align">
								Valores de la factura
							</Typography>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Valor antes de impuesto"
									error={false}
									id="valorAntesImpuesto"
									type="text"
									name="valorAntesImpuesto"
									autoComplete="off"
									size="small"
									value={valorAntesImpuesto}
									onChange={handleInputChange}
									className="form-control"
									disabled={true}
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
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Impuesto"
									error={false}
									id="impuesto"
									type="text"
									name="impuesto"
									autoComplete="off"
									size="small"
									value={impuesto}
									onChange={handleInputChange}
									className="form-control"
									disabled={true}
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
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Valor total"
									error={false}
									id="valor"
									type="text"
									name="valor"
									autoComplete="off"
									size="small"
									value={valor}
									onChange={handleInputChange}
									className="form-control"
									disabled={true}
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
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>
						<Grid item xs={12}>
							<div className="center">
								<DataGrid
									className="rounded border-warning"
									rows={articulos}
									columns={detailColumns}
									pageSize={5}
									checkboxSelection={false}
									density="compact"
									autoHeight={true}
									autoPageSize={true}
									components={{
										NoRowsOverlay: NoRowsOverlay,
									}}
								/>
							</div>
						</Grid>
					</Grid>
				</form>
				<div className="align-self-center">
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
				</div>
			</div>
		</div>
	);
};
