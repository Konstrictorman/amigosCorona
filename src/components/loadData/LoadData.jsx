import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
	Button,
	Chip,
	FormHelperText,
	Grid,
	TextField,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import useFileUpload from "react-use-file-upload";
import { ERROR_MSG, INPUT_TYPE } from "../../config/config";
import { Item } from "../general/Item";
import { FieldsComboBox } from "../fields/FieldsComboBox";
import * as yup from "yup";
import { useFormik } from "formik";
import { Spinner } from "../general/Spinner";
import { executeProcess, launchProcess } from "../reports/actions/reportsActions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { getReportDefinitionsByProcessType } from "../reports/selectors/getReportDefinitionsByProcessType";
import { setError, setMessage } from "../general/actions/uiActions";
import { loadFile } from "./actions/loadDataActions";

const Input = styled("input")({
	display: "none",
});

const validationSchema = yup.object({
	loadType: yup.string().required("El tipo de carga es requerido"),
	fileName: yup.string().required("El archivo es requerido"),
});

export const LoadData = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [idDef, setIdDef] = useState(0);
	const dispatch = useDispatch();

	const initialValues = {
		id: 0,
		loadType: "",
		fileName: "No ha sido seleccionado ningún archivo",
		idProcess: "",
	};

	//const [formState, setFormState] = useState(initialValues);

	useEffect(() => {
		const loadIdDef = async () => {
			setLoading(true);
			try {
				const data = await getReportDefinitionsByProcessType("CARGA");
				setIdDef(data[0].id);
			} catch (e) {
				console.log(e);
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
			}
			setLoading(false);
		};

		loadIdDef();
	}, []);

	const {
		files,
		totalSize,

		clearAllFiles,
		createFormData,
		setFiles,

	} = useFileUpload();

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			//console.log(JSON.stringify(values, null, 2));
			handleLoadData();
		},
		enableReinitialize: true,
	});

	const reset = () => {
		formik.handleReset();
		//setFiles(null);
		clearAllFiles();
	};

	const handleCapture = (e) => {
		//https://www.npmjs.com/package/react-use-file-upload
		//setFile(target.files[0]);
		setFiles(e);
		const name = e.target.files[0]
			? e.target.files[0].name
			: "No ha sido seleccionado ningún archivo";
		formik.setFieldValue("fileName", name);
	};

	const handleLoadData = (e) => {
		setLoading(true);

		launchProcess("PRUEBA", "CARGA", idDef)
			.then(async (response) => {
				console.log(response);
            const data = createFormData();
            data.append("tipoCarga", formik.values.loadType);
            data.append("idProceso", response.data.id);
            data.append("fileName", formik.values.fileName);
            data.append("file", files[0]);
            //console.log(JSON.stringify(data));
            await loadFile(response.data.id, data);
            //console.log(JSON.stringify(rta));
            await executeProcess(response.data.id);
            //console.log(JSON.stringify(res));
            Swal.fire(
					"Proceso lanzado con éxito",
					`Se generó proceso con id ${response.data.id}`,
					"success"
				);
            dispatch(
					setMessage({
						msg: `Se generó proceso con id ${response.data.id}`,
						severity: "success",
					})
				);
            reset();
            setLoading(false);

			})
			.catch((err) => {
				Swal.fire(
					"Error",
					`Error al lanzar el proceso. ${err.message}`,
					"error"
				);
				dispatch(setError(err));
            setLoading(false);
			});
		
		
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
			{" "}
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Carga de datos
			</h4>
			<div
				className="align-self-center"
				style={{
					width: "100%",
				}}
			>
				<form
					id="loadData-form"
					className="container__form"
					onSubmit={formik.handleSubmit}
				>
					<Grid container spacing={2} rowSpacing={1}>
						<Grid item xs={4}>
							<Item>
								<FieldsComboBox
									id="loadType"
									label="Tipo de archivo *"
									valueType="valor"
									value={formik.values.loadType}
									type="tiposCarga"
									labelType="descripcion"
									handleChange={formik.handleChange}
									error={
										formik.touched.loadType &&
										Boolean(formik.errors.loadType)
									}
								/>
							</Item>
							<FormHelperText className="helperText">
								{" "}
								{formik.touched.loadType && formik.errors.loadType}{" "}
							</FormHelperText>
						</Grid>
						{/*
						<Grid item xs={8} className=" left-align">
							<FormLabel id="radioGroupLabel">Tipo de archivo</FormLabel>
							<RadioGroup
								value={formState.loadType}
								onChange={(e) => {
									handleValueChange("loadType", e.target.value);
								}}
								aria-labelledby="radioGroupLabel"
								name="radio-buttons-group"
								row
							>
								<FormControlLabel
									value="Clientes"
									control={<Radio />}
									label="Clientes"
								/>
								<FormControlLabel
									value="Facturas"
									control={<Radio />}
									label="Facturas"
								/>
							</RadioGroup>
						</Grid>
                     */}
						{/*
						<Grid item xs={4} className=" right-align">
							<Item>
								<TextField
									label="Id de proceso"
									error={false}
									id="idProcess"
									type="text"
									name="idProcess"
									autoComplete="off"
									size="small"
									value={formState.idProcess}
									onChange={handleInputChange}
									className="form-control"
									disabled={true}
									variant={INPUT_TYPE}
								/>
							</Item>
						</Grid>
                  */}
						<Grid item xs={12} className="" />

						<Grid item xs={8} className="">
							<Item>
								<TextField
									label="Archivo *"
									id="fileName"
									type="text"
									name="fileName"
									autoComplete="off"
									size="small"
									/*
									value={
										fileNames[0]
											? fileNames[0]
											: "No ha seleccionado ningún archivo"
									}
                           */
									value={formik.values.fileName}
									handleChange={formik.handleChange}
									className="form-control"
									disabled={true}
									variant={INPUT_TYPE}
									error={
										formik.touched.fileName &&
										Boolean(formik.errors.fileName)
									}
								/>
							</Item>
							<FormHelperText className="helperText">
								{" "}
								{formik.touched.fileName && formik.errors.fileName}
							</FormHelperText>
						</Grid>

						<Grid item xs={4} className=" left-align mt-2">
							<div>
								<label htmlFor="contained-button-file">
									<Input
										accept="text/csv"
										id="contained-button-file"
										//multiple
										type="file"
										onChange={handleCapture}
									/>
									<Button
										className="btn-secondary"
										variant="contained"
										component="span"
										style={{ textTransform: "none" }}
										startIcon={<FindInPageIcon />}
									>
										Seleccionar archivo
									</Button>
								</label>
							</div>
						</Grid>

						<Grid item xs={12} className="left-align">
							{files?.length > 0 && (
								<Chip icon={<AttachFileIcon />} label={totalSize} />
							)}
						</Grid>
					</Grid>
				</form>
			</div>
			<div className="align-self-center">
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
					className="mt-3 mx-2 btn-error"
					variant="contained"
					style={{ textTransform: "none" }}
					startIcon={<CleaningServicesIcon />}
					onClick={reset}
				>
					Limpiar
				</Button>

				<Button
					form="loadData-form"
					className="mt-3 mx-2 btn-primary"
					variant="contained"
					style={{ textTransform: "none" }}
					startIcon={<UploadFileIcon />}
					type="submit"
					disabled={!files.length > 0}
				>
					Cargar datos
				</Button>
			</div>
		</div>
	);
};
