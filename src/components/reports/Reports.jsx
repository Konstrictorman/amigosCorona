import React, { useState } from "react";
import {
	Button,
	FormHelperText,
	Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import * as yup from "yup";
import { useFormik } from "formik";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { Item } from "../general/Item";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";

import { FieldsComboBox } from "../fields/FieldsComboBox";

import { ReportDefinitionsCombo } from "./ReportDefinitionsCombo";
import { ReportComponents } from "./ReportComponents";

const validationSchema = yup.object({
	tipoProceso: yup
		.string()
		.nullable()
		.required("El tipo de proceso es requerido"),
	idDefinicionReporte: yup
		.string()
		.nullable()
		.required("El nombre del proceso es requerido"),
});

export const Reports = () => {
	const navigate = useNavigate();
	const [show, setShow] = useState(false);

	const initialValues = {
		id: 0,
		tipoProceso: "",
		idDefinicionReporte: null,
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(JSON.stringify(values, null, 2));
			setShow(true);
		},
		enableReinitialize: true,
	});

	const handleReset = () => {
		formik.resetForm();		
		setShow(false);
	};   

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

	return (
		<div
			className={" d-flex flex-column   animate__animated " + animatedStyle}
			style={{
				width: "100%",
			}}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Reportes & Procesos
			</h4>
			<div>
				<form
					id="process-form"
					className="container__form"
					onSubmit={formik.handleSubmit}
				>
					<Grid container spacing={2} rowSpacing={1}>
						<Grid item xs={6}>
							<Item className="half-quarter-width right">
								<FieldsComboBox
									id="tipoProceso"
									label="Tipo de proceso *"
									value={formik.values.tipoProceso}
									type="tiposProceso"
									handleChange={(e) => {
										formik.handleChange(e);
									}}
									valueType="valor"
									labelType="descripcion"
									error={
										formik.touched.tipoProceso &&
										Boolean(formik.errors.tipoProceso)
									}
								/>
							</Item>
							<FormHelperText className="helperText half-quarter-width right">
								{formik.touched.tipoProceso &&
									formik.errors.tipoProceso}
							</FormHelperText>
						</Grid>

						<Grid item xs={6}>
							<Item className="half-quarter-width">
								<ReportDefinitionsCombo
									label="Nombre proceso *"
									id="idDefinicionReporte"
									name="idDefinicionReporte"
									value={formik.values.idDefinicionReporte}
									handleChange={formik.handleChange}
									error={
										formik.touched.idDefinicionReporte &&
										Boolean(formik.errors.idDefinicionReporte)
									}
									tipoProceso={formik.values.tipoProceso}
									disabled={!formik.values.tipoProceso}
								/>
							</Item>
							<FormHelperText className="helperText half-quarter-width right">
								{formik.touched.idDefinicionReporte &&
									formik.errors.idDefinicionReporte}
							</FormHelperText>
						</Grid>
					</Grid>
					<div>
						<Button
							form="parameters-form"
							className="mt-3 mx-2 btn-warning"
							variant="contained"
							style={{ textTransform: "none" }}
							startIcon={<ArrowBackIcon />}
							onClick={handleClickOut}
						>
							Volver
						</Button>
                  <Button
						variant="contained"
						className="mt-3 mx-2 btn-error"
						startIcon={<CleaningServicesIcon />}
						style={{ textTransform: "none" }}
						onClick={handleReset}
					>
						Limpiar
					</Button>
						<Button
							form="process-form"
							variant="contained"
							className="mt-3 mx-2 btn-secondary"
							startIcon={<PlayCircleFilledWhiteIcon />}
							style={{ textTransform: "none" }}
							type="submit"
						>
							Generar
						</Button>
					</div>
				</form>
				<ReportComponents
					show={show}
					idReporte={formik.values.idDefinicionReporte}
				/>
			</div>
		</div>
	);
};
