import React, { useEffect, useState, useCallback } from "react";
import { styled } from "@mui/material/styles";
import {
	Button,
	Chip,
	FormControlLabel,
	FormLabel,
	Grid,
	Paper,
	Radio,
	RadioGroup,
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
import { INPUT_TYPE } from "../../config/config";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

const Input = styled("input")({
	display: "none",
});

export const LoadData = () => {
	const navigate = useNavigate();
	const [file, setFile] = useState(null);
	const [formState, setFormState] = useState({
		loadType: "Clientes",
		fileName: "No ha sido seleccionado ningún archivo",
		idProcess: "",
	});

	const {
		files,
		fileNames,
		fileTypes,
		totalSize,
		totalSizeInBytes,
		handleDragDropEvent,
		clearAllFiles,
		createFormData,
		setFiles,
		removeFile,
	} = useFileUpload();

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

	const handleValueChange = (name, value) => {
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const reset = () => {
		setFormState({
			...formState,
			fileName: "No ha sido seleccionado ningún archivo",
			idProcess: "",
		});
		clearAllFiles();
	};

	const handleInputChange = ({ target }) => {
		setFormState({
			...formState,
			[target.name]: target.value,
		});
	};

	const handleCapture = (e) => {
		//https://www.npmjs.com/package/react-use-file-upload
		//setFile(target.files[0]);
		setFiles(e);
	};
	/*
	useEffect(() => {
		handleValueChange("fileName", file?.name);
	}, [handleValueChange, file]);
*/
	const handleLoadData = (e) => {
		e.preventDefault();
		const data = createFormData();
		console.log(formState, data);
	};

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
				<form className="container__form">
					<Grid container spacing={2} rowSpacing={1}>
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

						<Grid item xs={12} className="" />

						<Grid item xs={8} className="">
							<div>
								<TextField
									label="Archivo"
									error={false}
									id="fileName"
									type="text"
									name="fileName"
									autoComplete="off"
									size="small"
									required
									value={
										fileNames[0]
											? fileNames[0]
											: "No ha seleccionado ningún archivo"
									}
									onChange={handleInputChange}
									className="form-control"
									disabled={true}
									variant={INPUT_TYPE}
								/>
							</div>
						</Grid>

						<Grid item xs={4} className=" left-align">
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
					className="mt-3 mx-2 btn-primary"
					variant="contained"
					style={{ textTransform: "none" }}
					startIcon={<UploadFileIcon />}
					onClick={handleLoadData}
				>
					Cargar datos
				</Button>
			</div>
		</div>
	);
};
