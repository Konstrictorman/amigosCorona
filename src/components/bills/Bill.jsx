import React, { useEffect,  useRef, useState } from "react";
import {
	Button,
	FormControlLabel,
	Grid,
	InputAdornment,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { getBillById } from "./selectors/getBillById";
import { getClientById } from "../clients/selectors/getClientById";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { CustomNumberFormat } from "../general/CustomNumberFormat";
import { getBillDetailColumns } from "./selectors/getBillDetailColumns";
import { NoRowsOverlay } from "../general/NoRowsOverlay";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Swal from "sweetalert2";
import { ERROR_MSG, INPUT_TYPE, TIME_OUT } from "../../config/config";
import { Spinner } from "../general/Spinner";
import { getSalesPointById } from "../salesPoint/selectors/getSalesPointById";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../general/actions/uiActions";
import { delay } from "../../helpers/delay";
import { getArticlesByBillId } from "./selectors/getArticlesByBillId";
import { Item } from "../general/Item";
import { DataGrid } from "@mui/x-data-grid";
import { CustomDatePicker } from "../general/CustomDatePicker";

export const Bill = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);
	const detailColumns = getBillDetailColumns();
	const [articulos, setArticulos] = useState([]);
	const [loading, setLoading] = useState(false);
	const componentMounted = useRef(true);
	const [formState, setFormState] = useState({});
	const { estados } = useSelector((state) => state.lists);
	const dispatch = useDispatch();

	const {
		clienteVta,
		fechaFactura,
		flagEsPremium,
		idFacturaOriginal,
		numeroFactura,
		pedido,
		tipoFactura,
		valor,
		valorAntesImpuesto,
		puntoVenta,
		estado,
		nomReferenciador,
		codeReferenciador,
      valor_premium,
	} = formState;

	useEffect(() => {
		const bill = async (id) => {
			setLoading(true);
			try {
				const data = await getBillById(id);
				console.log("data:", data);
            await delay(TIME_OUT);
            const pVta = await getSalesPointById(data.idPuntoVenta);
            const cliente = await getClientById(data.idClienteRef);
            console.log("Estados:", estados);
            const estado = estados?.find(
               (e) => e.valor === data.estadoFactura
            );

            const articles = await getArticlesByBillId(id);
            
				if (componentMounted.current) {
					setFormState( {
							...data,
                     
							puntoVenta: pVta?.descripcion,
							estado: estado?.descripcion,
							nomReferenciador: cliente?.nombreCompleto,
							codeReferenciador: cliente?.codigoCliente,
                     
					});
               console.log("articles:",articles);
               setArticulos(articles);
               
				}
			} catch (e) {
				console.log(e);
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
				dispatch(setError(e));
			}

			setLoading(false);
		};

		bill(id);

		return () => {
			componentMounted.current = false;
			setLoading(null);
		};
	}, [id, dispatch, estados]);

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/billsList",
	});

	if (loading) {
		return <Spinner  css="text-center spinner-top-margin"/>;
	}

	return (
		<div
			className={
				"d-flex flex-column container animate__animated " + animatedStyle
			}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Factura {numeroFactura}
			</h4>
			<div
				className="align-self-center"
				style={{
					width: "100%",
				}}
			>
				<form className="container__form">
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
									value={puntoVenta}
									className="form-control"
									disabled={true}
									variant={INPUT_TYPE}
								/>
							</Item>
						</Grid>

						<Grid item xs={4}>
							<Item>

                     <CustomDatePicker
									label="Fecha factura"
									id="fechaFactura"
									value={fechaFactura}									
                           disabled={true}
								/>
                    
							</Item>
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
									value={clienteVta}
									className="form-control"
									disabled={true}
									variant={INPUT_TYPE}
								/>
							</Item>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Código referenciador"
									error={false}
									id="idClienteRef"
									type="text"
									name="idClienteRef"
									autoComplete="off"
									size="small"
									value={codeReferenciador}
									className="form-control"
									disabled={true}
									variant={INPUT_TYPE}
								/>
							</Item>
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
									className="form-control"
									disabled={true}
									variant={INPUT_TYPE}
								/>
							</Item>
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
									className="form-control"
									disabled={true}
									variant={INPUT_TYPE}
								/>
							</Item>
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
									value={estado}
									className="form-control"
									disabled={true}
									variant={INPUT_TYPE}
								/>
							</Item>
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
									className="form-control"
									disabled={true}
									variant={INPUT_TYPE}
								/>
							</Item>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Factura original"
									error={false}
									id="idFacturaOriginal"
									type="text"
									name="idFacturaOriginal"
									autoComplete="off"
									size="small"
									value={idFacturaOriginal}
									className="form-control"
									disabled={true}
									variant={INPUT_TYPE}
								/>
							</Item>
						</Grid>

						<Grid item xs={6} className="left-align">
							<FormControlLabel
								control={
									<Switch
										id="flagEsPremium"
										name="flagEsPremium"
										checked={flagEsPremium}
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

						<Grid item xs={3}>
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
									variant={INPUT_TYPE}
								/>
							</Item>
						</Grid>

						<Grid item xs={3}>
							<Item>
								<TextField
									label="Impuesto"
									error={false}
									id="impuesto"
									type="text"
									name="impuesto"
									autoComplete="off"
									size="small"
									value={(valor - valorAntesImpuesto).toFixed(2)}
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
									variant={INPUT_TYPE}
								/>
							</Item>
						</Grid>

						<Grid item xs={3}>
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
									variant={INPUT_TYPE}
								/>
							</Item>
						</Grid>

						<Grid item xs={3}>
							<Item>
								<TextField
									label="Valor Premium"
									error={false}
									id="valor"
									type="text"
									name="valor"
									autoComplete="off"
									size="small"
									value={valor_premium}
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
									variant={INPUT_TYPE}
								/>
							</Item>
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
