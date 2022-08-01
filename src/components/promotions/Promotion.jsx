import React, { useEffect, useRef, useState } from "react";
import { getPromoById } from "./selectors/getPromoById";
import { useLocation, useNavigate } from "react-router";
import queryString from "query-string";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import {
	Button,
	FormControlLabel,
	FormHelperText,
	Grid,
	InputAdornment,
	Switch,
	TextField,
} from "@mui/material";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import CheckIcon from "@mui/icons-material/Check";
import { Spinner } from "../general/Spinner";
import { SalesPointsCombo } from "../salesPoint/SalesPointsCombo";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ERROR_MSG, INPUT_TYPE } from "../../config/config";
import * as yup from "yup";
import { useFormik } from "formik";
import { Item } from "../general/Item";
import { CustomDatePicker } from "../general/CustomDatePicker";
import Swal from "sweetalert2";
import { createPromotion, updatePromotion } from "./actions/promotionActions";
import { setError } from "../general/actions/uiActions";
import { useDispatch } from "react-redux";

const validationSchema = yup.object({
	tipoPromo: yup
		.string()
		.min(
			3,
			"El nombre de la promoción/exclusión debe tener al menos 3 caracteres"
		)
      .max(5,"El nombre de la promoción/exclusión debe ser máximo de 5 caracteres")
		.required("El nombre de la promoción/exclusión es requerido"),
	fechaInicio: yup.date().nullable().required("Se requiere la fecha inicial"),
	fechaFin: yup
		.date()
		.nullable()
		.required("Se requiere la fecha final")
		.min(
			yup.ref("fechaInicio"),
			"La fecha final debe ser mayor a la fecha inicial"
		),
	idArticulo: yup.string().required("Se requiere el id del artículo"),
	idPuntoVenta: yup.string().required("Se requiere el punto de venta"),
	pctPromo: yup
		.number()
		.required("Se requiere el valor del porcentaje")
		.min(0, "No se permiten porcentajes negativos"),
});

export const Promotion = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);
	//const promo = useMemo(() => getPromoById(id), [id]);
	//	const [sortedSalesPoints, setSortedSalesPoints] = useState([]);
   const dispatch = useDispatch();
	const [resetFlag, setResetFlag] = useState(false);
	const [loading, setLoading] = useState(false);

	const initialValues = {
		id: 0,
		tipoPromo: "",
		fechaInicio: null,
		fechaFin: null,
		idArticulo: "",
		idPuntoVenta: "",
		pctPromo: 0,
		flagExclusion: false,
		flagTodos: false,
	};

	const [formState, setFormState] = useState(initialValues);

	useEffect(() => {
		const getPromo = async (id) => {
			setLoading(true);         
			try {
            if (id) {
               const promo = await getPromoById(id);
               setFormState({
                  ...promo,
               });
               console.log("promo", JSON.stringify(promo, null, 2));   
            }
			} catch (e) {
				console.log(e);
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
			}
			setLoading(false);
		};
		getPromo(id);
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

   const update = (values) => {
      setLoading(true);

      updatePromotion(id, values)
         .then((response) => {
				setLoading(false);
				Swal.fire(
					"Actualización exitosa",
					"El registro se actualizó con éxito",
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
   }

   const create = (values) => {
      setLoading(true);

      createPromotion(values)
      .then((response) => {
         setLoading(false);     
         Swal.fire(
            "Registro exitoso",
            "El registro se creó con éxito",
            "success"
         );
         handleClickOut();
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
     
   }

	const handleCustomChange = (name, val) => {
		console.log("Cambiando valores:", name, val);
		formik.setFieldValue(name, val);		
	};

	const handleReset = () => {
		formik.resetForm();
		setResetFlag(!resetFlag);
	};

   const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/promotionsList",
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
			{formState && (
				<h4 className="title align-self-center" style={{ width: "80%" }}>
					Promoción / Exclusión{" "}
					{formState.tipoPromo ? formik.values.tipoPromo : "nueva"}
				</h4>
			)}
			<div
				className="align-self-center"
				style={{
					height: 460,
					width: "80%",
				}}
			>
				<form
					id="promo-form"
					className="container__form"
					onSubmit={formik.handleSubmit}
				>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Item>
								<TextField
									label="Nombre de la promoción/exclusión *"
									id="tipoPromo"
									type="text"
									name="tipoPromo"
									autoComplete="off"
									size="small"
									value={formik.values.tipoPromo}
									onChange={formik.handleChange}
									error={
										formik.touched.tipoPromo &&
										Boolean(formik.errors.tipoPromo)
									}
									className="form-control"
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.tipoPromo && formik.errors.tipoPromo}
							</FormHelperText>
						</Grid>

						<Grid item xs={6}>
							<Item className="half-quarter-width">
								<CustomDatePicker
									label="Fecha desde *"
									id="fechaInicio"
									value={formik.values.fechaInicio}
									maxDate={new Date()}
									onChange={(val) => {
										handleCustomChange("fechaInicio", val);
									}}
									error={
										formik.touched.fechaInicio &&
										Boolean(formik.errors.fechaInicio)
									}
                           inputFormat="dd/MM/yyyy"
								/>
							</Item>

							<FormHelperText className="helperText">
								{formik.touched.fechaInicio &&
									formik.errors.fechaInicio}
							</FormHelperText>
						</Grid>

						<Grid item xs={6}>
							<Item>
								<TextField
									label="Artículo *"
									id="idArticulo"
									type="text"
									name="idArticulo"
									autoComplete="off"
									size="small"
									value={formik.values.idArticulo}
									onChange={formik.handleChange}
									className="form-control"
									error={
										formik.touched.idArticulo &&
										Boolean(formik.errors.idArticulo)
									}
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.idArticulo && formik.errors.idArticulo}
							</FormHelperText>
						</Grid>

						<Grid item xs={6}>
							<Item className="half-quarter-width">
								<CustomDatePicker
									label="Fecha hasta *"
									id="fechaFin"
									value={formik.values.fechaFin}
									onChange={(val) => {
										handleCustomChange("fechaFin", val);
									}}
									error={
										formik.touched.fechaFin &&
										Boolean(formik.errors.fechaFin)
									}
								/>
							</Item>

							<FormHelperText className="helperText">
								{formik.touched.fechaFin && formik.errors.fechaFin}
							</FormHelperText>
						</Grid>

						<Grid item xs={6}>
							<Item className=" right">
								<SalesPointsCombo
									label="Punto de venta *"
									id={"salesPoint" + resetFlag}
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
							<FormHelperText className="helperText half-quarter-width right">
								{formik.touched.idPuntoVenta &&
									formik.errors.idPuntoVenta}
							</FormHelperText>
						</Grid>

						<Grid item xs={6}>
							<Item className="half-width">
								<TextField
									label="Porcentaje *"
									id="pctPromo"
									type="number"
									name="pctPromo"
									autoComplete="off"
									size="small"
									value={formik.values.pctPromo}
									onChange={formik.handleChange}
									className="form-control"
									error={
										formik.touched.pctPromo &&
										Boolean(formik.errors.pctPromo)
									}
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
							<FormHelperText>
								{formik.touched.pctPromo && formik.errors.pctPromo}
							</FormHelperText>
						</Grid>

						<Grid item xs={9} className=" right-align">
							<FormControlLabel
								className=""
								control={
									<Switch
										id="flagExclusion"
										name="flagExclusion"
										checked={formik.values.flagExclusion}
										onChange={formik.handleChange}
									/>
								}
								labelPlacement="start"
								label="Artículo excluido de acumulación"
							/>
						</Grid>

						<Grid item xs={9} className=" right-align">
							<FormControlLabel
								className="right primary-font"
								control={
									<Switch
										id="flagTodos"
										name="flagTodos"
										checked={formik.values.flagTodos}
										onChange={formik.handleChange}
									/>
								}
								labelPlacement="start"
								label="Aplica para todos los puntos de venta"
							/>
						</Grid>

						<Grid item xs={12} />
					</Grid>
				</form>

				<div>
					<Button
						variant="contained"
						className="mt-3 mx-2 btn-warning"
						startIcon={<ArrowBackIcon />}
						style={{ textTransform: "none" }}
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
						form="promo-form"
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
