import React, { useEffect, useRef, useState } from "react";
import { TabPanel } from "@mui/lab";
import {
	Button,
	FormHelperText,
	Grid,
	InputAdornment,
	TextField,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { FieldsComboBox } from "../../fields/FieldsComboBox";
import { Spinner } from "../../general/Spinner";
import { ERROR_MSG, INPUT_TYPE } from "../../../config/config";
import Swal from "sweetalert2";
import { getProgramsWithSpecialties } from "../../fields/selectors/getProgramsWithSpecialties";
import * as yup from "yup";
import { useFormik } from "formik";
import { createReferrer, updateReferrer } from "../actions/clientActions";
import { Item } from "../../general/Item";
import { CustomDatePicker } from "../../general/CustomDatePicker";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";

const validationSchema = yup.object({
	fechaMat: yup
		.date()
      .nullable()
		.required("La fecha de matrícula es requerida"),
	idProgramaReferenciacion: yup
		.string()
      .nullable()
		.required("Se requiere un programa de referenciación"),
      
	especialidad: yup
		.string()
		.nullable()
		.required("La especialidad es requerida"),
      
	numHijos: yup
		.number()
		.min(0, "La cantidad de hijos debe ser un número positivo")
		.required("El número de hijos es requerido"),
      
	idLifeMiles: yup.string(),
   
	estadoRef: yup.string().required("El estado es requerido"),
   
	genero: yup.string().required("El género es requerido"),
   
	celNequi: yup
		.number()
		.test(
			"len",
			"El número de celular debe tener 10 dígitos",
			(val) => val?.toString().length === 10
		)
		.required("El celular para Nequi debe ser obligatorio"),
      
	referencia1: yup
		.string()
		.min(8, "La referencia debe tener al menos 10 caracteres")
		.required("La referencia es requerida"),
      
});

export const ClientReferrerTab = ({ formValues, index, handleClickOut, client }) => {
	const [loading, setLoading] = useState(false);
	const [programs, setPrograms] = useState([]);
	const [specialties, setSpecialties] = useState([]);

   //console.log(JSON.stringify(client,null,2));

	const initialValues = {
		id: 0,
		fechaMat: null,
		idProgramaReferenciacion: "",
		especialidad: "",
		numHijos: "",
		idLifeMiles: "",
		estadoRef: "",
		referencia1: "",
		genero: "",
		celNequi: 0,
      idCliente:client.id,
	};

	const [formState, setFormState] = useState(initialValues);

	useEffect(() => {
		const setForm = () => {
			if (formValues.id) {
				//console.log(JSON.stringify(formValues,null,2));
				setFormState(formValues);
			}
		};
		setForm();
	}, [formValues]);

	const formik = useFormik({
		initialValues: formState,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			//console.log(JSON.stringify(values, null, 2));
			if (formState.id) {
				
				handleUpdateReferrer(formState.id, values);
			} else {
				
				handleCreateReferrer(values);
			}
		},
		enableReinitialize: true,
	});

	const idProgramaReferenciacionRef = useRef(
		formValues?.idProgramaReferenciacion
	);

	useEffect(() => {
		const getPrograms = async () => {
			setLoading(true);
			try {
				const progs = await getProgramsWithSpecialties();
				//if (componentMounted.current) {
				setPrograms(progs);
				const p = progs?.find(
					(p) => p.twinId === idProgramaReferenciacionRef.current
				);
				setSpecialties(p?.specs);
				//}
			} catch (e) {
				console.log(e);
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
			}
			setLoading(false);
		};

		getPrograms();
	}, []);

	const handleCreateReferrer = (values) => {
		setLoading(true);
		createReferrer(values)
			.then((response) => {
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
	};

	const handleUpdateReferrer = (id, values) => {
		setLoading(true);
		updateReferrer(id, values)
			.then((response) => {
				setLoading(false);
				Swal.fire(
					"Cambio exitoso",
					"El registro se modificó con éxito",
					"success"
				);
			})
			.catch((e) => {
				setLoading(false);
				Swal.fire("Error", e.message, "error");
			});
	};

	const handleChange = (evt) => {
		//handleValueChange(evt);
		const newId = evt.target.value;
		formik.setFieldValue("idProgramaReferenciacion", newId);
		formik.setFieldValue("especialidad", null);
		const p = programs?.find(
			(p) => p.twinId?.toString() === newId?.toString()
		);
		setSpecialties(p?.specs);
	};

	const handleDateChange = (name, val) => {
		formik.setFieldValue(name, val);
	};

	if (loading) {
		return <Spinner css="text-center spinner-top-margin" />;
	}
	return (
		<div>
			<TabPanel value={index} style={{ padding: "0" }}>
				<form
					id="referrer-form"
					className="form"
					onSubmit={formik.handleSubmit}
				>
					<Grid container spacing={2}>
						<Grid item xs={3}>
							<Item>
								<CustomDatePicker
									label="Fecha de matrícula *"
									id="fechaMat"
									value={formik.values.fechaMat}
									onChange={(val) => {
										handleDateChange("fechaMat", val);
									}}
									disableFuture={true}
									error={
										formik.touched.fechaMat &&
										Boolean(formik.errors.fechaMat)
									}
                           disabled={false}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.fechaMat && formik.errors.fechaMat}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item>
								<TextField
									select
									label="Programa referenciación *"
									id="idProgramaReferenciacion"
									type="text"
									name="idProgramaReferenciacion"
									size="small"
									value={formik.values.idProgramaReferenciacion}
									onChange={handleChange}
									error={
										formik.touched.idProgramaReferenciacion &&
										Boolean(formik.errors.idProgramaReferenciacion)
									}
									className="form-control"
									SelectProps={{
										native: true,
									}}
									variant={INPUT_TYPE}
								>
									<option value=""></option>
									{programs?.map((program) => (
										<option key={program.id} value={program.twinId}>
											{program.valor}
										</option>
									))}
								</TextField>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.idProgramaReferenciacion &&
									formik.errors.idProgramaReferenciacion}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item>
								<TextField
									select
									label="Especialidad *"
									id="especialidad"
									type="text"
									name="especialidad"
									size="small"
									value={formik.values.especialidad}
									onChange={formik.handleChange}
									error={
										formik.touched.especialidad &&
										Boolean(formik.errors.especialidad)
									}
									className="form-control"
									disabled={false}
									SelectProps={{
										native: true,
									}}
									variant={INPUT_TYPE}
								>
									<option value=""></option>
									{specialties?.map((spec) => (
										<option key={spec.id} value={spec.valor}>
											{spec.descripcion}
										</option>
									))}
								</TextField>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.especialidad &&
									formik.errors.especialidad}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item>
								<TextField
									label="Cel Nequi *"
									id="celNequi"
									type="number"
									name="celNequi"
									autoComplete="off"
									size="small"
									value={formik.values.celNequi}
									onChange={formik.handleChange}
									error={
										formik.touched.celNequi &&
										Boolean(formik.errors.celNequi)
									}
									className="form-control"
									inputProps={{
										inputMode: "numeric",
										pattern: "[0-9]*",
									}}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<PhoneAndroidIcon />
											</InputAdornment>
										),
									}}
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.celNequi && formik.errors.celNequi}
							</FormHelperText>
						</Grid>

						<Grid item xs={2}>
							<Item>
								<TextField
									label="# de hijos *"
									id="numHijos"
									type="number"
									name="numHijos"
									autoComplete="off"
									size="small"
									value={formik.values.numHijos}
									onChange={formik.handleChange}
									error={
										formik.touched.numHijos &&
										Boolean(formik.errors.numHijos)
									}
									className="form-control"
									inputProps={{
										inputMode: "numeric",
										pattern: "[0-9]*",
									}}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<ChildCareIcon />
											</InputAdornment>
										),
									}}
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.numHijos && formik.errors.numHijos}
							</FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Id Life Miles"
									id="idLifeMiles"
									type="text"
									name="idLifeMiles"
									autoComplete="off"
									size="small"
									value={formik.values.idLifeMiles}
									onChange={formik.handleChange}
									error={
										formik.touched.idLifeMiles &&
										Boolean(formik.errors.idLifeMiles)
									}
									className="form-control"
									variant={INPUT_TYPE}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<AirplanemodeActiveIcon />
											</InputAdornment>
										),
									}}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.idLifeMiles &&
									formik.errors.idLifeMiles}{" "}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item>
								<FieldsComboBox
									id="estadoRef"
									label="Estado *"
									value={formik.values.estadoRef}
									type="estadosReferido"
									handleChange={formik.handleChange}
									valueType="valor"
									labelType="descripcion"
									error={
										formik.touched.estadoRef &&
										Boolean(formik.errors.estadoRef)
									}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.estadoRef && formik.errors.estadoRef}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item>
								<FieldsComboBox
									id="genero"
									label="Genero *"
									value={formik.values.genero}
									type="generos"
									handleChange={(e) => {
										console.log(e.target.name, e.target.value);
										formik.handleChange(e);
									}}
									valueType="valor"
									labelType="descripcion"
									error={
										formik.touched.genero &&
										Boolean(formik.errors.genero)
									}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.genero && formik.errors.genero}
							</FormHelperText>
						</Grid>

						<Grid item xs={12}>
							<Item>
								<TextField
									label="Referencias *"
									id="referencia1"
									type="text"
									name="referencia1"
									autoComplete="off"
									size="small"
									value={formik.values.referencia1}
									onChange={formik.handleChange}
									error={
										formik.touched.referencia1 &&
										Boolean(formik.errors.referencia1)
									}
									className="form-control"
									minRows={5}
									maxRows={5}
									multiline={true}
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.referencia1 &&
									formik.errors.referencia1}
							</FormHelperText>
						</Grid>
					</Grid>
				</form>
				<div className="container__blank">
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
						form="referrer-form"
						color="primary"
						variant="contained"
						className="mt-3 mx-2"
						startIcon={<CheckIcon />}
						style={{ textTransform: "none" }}
						type="submit"
						//enabled={saveBtnEnabled}
					>
						Guardar
					</Button>
				</div>
			</TabPanel>
		</div>
	);
};
