import React, { useState } from "react";
import {
	Button,
	Checkbox,
	FormControlLabel,
	FormHelperText,
	Grid,
	TextField,
} from "@mui/material";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { INPUT_TYPE } from "../../config/config";
import { PagedMovementDataTable } from "./PagedMovementDataTable";
import { MovementsResume } from "./MovementsResume";
import { Item } from "../general/Item";
import * as yup from "yup";
import { useFormik } from "formik";
import { CustomDatePicker } from "../general/CustomDatePicker";
import { Spinner } from "../general/Spinner";

const validationSchema = yup.object({
	fechaInicial: yup.date().nullable().required("Se requiere la fecha inicial"),
	fechaFinal: yup
		.date()
		.nullable()
		.required("Se requiere la fecha final")
		.min(
			yup.ref("fechaInicial"),
			"La fecha final debe ser mayor a la fecha inicial"
		),
	codeCliente: yup.string(),
	llaveMaestraFlag: yup.boolean(),
});

export const MovementsList = () => {
	const navigate = useNavigate();

	const [params, setParams] = useState({});
	const [show, setShow] = useState(false);
   const [loading, setLoading] = useState(false);

	const initialValues = {
		codeCliente: "",
		fechaInicial: null,
		fechaFinal: null,
		llaveMaestraFlag: false,
	};


	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			handleSearch();
		},

		enableReinitialize: true,
	});

	const handleClick = (params) => {
		console.log("click");
	};

	const handleSearch = () => {
      setLoading(true);
      setShow(false);
      //console.log(JSON.stringify(formik.values, null, 2));
		Object.entries(formik.values).forEach((fv) => {
			if (fv[1]) {
				setParams((_params) => {
					return {
						..._params,
						[fv[0]]: fv[1],
					};
				});
			}
		});
      setLoading(false);
		setShow(true);      
	};

	const handleReset = () => {
		formik.resetForm();
      setParams({});
		setShow(false);
	};

	const handleCustomChange = (name, val) => {
		formik.setFieldValue(name, val);
	};

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

	return (
		<div
			className={" d-flex flex-column   animate__animated " + animatedStyle}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Consulta de movimientos
			</h4>
			<div
				className="align-self-center"
				style={{
					width: "100%",
				}}
			>
				<form className="container__form" onSubmit={formik.handleSubmit}>
					<Grid container spacing={2} rowSpacing={1}>
						<Grid item xs={3}>
							<Item className="">
								<TextField
									label="Cliente"
									id="codeCliente"
									type="text"
									name="codeCliente"
									autoComplete="off"
									size="small"
									value={formik.values.codeCliente}
									onChange={formik.handleChange}
									className="form-control"
									error={
										formik.touched.codeCliente &&
										Boolean(formik.errors.codeCliente)
									}
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.codeCliente &&
									formik.errors.codeCliente}{" "}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<CustomDatePicker
									label="Fecha inicial *"
									id="fechaInicial"
									value={formik.values.fechaInicial}
									maxDate={new Date()}
									onChange={(val) => {
										handleCustomChange("fechaInicial", val);
									}}
									error={
										formik.touched.fechaInicial &&
										Boolean(formik.errors.fechaInicial)
									}
								/>
							</Item>
							<FormHelperText className="helperText">
                     {formik.touched.fechaInicial && formik.errors.fechaInicial}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
                     <CustomDatePicker
										label="Fecha final *"
										id="fechaFinal"
									value={formik.values.fechaFinal}
									maxDate={new Date()}
									onChange={(val) => {
										handleCustomChange("fechaFinal", val);
									}}
									error={
										formik.touched.fechaFinal &&
										Boolean(formik.errors.fechaFinal)
									}
								/>                        

							</Item>
							<FormHelperText className="helperText">
                     {formik.touched.fechaFinal && formik.errors.fechaFinal}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<div className="center">
								<FormControlLabel
									control={
										<Checkbox
											id="llaveMaestraFlag"
											name="llaveMaestraFlag"
											checked={formik.values.llaveMaestraFlag}
                                 onChange={({target}) => {
                                    formik.setFieldValue("llaveMaestraFlag", target.checked);
                                 }}
										/>
									}
									label="Llave maestra"
								/>
							</div>
						</Grid>

						<Grid item xs={12}>
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
									variant="contained"
									className="mt-3 mx-2 btn-primary"
									startIcon={<SearchIcon />}
									style={{ textTransform: "none" }}
									type="submit"
								>
									Buscar
								</Button>
							</div>
						</Grid>
					</Grid>
				</form>
			</div>

         {(loading &&
               (<Spinner  css="text-center spinner-top-margin"/>)
         )}         

			<PagedMovementDataTable
				handleClick={handleClick}
				params={params}
				show={show}
			/>

			{show &&  (
				<MovementsResume
					fechaDesde={formik.values.fechaInicial}
					fechaHasta={formik.values.fechaFinal}
				/>
			)}
		</div>
	);
};
