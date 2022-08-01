import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import queryString from "query-string";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import {
	Button,
	FormControlLabel,
	FormHelperText,
	Grid,
	InputAdornment,
	Stack,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import PercentIcon from "@mui/icons-material/Percent";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from "react-redux";
import { getBenefitById } from "./selectors/getBenefitById";
import { CustomNumberFormat } from "../general/CustomNumberFormat";
import { ERROR_MSG, INPUT_TYPE } from "../../config/config";
import { Separator } from "../general/Separator";
import { Spinner } from "../general/Spinner";
import Swal from "sweetalert2";
import { addBenefit, updateBenefit } from "./actions/benefitsAction";
import { setError } from "../general/actions/uiActions";
import * as yup from "yup";
import { useFormik } from "formik";
import { Item } from "../general/Item";
import { FieldsComboBox } from "../fields/FieldsComboBox";


const validationSchema = yup.object({
	nivelBeneficio: yup
		.string("Nivel de beneficio")
		.min(
			4,
			"El nombre del nivel de beneficios debe tener al menos 4 caracteres"
		)
		.required("El nombre del nivel de beneficios es requerido"),
	idProgramaReferenciacion: yup
		.string("Programa de referidos")
		.required("El programa de referidos es requerido"),
	descripcion: yup
		.string("descripcion")
		.min(8, "La descripción debe tener al menos 8 caracteres")
		.required("La descripción es requerida"),
	pctValInicial: yup
		.number("pctValInicial")
		.moreThan(-1, "El valor no puede ser negativo")
		.required("Valor requerido"),
	pctValNormal: yup
		.number("pctValNormal")
		.moreThan(-1, "El valor no puede ser negativo")
		.required("Valor requerido"),
	pctValPropio: yup
		.number("pctValPropio")
		.moreThan(-1, "El valor no puede ser negativo")
		.required("Valor requerido"),
	valMinRedencion: yup
		.number("valMinRedencion")
		.moreThan(-1, "El valor no puede ser negativo")
		.required("Valor requerido"),
	numMesesVigencia: yup
		.number("numMesesVigencia")
		.moreThan(-1, "El valor no puede ser negativo")
		.required("Valor requerido"),
	frecuenciaComp: yup
		.number("frecuenciaComp")
		.moreThan(-1, "El valor no puede ser negativo")
		.required("Valor requerido"),
	numMesesCom: yup
		.number("numMesesCom")
		.moreThan(-1, "El valor no puede ser negativo")
		.required("Valor requerido"),
	valMinimo: yup
		.number("valMinimo")
		.moreThan(-1, "El valor no puede ser negativo")
		.required("Valor requerido"),
	valMaxmo: yup
		.number("valMaxmo")
		.moreThan(
			yup.ref("valMinimo"),
			"El vr. máximo debe ser mayor que el vr. mínimo"
		)
		.required("Valor requerido"),
});

export const Benefit = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);
	const [loading, setLoading] = useState(false);
	const [flagEstado, setFlagEstado] = useState(false);
	const dispatch = useDispatch();

	const initialValues = {
		id: 0,
		nivelBeneficio: "",
		descripcion: "",
		estado: "",
		flagDefecto: false,
		flagEnvEle: false,
		frecuenciaComp: 0,
		idProgramaReferenciacion: "",
		numMesesCom: 0,
		numMesesVigencia: 0,
		pctValInicial: 0,
		pctValNormal: 0,
		pctValPropio: 0,
		valMaxmo: 0,
		valMinRedencion: 0,
		valMinimo: 0,
	};

	const [formState, setFormState] = useState(initialValues);

	useEffect(() => {
		const getBenefit = async (id) => {
			setLoading(true);
			try {
				if (id) {
					const data = await getBenefitById(id);
					//console.log("data:", data);

					setFormState({
						...data,
					});
					setFlagEstado(data.estado === "A" ? true : false);
				}
			} catch (e) {
				//console.log(e);
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
			}

			setLoading(false);
		};

		getBenefit(id);
	}, [id]);

	const formik = useFormik({
		initialValues: formState,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(JSON.stringify(values, null, 2));
			if (id) {
				console.log("updating...");
				update(values);
			} else {
				console.log("creating...");
				create(values);
			}
		},
		enableReinitialize: true,
	});



	const handleChange = (e) => {
		setFlagEstado(e.target.checked);
		formik.setFieldValue("estado", e.target.checked ? "A" : "I");
	};

	const update = (values) => {
		setLoading(true);
		updateBenefit(id, values)
			.then((response) => {
				setLoading(false);
				Swal.fire(
					"Actualización exitosa",
					"El registro se actualizó con éxito",
					"success"
				);
			})
			.catch((e) => {
				setLoading(false);
				console.log(e.response);
				Swal.fire(
					"Error",
					e.response?.data?.cause?.cause?.message,
					"error"
				);
				dispatch(setError(e));
			});
	};

	const create = (values) => {
		console.log("create");
		setLoading(true);
		addBenefit(values)
			.then((response) => {
				setLoading(false);
				formik.resetForm(initialValues);
				Swal.fire(
					"Registro exitoso",
					"El registro se creó con éxito",
					"success"
				);
			})
			.catch((err) => {
				setLoading(false);				
				Swal.fire(
					"Error",
					err.cause ? err.cause.message : (err.message? err.message:err),
					"error"
				);
				dispatch(setError(err));
			}); 
	};


   const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/benefitsList",
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
			<h4 className="title align-self-center" style={{ width: "80%" }}>
				Nivel de beneficios:{" "}
				{formState?.descripcion ? formState.descripcion : "nuevo"}
			</h4>
			<div
				className="align-self-center"
				style={{
					width: "80%",
				}}
			>
				<form
					id="benefit-form"
					className="container__form"
					onSubmit={formik.handleSubmit}
				>
					<Grid container spacing={2}>
						<Grid item xs={5}>
							<Item>
								<TextField
									label="Nivel de beneficios *"
									id="nivelBeneficio"
									type="text"
									name="nivelBeneficio"
									autoComplete="off"
									size="small"
									value={formik.values.nivelBeneficio}
									onChange={formik.handleChange}
									error={
										formik.touched.nivelBeneficio &&
										Boolean(formik.errors.nivelBeneficio)
									}
									className="form-control"
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.nivelBeneficio &&
									formik.errors.nivelBeneficio}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item>
                        
                     <FieldsComboBox
									id="idProgramaReferenciacion"
									label="Programa *"
									value={formik.values.idProgramaReferenciacion}
									type="programas"
									handleChange={(e) => {
										formik.handleChange(e);
									}}
									valueType="idProgramaReferenciacion"
                           labelType="valor"
									error={
										formik.touched.idProgramaReferenciacion &&
										Boolean(formik.errors.idProgramaReferenciacion)
									}
								/>                                              
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.idProgramaReferenciacion &&
									formik.errors.idProgramaReferenciacion}
							</FormHelperText>
						</Grid>
						<Grid item xs={4}>
							<div className="center">
								<Stack
									direction="row"
									spacing={1}
									alignItems="center"
									className="center"
								>
									<Typography>Inactivo</Typography>
									<Switch
										className="center"
										checked={flagEstado}
										onChange={handleChange}
										inputProps={{ "aria-label": "controlled" }}
									/>
									<Typography>Activo</Typography>
								</Stack>
							</div>
						</Grid>

						<Grid item xs={12}>
							<Item>
								<TextField
									label="Descripción"
									id="descripcion"
									type="text"
									name="descripcion"
									autoComplete="off"
									size="small"
									value={formik.values.descripcion}
									onChange={formik.handleChange}
									error={
										formik.touched.descripcion &&
										Boolean(formik.errors.descripcion)
									}
									className="form-control"
									minRows={3}
									maxRows={3}
									multiline={true}
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.descripcion &&
									formik.errors.descripcion}
							</FormHelperText>
						</Grid>
{/*
						<Grid item xs={12}>
							<Separator
								title="Porcentajes asignados por ventas"
								icon={<PercentIcon color="white" />}
							/>
						</Grid>
                        */}
                  
						<Grid item xs={12}>
							<PercentIcon color="primary" />
							<Typography variant="caption" className="left-align">
                     Porcentajes asignados por ventas
							</Typography>
						</Grid>

						<Grid item xs={4} className="grid-item-noPadding">
							<Item>
								<TextField
									label="Por venta inicial *"
									id="pctValInicial"
									type="number"
									name="pctValInicial"
									autoComplete="off"
									size="small"
									value={formik.values.pctValInicial}
									onChange={formik.handleChange}
									error={
										formik.touched.pctValInicial &&
										Boolean(formik.errors.pctValInicial)
									}
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
							<FormHelperText className="helperText">
								{formik.touched.pctValInicial &&
									formik.errors.pctValInicial}
							</FormHelperText>
						</Grid>

						<Grid item xs={4} className="grid-item-noPadding">
							<Item>
								<TextField
									label="Por ventas referenciadas *"
									id="pctValNormal"
									type="number"
									name="pctValNormal"
									autoComplete="off"
									size="small"
									value={formik.values.pctValNormal}
									onChange={formik.handleChange}
									error={
										formik.touched.pctValNormal &&
										Boolean(formik.errors.pctValNormal)
									}
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
							<FormHelperText className="helperText">
								{formik.touched.pctValNormal &&
									formik.errors.pctValNormal}
							</FormHelperText>
						</Grid>

						<Grid item xs={4} className="grid-item-noPadding">
							<Item>
								<TextField
									label="Por ventas propias *"
									id="pctValPropio"
									type="number"
									name="pctValPropio"
									autoComplete="off"
									size="small"
									value={formik.values.pctValPropio}
									onChange={formik.handleChange}
									error={
										formik.touched.pctValPropio &&
										Boolean(formik.errors.pctValPropio)
									}
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
							<FormHelperText className="helperText">
								{formik.touched.pctValPropio &&
									formik.errors.pctValPropio}
							</FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Monto mínimo redención *"
									id="valMinRedencion"
									name="valMinRedencion"
									autoComplete="off"
									size="small"
									value={formik.values.valMinRedencion}
									onChange={formik.handleChange}
									error={
										formik.touched.valMinRedencion &&
										Boolean(formik.errors.valMinRedencion)
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
								{formik.touched.valMinRedencion &&
									formik.errors.valMinRedencion}
							</FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Periodo vigencia (meses) *"
									id="numMesesVigencia"
									type="number"
									name="numMesesVigencia"
									autoComplete="off"
									size="small"
									value={formik.values.numMesesVigencia}
									onChange={formik.handleChange}
									error={
										formik.touched.numMesesVigencia &&
										Boolean(formik.errors.numMesesVigencia)
									}
									className="form-control"
									variant={INPUT_TYPE}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												#
											</InputAdornment>
										),
									}}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.numMesesVigencia &&
									formik.errors.numMesesVigencia}
							</FormHelperText>
						</Grid>

						<Grid item xs={4} />
						<Grid item xs={4}>
							<Item>
								<TextField
									label="Frecuencia de compras *"
									id="frecuenciaComp"
									type="number"
									name="frecuenciaComp"
									autoComplete="off"
									size="small"
									value={formik.values.frecuenciaComp}
									onChange={formik.handleChange}
									error={
										formik.touched.frecuenciaComp &&
										Boolean(formik.errors.frecuenciaComp)
									}
									className="form-control"
									variant={INPUT_TYPE}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												#
											</InputAdornment>
										),
									}}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.frecuenciaComp &&
									formik.errors.frecuenciaComp}
							</FormHelperText>
						</Grid>

						<Grid item xs={8} className=" left-align">
							<FormControlLabel
								className=""
								control={
									<Switch
										id="flagDefecto"
										name="flagDefecto"
										checked={formik.values.flagDefecto}
										onChange={formik.handleChange}
									/>
								}
								labelPlacement="start"
								label="Plan inicial del programa"
							/>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Periodo compras (meses) *"
									id="numMesesCom"
									type="number"
									name="numMesesCom"
									autoComplete="off"
									size="small"
									value={formik.values.numMesesCom}
									onChange={formik.handleChange}
									error={
										formik.touched.numMesesCom &&
										Boolean(formik.errors.numMesesCom)
									}
									className="form-control"
									variant={INPUT_TYPE}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												#
											</InputAdornment>
										),
									}}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.numMesesCom &&
									formik.errors.numMesesCom}
							</FormHelperText>
						</Grid>

						<Grid item xs={8} className=" left-align">
							<FormControlLabel
								className=""
								control={
									<Switch
										id="flagEnvEle"
										name="flagEnvEle"
										checked={formik.values.flagEnvEle}
										onChange={formik.handleChange}
									/>
								}
								labelPlacement="start"
								label="Envío electrónico de dinero"
							/>
						</Grid>

						<Grid item xs={6}>
							<Item>
								<TextField
									label="Monto mínimo total compra *"
									id="valMinimo"
									name="valMinimo"
									autoComplete="off"
									size="small"
									value={formik.values.valMinimo}
									onChange={formik.handleChange}
									error={
										formik.touched.valMinimo &&
										Boolean(formik.errors.valMinimo)
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
								{formik.touched.valMinimo && formik.errors.valMinimo}
							</FormHelperText>
						</Grid>

						<Grid item xs={6}>
							<Item>
								<TextField
									label="Monto máximo total compra *"
									id="valMaxmo"
									name="valMaxmo"
									autoComplete="off"
									size="small"
									value={formik.values.valMaxmo}
									onChange={formik.handleChange}
									error={
										formik.touched.valMaxmo &&
										Boolean(formik.errors.valMaxmo)
									}
									className="form-control"
									margin="none"
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
								{formik.touched.valMaxmo && formik.errors.valMaxmo}
							</FormHelperText>
						</Grid>
					</Grid>
				</form>
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
						form="benefit-form"
						variant="contained"
						className="mt-3 mx-2 btn-primary"
						startIcon={<CheckIcon />}
						style={{ textTransform: "none" }}
						type="submit"
					>
						Guardar
					</Button>
				</div>
			</div>
		</div>
	);
};
