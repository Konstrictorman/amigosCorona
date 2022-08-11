import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import queryString from "query-string";
import { getReferenceProgramById } from "./selectors/getReferenceProgramById";
import { getReferenceProgramStateColumns } from "./selectors/getReferenceProgramStateColumns";
import { getReferenceProgramSalesPointColumns } from "./selectors/getReferenceProgramSalesPointColumns";
import { getReferenceProgramSalesPointById } from "./selectors/getReferenceProgramSalesPointById";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import {
	Button,
	FormHelperText,
	Grid,
	Stack,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { NoRowsOverlay } from "../general/NoRowsOverlay";
import { useDispatch } from "react-redux";
import { FieldsComboBox } from "../fields/FieldsComboBox";
import { Item } from "../general/Item";
import * as yup from "yup";
import { useFormik } from "formik";
import { ERROR_MSG, ID_PROGRAMS, INPUT_TYPE } from "../../config/config";
import Swal from "sweetalert2";
import { getReferenceProgramStatesById } from "./selectors/getReferenceProgramStatesById";
import { DataTable } from "../general/DataTable";
import {
	addReferenceProgram,
	addReferenceProgramState,
	updateReferenceProgram,
} from "./actions/referenceProgramActions";
import { setError } from "../general/actions/uiActions";
import { Spinner } from "../general/Spinner";
import { dateFormatter3 } from "../../helpers/dateFormatter";
import { addFieldValue } from "../fields/actions/fieldValuesActions";
import { loadPrograms } from "../fields/actions/fieldActions";

const validationSchema = yup.object({
	programa: yup
		.string()
		.min(
			4,
			"El nombre del programa de referenciación debe tener al menos 4 caracteres"
		)
		.required("El nombre del programa de referenciación es requerido"),
	tipoPeriodo: yup.string().required("El periodo es requerido"),
	descripcion: yup
		.string("descripcion")
		.min(8, "La descripción debe tener al menos 8 caracteres")
		.required("La descripción es requerida"),
	mesesVigencia: yup
		.number()
		.min(0, "Los meses de vigencia no pueden ser negativos")
		.required("Los meses de vigencia son requeridos"),
});

export const ReferenceProgram = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);
	//const [id, setId] = useState(idx);
	const stateColumns = getReferenceProgramStateColumns();
	const activeSalesPointColumns = getReferenceProgramSalesPointColumns();
	const [activeSalesPoints, setActiveSalesPoints] = useState([]);
	const [programaEstados, setProgramaEstados] = useState([]);
	const [editRowsModel, setEditRowsModel] = useState({});
	const [loading, setLoading] = useState(false);
	const [flagChanged, setFlagChanged] = useState(false);
	const componentMounted = useRef(true);
	const dispatch = useDispatch();

	const initialValues = {
		id: id,
		programa: "",
		descripcion: "",
		tipoPeriodo: "",
		mesesVigencia: 0,
		estado: false,
	};

	const [formState, setFormState] = useState(initialValues);

	useEffect(() => {
		const getRefProgramById = async (id) => {
			setLoading(true);
			try {
				if (componentMounted.current) {
					if (id) {
						const data = await getReferenceProgramById(id);
						//console.log("data:", data);

						setFormState({
							...data,
						});
					}
					const refProgSp = await getReferenceProgramSalesPointById(id);
					setActiveSalesPoints(refProgSp);

					const refProgStates = await getReferenceProgramStatesById(id);
					setProgramaEstados(refProgStates);
				}
			} catch (e) {
				console.log(e);
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
			}

			setLoading(false);
		};

		getRefProgramById(id);
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
			if (id) {
				update(values);
			} else {
				create(values);
			}
		},
		enableReinitialize: true,
	});

	const create = (values) => {
		setLoading(true);
		addReferenceProgram(values, activeSalesPoints)
			.then(async (response) => {
				//const filtered = await getReferenceProgramSalesPointById(response.id);

				getReferenceProgramSalesPointById(response.id).then(async (res) => {
					setActiveSalesPoints(res);
					await addState(response.id);
				});

				setFormState({
					...formState,
					id: response.id,
				});

				const newFieldValue = {
					id: 0,
					valor: formik.values.programa,
					descripcion: formik.values.descripcion,
					idCampo: ID_PROGRAMS,
				};

				await addFieldValue(newFieldValue);
				dispatch(loadPrograms());

				setLoading(false);
				Swal.fire(
					"Creación exitosa",
					`El registro ${response.programa} se creó con éxito`,
					"success"
				);
				handleClickOut();
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

	const update = (values) => {
		console.log("updating...");
		setLoading(true);
		updateReferenceProgram(id, values, activeSalesPoints)
			.then(async (response) => {
				const filtered = await getReferenceProgramSalesPointById(id);
				setActiveSalesPoints(filtered);
				await addState();
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
					err.cause ? err.cause.message : err.message ? err.message : err,
					"error"
				);
				dispatch(setError(err));
			});
	};

	const addState = async (val) => {
		if (val || flagChanged) {
			const newState = {
				id: 0,
				idProgramaReferenciacion: val ? val : id,
				estado: formik.values.estado,
				fechaReferencia: dateFormatter3(new Date()),
			};
			addReferenceProgramState(newState)
				.then(async (response) => {
					const refProgStates = await getReferenceProgramStatesById(id);
					setProgramaEstados(refProgStates);
					setFlagChanged(false);
				})
				.catch((e) => {
					throw new Error(e);
				});
		}
	};

	const handleEditRowsModelChange = useCallback(
		(model) => {
			setEditRowsModel(model);
			const key = Object.keys(model)[0];
			if (key) {
				/*
				console.log(
					"model: ",
					JSON.stringify(model[key]["flagActivo"]["value"])
				);
            */
				const newActive = model[key]["flagActivo"]["value"];
				const asps = activeSalesPoints.map((asp) =>
					asp.idPuntoVenta === parseInt(key, 10)
						? { ...asp, flagActivo: newActive }
						: asp
				);

				setActiveSalesPoints(asps);
			}
		},
		[activeSalesPoints]
	);

	const handleCustomChange = (e) => {
		setFlagChanged(!flagChanged);
		formik.setFieldValue("estado", e.target.checked);
	};

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/referenceProgramList",
	});

	if (loading) {
		return <Spinner  css="text-center spinner-top-margin"/>;
	}

	return (
		<div
			className={
				"d-flex flex-column container animate__animated " + animatedStyle
			}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Programa de referenciación{" "}
				{formState.id ? formik.values.programa : "nuevo"}
			</h4>
			<div
				className="align-self-center"
				style={{
					width: "100%",
				}}
			>
				<form
					id="refProg-form"
					className="container__form"
					onSubmit={formik.handleSubmit}
				>
					<Grid container spacing={2}>
						<Grid item xs={8}>
							<Item>
								<TextField
									label="Nombre del programa de referenciación *"
									id="programa"
									type="text"
									name="programa"
									autoComplete="off"
									size="small"
									value={formik.values.programa}
									onChange={formik.handleChange}
									error={
										formik.touched.programa &&
										Boolean(formik.errors.programa)
									}
									className="form-control"
									variant={INPUT_TYPE}
									inputProps={{
										maxLength: 8,
									}}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.programa && formik.errors.programa}
							</FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<FieldsComboBox
									id="tipoPeriodo"
									label="Periodo *"
									valueType="valor"
									value={formik.values.tipoPeriodo}
									type="periodos"
									labelType="descripcion"
									handleChange={formik.handleChange}
									error={
										formik.touched.tipoPeriodo &&
										Boolean(formik.errors.tipoPeriodo)
									}
								/>
							</Item>
							<FormHelperText className="helperText">
								{" "}
								{formik.touched.tipoPeriodo && formik.errors.tipoPeriodo}
							</FormHelperText>
						</Grid>

						<Grid item xs={12}>
							<Item>
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
									minRows={2}
									maxRows={2}
									multiline={true}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.descripcion &&
									formik.errors.descripcion}
							</FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Meses de vigencia *"
									id="mesesVigencia"
									type="number"
									name="mesesVigencia"
									autoComplete="off"
									size="small"
									value={formik.values.mesesVigencia}
									onChange={formik.handleChange}
									error={
										formik.touched.mesesVigencia &&
										Boolean(formik.errors.mesesVigencia)
									}
									className="form-control"
									variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.mesesVigencia &&
									formik.errors.mesesVigencia}
							</FormHelperText>
						</Grid>

						<Grid item xs={8}>
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
										checked={formik.values.estado}
										onChange={handleCustomChange}
										inputProps={{ "aria-label": "controlled" }}
									/>
									<Typography>Activo</Typography>
								</Stack>
							</div>
						</Grid>

						<Grid item xs={12}>
							<Typography variant="h6" className="left-align">
								Puntos de venta
							</Typography>
							<div className="center">
								<DataTable
									className="container__dataTable"
									loading={loading}
									rows={activeSalesPoints}
									getRowId={(r) => r.idPuntoVenta}
									columns={activeSalesPointColumns}
									pageSize={10}
									checkboxSelection={false}
									density="compact"
									autoHeight={true}
									autoPageSize={true}
									components={{
										NoRowsOverlay: NoRowsOverlay,
									}}
									editRowsModel={editRowsModel}
									onEditRowsModelChange={handleEditRowsModelChange}
								/>
							</div>
						</Grid>
						<Grid item xs={12} />

						{id && (
							<Grid item xs={12}>
								<Typography variant="h6" className="left-align">
									Historial de estados
								</Typography>

								<div className="center">
									<DataTable
										className="container__dataTable"
										loading={loading}
										rows={programaEstados}
										columns={stateColumns}
										pageSize={5}
										checkboxSelection={false}
										density="compact"
										autoHeight={true}
										autoPageSize={true}
										components={{
											NoRowsOverlay: NoRowsOverlay,
										}}
										disableSelectionOnClick={true}
										onCellClick={() => {}}
										isRowSelectable={() => {}}
									/>
								</div>
							</Grid>
						)}
					</Grid>
				</form>

				<div className="">
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
						form="refProg-form"
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
