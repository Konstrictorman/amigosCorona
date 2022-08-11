import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import queryString from "query-string";
import {
	Button,
	FormControlLabel,
	FormHelperText,
	Grid,
	Switch,
	TextField,
} from "@mui/material";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Spinner } from "../general/Spinner";
import Swal from "sweetalert2";
import { getFieldByIdWithItems } from "./selectors/getFieldByIdWithItems";
import { saveField } from "./actions/fieldActions";
import {
	ERROR_MSG,
	ID_PROGRAMS,
	INPUT_TYPE,
	TIME_OUT,
} from "../../config/config";
import { getFields } from "./selectors/getFields";
import { getFieldValuesByFieldId } from "./selectors/getFieldValuesByFieldId";
import { setError, setMessage } from "../general/actions/uiActions";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { FieldValues } from "./FieldValues";
import { delay } from "../../helpers/delay";
import { Item } from "../general/Item";

const validationSchema = yup.object({
	campo: yup
		.string("campo")
		.min(4, "El nombre del campo debe tener al menos 4 caracteres")
		.required("El nombre del campo es requerido"),
	descripcion: yup
		.string("descripcion")
		.min(8, "La descripción debe tener al menos 8 caracteres")
		.required("La descripción es requerida"),
	//items: yup.array("items"),
	//.required("Valor requerido"),

	permitePadre: yup.boolean("permitePadre"),
	idCampoPadre: yup.number("idCampoPadre").when("permitePadre", {
		is: true,
		then: yup.number().required("Debe seleccionar un campo padre"),
	}),
});

export const Field = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);

	const [padresCampo, setPadresCampo] = useState([]);
	const [padresValor, setPadresValor] = useState([]);
	const [loading, setLoading] = useState(false);
	const componentMounted = useRef(true);
	const [disabledFatherFieldcombo, setDisabledFatherFieldcombo] =
		useState(false);
	const dispatch = useDispatch();
	const [disableAddBtn] = useState(
		id === ID_PROGRAMS ? true : false
	);
	const [rows, setRows] = useState([]);

	const initialValues = {
		id: 0,
		campo: "",
		descripcion: "",
		//items: [],
		permitePadre: false,
		idCampoPadre: 0,
	};

	const [formState, setFormState] = useState(initialValues);

	useEffect(() => {
		const field = async (id) => {
			setLoading(true);
			try {
				const itemRows = await getFieldValuesByFieldId(id);
				setRows(itemRows);
				delay(TIME_OUT);
				const data = await getFieldByIdWithItems(id);
				setFormState(data);
				const fields = await getFields();
				const padres = fields.filter((f) => f.id?.toString() !== id);
				setPadresCampo(padres);
				setDisabledFatherFieldcombo(data.idCampoPadre ? false : true);
			} catch (e) {
				console.log(e);
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
			}

			setLoading(false);
		};

		field(id);
		//setDisableValueFields(false);

		return () => {
			componentMounted.current = false;
			setLoading(null);
		};
	}, [id]);

	const formik = useFormik({
		initialValues: formState,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			//console.log(JSON.stringify(values, null, 2));
			//Si no permite padre, el idCampoPadre debe ser null
			if (!formik.values.permitePadre) {
				formik.setFieldValue("idCampoPadre", null);
			}
			if (id) {
				//console.log("updating...");
				updateField(values);
			} else {
				//console.log("creating...");
				createField(values);
			}
		},
		enableReinitialize: true,
	});

	useEffect(() => {
		const getPadresValor = async () => {
			try {
				const pv = await getFieldValuesByFieldId(
					formik.values.idCampoPadre
				);
				//console.log("_>:", idCampoPadre, pv);
				setPadresValor(pv);
			} catch (e) {
				console.log(e);
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
			}
		};

		getPadresValor();
		return () => {};
	}, [formik.values.idCampoPadre]);


	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/fieldsList",
	});

	const handleChange = (e) => {
		setDisabledFatherFieldcombo(!e.target.checked);
		formik.setFieldValue("permitePadre", e.target.checked);
		if (!e.target.checked) {
			formik.setFieldValue("idCampoPadre", 0);
		}
	};

	const handleFatherChange = (e) => {
		formik.setFieldValue("idCampoPadre", e.target.value);
		if (id) {
			dispatch(
				setMessage({
					msg: "Tenga en cuenta los valores de campo antes de cambiar este valor.  Podría dejar los datos inconsistentes",
					severity: "warning",
				})
			);
		}
	};

	const updateField = (values) => {
		setLoading(true);

		updateField(id, values)
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
				//console.log(e.response);
				Swal.fire(
					"Error",
					e.response?.data?.cause?.cause?.message,
					"error"
				);
				dispatch(setError(e));
			});
	};

	const createField = (values) => {
		setLoading(true);

		saveField(values)
			.then((response) => {
				setLoading(false);
				//setDisableValueFields(false);
				Swal.fire(
					"Registro exitoso",
					"El registro se creó con éxito",
					"success"
				);
            navigate(`/field?id=${response.id}`);
			})
			.catch((err) => {
				setLoading(false);
				Swal.fire(
					"Error",
					err.cause ? err.cause.message : err.message ? err.message : err,
					"error"
				);
				dispatch(setError(err));
			});
	};

	if (loading) {
		return <Spinner  css="text-center spinner-top-margin"/>;
	}

	return (
		<div
			className={" d-flex flex-column   animate__animated " + animatedStyle}
		>
			{formState && (
				<h4 className="title align-self-center" style={{ width: "90%" }}>
					Campo{" "}
					{formState.campo ? "<" + formState.descripcion + ">" : "nuevo"}
				</h4>
			)}
			<div
				className="align-self-center"
				style={{
					width: "90%",
				}}
			>
				<form className="container__form" onSubmit={formik.handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Item className="half-quarter-width right">
								<TextField
									label="Nombre *"
									id="campo"
									type="text"
									name="campo"
									autoComplete="off"
									size="small"
									value={formik.values.campo}
									onChange={formik.handleChange}
									error={
										formik.touched.campo &&
										Boolean(formik.errors.campo)
									}
									className="form-control"
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.campo && formik.errors.campo}
							</FormHelperText>
						</Grid>

						<Grid item xs={6}>
							<Item className="half-quarter-width">
								<TextField
									label="Descripción *"
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
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.descripcion &&
									formik.errors.descripcion}
							</FormHelperText>
						</Grid>

						<Grid
							item
							xs={6}
							className="right-align"
							style={{ paddingRight: "15px" }}
						>
							<FormControlLabel
								className=""
								control={
									<Switch
										id="permitePadre"
										name="permitePadre"
										checked={formik.values.permitePadre}
										onChange={handleChange}
									/>
								}
								labelPlacement="start"
								label="Permite padre"
							/>
						</Grid>

						<Grid item xs={6}>
							<Item className="half-quarter-width">
								<TextField
									label="Padre"
									id="idCampoPadre"
									select
									type="text"
									name="idCampoPadre"
									size="small"
									value={formik.values.idCampoPadre}
									onChange={handleFatherChange}
									error={
										formik.touched.idCampoPadre &&
										Boolean(formik.errors.idCampoPadre)
									}
									className="form-control"
									SelectProps={{
										native: true,
									}}
									disabled={disabledFatherFieldcombo}
									variant={INPUT_TYPE}
								>
									<option value=""></option>
									{padresCampo?.map((so) => {
										return (
											<option key={so.id} value={so.id}>
												{so.descripcion}
											</option>
										);
									})}
								</TextField>
							</Item>
						</Grid>

						<Grid item xs={6} className="right-align">
							<Button
								variant="contained"
								className="mt-1 mx-1 btn btn-error"
								startIcon={<ClearIcon />}
								style={{ textTransform: "none" }}
								onClick={handleClickOut}
							>
								Cancelar
							</Button>
						</Grid>

						<Grid item xs={6} className="left-align">
							<Button
								variant="contained"
								className="mt-1 mx-1 btn btn-primary"
								startIcon={<CheckIcon />}
								style={{ textTransform: "none" }}
								type="submit"
								disabled={disableAddBtn}
							>
								{formState.id ? "Guardar" : "Crear"}
							</Button>
						</Grid>
					</Grid>
				</form>

				<div>
					<FieldValues
						disabledFatherFieldcombo={disabledFatherFieldcombo}
						disableActionBtn={disableAddBtn}
						rowItems={rows}
						camposPadre={padresValor}
						idCampo={id}
						tLoading={loading}
					/>
				</div>

				<div>
					<Button
						className="mt-3 mx-2 btn btn-warning"
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
