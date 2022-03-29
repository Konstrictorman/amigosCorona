import { styled } from "@mui/material/styles";
import {
	Button,
	FormControlLabel,
	FormLabel,
	Grid,
	Paper,
	Radio,
	RadioGroup,
	Switch,
	TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { useForm } from "../customHooks/useForm";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadFileIcon from '@mui/icons-material/UploadFile';

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

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

	const [formValues, handleInputChange, handleValueChange, handleCheckChange] =
		useForm({
			loadType: "Clientes",
			fileName: "No ha sido seleccionado ningún archivo",
			idProcess: "",
		});

	const { loadType, fileName, idProcess } = formValues;

   const handleCapture = ({target}) => {
      setFile(target.files[0]);
   }

	useEffect(() => {
      handleValueChange("fileName", file?.name);
 }, [file]);   

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formValues)
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
				<form
					className="container__form"
					onSubmit={handleSubmit}
				>
					<Grid container spacing={2} rowSpacing={1}>
						<Grid item xs={8} className=" left-align">
							<FormLabel id="radioGroupLabel">Tipo de archivo</FormLabel>
							<RadioGroup
								value={loadType}
								onChange={(e) => {handleValueChange("loadType",e.target.value)}}
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
									value={idProcess}
									onChange={handleInputChange}
									className="form-control"
									disabled={true}
								/>
							</Item>
						</Grid>

                  <Grid item xs={12} className=""/>
                  <Grid item xs={12} className=""/>

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
									value={fileName}
									onChange={handleInputChange}
									className="form-control"
                           disabled={true}
								/>
							</div>
						</Grid>

						<Grid item xs={4} className=" left-align">
							<div>
								<label htmlFor="contained-button-file">
									<Input
										accept="text/csv"
										id="contained-button-file"
										multiple
										type="file"
                              onChange={handleCapture}
									/>
									<Button
                              color="secondary"
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
					</Grid>
				</form>
			</div>

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

				<Button
					className="mt-3 mx-2"
					color="primary"
					variant="contained"
					style={{ textTransform: "none" }}
					startIcon={<UploadFileIcon />}
					onClick={handleSubmit}
				>
					Cargar datos
				</Button>
			</div>

		</div>
	);
};
