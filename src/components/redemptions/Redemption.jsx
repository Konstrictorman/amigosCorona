import React from "react";
import queryString from "query-string";
import {
	Button,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SellIcon from "@mui/icons-material/Sell";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { Item } from "../general/Item";
import * as yup from "yup";
import { useFormik } from "formik";
import { Spinner } from "../general/Spinner";
import { getRedemptionById } from "./selectors/getRedemptionById";
import Swal from "sweetalert2";
import { ERROR_MSG, INPUT_TYPE } from "../../config/config";
import { useEffect } from "react";
import { SalesPointsCombo } from "../salesPoint/SalesPointsCombo";
import SearchIcon from "@mui/icons-material/Search";
import { SearchTableModal } from "../general/SearchTableModal";
import { FieldsComboBox } from "../fields/FieldsComboBox";
import { getReferrerBalanceByDocument } from "../clients/selectors/getReferrerBalanceByDocument";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../general/actions/uiActions";
import { getClientColumns2 } from "../clients/selectors/getClientColumns2";
import { CustomNumberFormat } from "../general/CustomNumberFormat";
import { createRedemption, processRedemptionById } from "./actions/redemptionActions";

const validationSchema = yup.object({
	documento: yup
		.string()
		.min(6, "El código del referenciador debe tener al menos 6 caracteres")
		.required("El código del referenciador es requerido"),
	tipoRedencion: yup.string().nullable().required("El tipo de redención es requerido"),
	monto: yup
		.number()
		.min(0, "El monto de la redención no puede tener valores negativos")
		.required("El monto de la redención es requerido"),
	idPuntoVenta: yup.string().required("El punto de venta es requerido"),
	referencia: yup
      .string()
      .max(15,"La referencia debe ser menor a 15 caracteres")
      .required("La referencia es requerida"),
});

export const Redemption = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);
	const [loading, setLoading] = useState(false);
	const [referrer, setReferrer] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
   const [show, setShow] = useState(false);
   const dispatch = useDispatch();
   const {tiposDocumento} = useSelector((state) => state.lists);
	const columns = getClientColumns2(tiposDocumento);

	const initialValues = {
		id: 0,
		documento: "",
		tipoRedencion: null,
		monto: "",
		idPuntoVenta: "",
		referencia: "",
		saldo: 0,    
      idCliente:0,  
	};

	const [formState, setFormState] = useState(initialValues);

	useEffect(() => {
		const getRedemption = async (id) => {
			setLoading(true);
			try {
				if (id) {
					const data = await getRedemptionById(id);
					setFormState({ ...data });
               setShow(true);
				}
			} catch (e) {
				console.log(e);
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
			}
		};
      
		getRedemption(id);
      setLoading(false);
	}, [id]);

	const formik = useFormik({
		initialValues: formState,
		validationSchema: validationSchema,
		onSubmit: (values) => {
         handleCreate(values);		
		},
		enableReinitialize: true,
	});

   const handleCreate = (values) =>{
      console.log(JSON.stringify(values, null, 2));	
      setLoading(true);
      createRedemption(values)
         .then(async (response)=> {
            await processRedemptionById(response.id);
				setLoading(false);
				Swal.fire(
					"Registro exitoso",
					"El registro se creó con éxito",
					"success"
				);            
         })
			.catch((e) => {
				setLoading(false);
				Swal.fire("Error", e.message, "error");
			});         
   }


   const handleReset = () => {
      formik.resetForm();
      setShow(false);
   }

	const handleCustomChange = (name, val) => {
		//console.log("Cambiando valores:", name, val);
		formik.setFieldValue(name, val);
	};



	const handleClick = (params) => {
      setLoading(true);
		const { field, row } = params;
		console.log("click on ", row);
		if (field === "documento") {
			formik.setFieldValue("documento", row.documento);
		}
      loadReferrerBalance(row.documento);
		handleCloseModal();
      setLoading(false);
	};

   const loadReferrerBalance = (documento) => {
		getReferrerBalanceByDocument(documento)
         .then((response) => {
            //console.log(JSON.stringify(response,null,2));   
            if (response) {              
               setReferrer(response);      
               formik.setFieldValue("idCliente",response.idCliente);         
               setShow(true);
            } else {
               setShow(false);
            }
         })
         .catch((err)=> {
				Swal.fire(
					"Error",
					`El documento ${documento} no es válido para hacer redenciones`,
					"error"
				);
				dispatch(setError(new Error(`Documento ${documento} inválido`)));
         });
      
		
	};

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/redemptionsList",
	});

	if (loading) {
		return <Spinner  css="text-center spinner-top-margin"/>;
	}

	return (
		<div
			className={" d-flex flex-column   animate__animated " + animatedStyle}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Redención nueva
			</h4>

			<div
				className="align-self-center"
				style={{
					width: "100%",
				}}
			>
				<form
					id="ref-form"
					className="container__form"
					onSubmit={formik.handleSubmit}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Item className="half-width center">
								<TextField
									label="Número documento referenciador *"
									id="documento"
									type="text"
									name="documento"
									autoComplete="off"
									size="small"
									value={formik.values.documento}
									onChange={formik.handleChange}
									error={
										formik.touched.documento &&
										Boolean(formik.errors.documento)
									}
									className="form-control"
									variant={INPUT_TYPE}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													onClick={handleOpenModal}
													disabled={
														formik.values.documento?.length < 4
													}
												>
													<SearchIcon />
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</Item>
							<FormHelperText className="helperText right">
								{formik.touched.documento &&
									formik.errors.documento}
							</FormHelperText>
						</Grid>

					</Grid>
				</form>
				{show && (
					<form
						id="redemption-form"
						className="container__form"
						onSubmit={formik.handleSubmit}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<AssignmentIndIcon color="primary" />
								<Typography variant="caption" className="left-align">
									Información acumulada referenciador
								</Typography>
							</Grid>

							<Grid item xs={6} className="grid-item">
								<Item className="">
									<TextField
										label="Nombre"
										id="name"
										type="text"
										name="name"
										autoComplete="off"
										size="small"
										value={referrer?.nombre}
										//onChange={handleInputChange}
										error={false}
										className="form-control"
										variant={INPUT_TYPE}
										disabled={true}
									/>
								</Item>
							</Grid>

							<Grid item xs={3} className="grid-item">
								<Item className="">
									<TextField
										label="N° Celular Nequi"
										id="nequi"
										type="text"
										name="nequi"
										autoComplete="off"
										size="small"
										value={referrer?.celNequi}
										//onChange={handleInputChange}
										error={false}
										className="form-control"
										variant={INPUT_TYPE}
										disabled={true}
									/>
								</Item>
							</Grid>

							<Grid item xs={3} className="grid-item">
								<Item className="">
									<TextField
										label="Saldo disponible"
										id="newBalance"
										type="text"
										name="newBalance"
										autoComplete="off"
										size="small"
										value={referrer?.saldo}
										//onChange={handleInputChange}
										error={false}
										className="form-control"
										variant={INPUT_TYPE}
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
							</Grid>
							<Grid item xs={12}>
								<SellIcon color="primary" />
								<Typography variant="caption" className="left-align">
									Información redención
								</Typography>
							</Grid>

							<Grid item xs={4}>
								<Item>
                        <FieldsComboBox
									id="tipoRedencion"
									label="Tipo redención *"
									value={formik.values.tipoRedencion}
									type="tiposRedencion"
									handleChange={(e) => {
										handleCustomChange("tipoRedencion",e.target.value);
									}}
									valueType="valor"
                           labelType="valor"
									error={
										formik.touched.tipoRedencion &&
										Boolean(formik.errors.tipoRedencion)
									}
								/>             
								</Item>
								<FormHelperText className="helperText">
									{formik.touched.tipoRedencion &&
										formik.errors.tipoRedencion}
								</FormHelperText>
							</Grid>

							<Grid item xs={4} className="">
								<Item className="">
									<TextField
										label="Monto redención *"
										id="monto"
										type="text"
										name="monto"
										autoComplete="off"
										size="small"
										value={formik.values.monto}
										onChange={formik.handleChange}
										error={
											formik.touched.monto &&
											Boolean(formik.errors.monto)
										}
										className="form-control"
										variant={INPUT_TYPE}
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
								<FormHelperText className="helperText">
									{formik.touched.monto && formik.errors.monto}
								</FormHelperText>
							</Grid>

							<Grid item xs={4} className="">
								<Item className="">
									<SalesPointsCombo
										label="Punto de venta *"
										id={"idPuntoVenta"}
										value={formik.values.idPuntoVenta}
										handleValueChange={(val) => {
											handleCustomChange("idPuntoVenta", val);
										}}
										error={
											formik.touched.idPuntoVenta &&
											Boolean(formik.errors.idPuntoVenta)
										}
									/>
								</Item>
								<FormHelperText className="helperText">
									{formik.touched.idPuntoVenta &&
										formik.errors.idPuntoVenta}
								</FormHelperText>
							</Grid>

							<Grid item xs={4} className="">
								<Item className="">
									<TextField
										label="Referencia *"
										id="referencia"
										type="text"
										name="referencia"
										autoComplete="off"
										size="small"
										value={formik.values.referencia}
										onChange={formik.handleChange}
										error={
											formik.touched.referencia &&
											Boolean(formik.errors.referencia)
										}
										className="form-control"
										variant={INPUT_TYPE}
									/>
								</Item>
								<FormHelperText className="helperText">
									{formik.touched.referencia &&
										formik.errors.referencia}
								</FormHelperText>
							</Grid>

							<Grid item xs={4} className="">
								<Item className="">
									<TextField
										label="Nuevo saldo"
										id="newBalance"
										type="text"
										name="newBalance"
										autoComplete="off"
										size="small"
										value={referrer?.saldo - parseFloat(formik.values.monto)}
										onChange={formik.handleChange}
										error={false}
										className="form-control"
                              disabled={true}
										variant={INPUT_TYPE}
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
								<FormHelperText className="helperText">
									{formik.touched.newBalance &&
										formik.errors.newBalance}
								</FormHelperText>
							</Grid>
						</Grid>
					</form>
				)}
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
               {show &&(
					<Button
						variant="contained"
						className="mt-3 mx-2 btn-error"
						startIcon={<CleaningServicesIcon />}
						style={{ textTransform: "none" }}
						onClick={handleReset}
					>
						Limpiar
					</Button>
               )}
               {show &&(
					<Button
						form="redemption-form"
						color="primary"
						variant="contained"
						className="mt-3 mx-2"
						startIcon={<CheckIcon />}
						style={{ textTransform: "none" }}
						type="submit"
                  disabled={!formik.values.tipoRedencion}
					>
						Generar {formik.values.tipoRedencion}
					</Button>
               )}
				</div>

				<SearchTableModal
               title="Referenciadores"
					handleClose={handleCloseModal}
					handleAction={handleClick}
					open={openModal}
               criteria="documento"
					filter={formik.values.documento}
					pageSize={10}
               columns={columns}
					//items={selectedIds}
				></SearchTableModal>
			</div>
		</div>
	);
};
