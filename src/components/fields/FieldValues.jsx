import React, { useState } from "react";
import {
	Button,
	FormHelperText,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
	ID_DOCUMENT_TYPES,
	ID_GENDERS,
	ID_LOAD_TYPES,
	ID_OUTPUT_FILE_TYPES,
	ID_PERIODS,
	ID_PROCESS_STATES,
	ID_PROCESS_TYPES,
	ID_PROGRAMS,
	ID_REDEMPTION_TYPES,
	ID_REFERRED_STATUS,
	ID_SPECIALTIES,
	ID_STATES,
	INPUT_TYPE,
} from "../../config/config";
import { getFieldValueColumns } from "./selectors/getFieldValueColumns";
import { useFormik } from "formik";
import * as yup from "yup";
import { DeleteConfirmationModal } from "../general/DeleteConfirmationModal";
import {
	addFieldValue,
	deleteFieldValue,
	loadFieldValues,
	updateFieldValue,
} from "./actions/fieldValuesActions";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setError, setMessage } from "../general/actions/uiActions";
import { DataTable } from "../general/DataTable";
import { aFilter } from "../../helpers/aFilter";
import { Item } from "../general/Item";
import {
	loadDocumentTypes,
	loadGenders,
	loadLoadTypes,
	loadOutputFileTypes,
	loadPeriods,
	loadProcessStates,
	loadProcessTypes,
	loadPrograms,
	loadRedemptionTypes,
	loadReferredStatus,
	loadSpecialties,
	loadStates,
} from "./actions/fieldActions";

const validationSchema = yup.object({
	descripcion: yup
		.string("descripcion")
		.min(3, "El nombre del ítem debe tener al menos 3 caracteres")
		.required("El nombre del ítem es requerido"),
	valor: yup
		.string("valor")
		.min(1, "El valor del ítem debe tener al menos 1 caracter")
		.required("El valor del ítem es requerido"),
});

export const FieldValues = (attrs) => {
	const {
		disabledFatherFieldcombo,
		camposPadre,
		idCampo,
		disableActionBtn,
		rowItems,
		tLoading,
	} = attrs;

	//console.log("rowItems:",rowItems);
   //console.log("hijos:", JSON.stringify(rowItems,null,2));
	const initialValues = {
		id: 0,
		descripcion: "",
		valor: "",
		idValorPadre: "",
		idCampo: idCampo,
	};


	const [loading, setLoading] = useState(tLoading);
	const [selectedIds, setSelectedIds] = useState([]);
	const [formState, setFormState] = useState(initialValues);
	const [rows, setRows] = useState(rowItems);
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
	const { valoresCampo } = useSelector((state) => state.lists);
	const dispatch = useDispatch();

	const func = (id) => {
		//setSelectedIds([]);
		setSelectedIds([id]);
		handleOpenModal();
		//console.log("id para borrar...", id);
	};
	const columns = getFieldValueColumns(func, valoresCampo);

	const formik = useFormik({
		initialValues: formState,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			//console.log(JSON.stringify(values, null, 2));
			if (formik.values.id === 0) {
				//console.log("adding...");
				addItem(values);
			} else {
				//console.log("updating...");
				updateItem(values);
			}
		},
		enableReinitialize: true,
	});

	const reset = () => {
		formik.resetForm();
		formik.setFieldValue("idValorPadre", "");
		setFormState(initialValues);
		//setSelectedIds([]);
	};

	const addItem = (values) => {
		setLoading(true);
		const param = {
			...values,
			idCampo,
		};
      //console.log(JSON.stringify(camposPadre));
      
		const pv = camposPadre.find(
			(elem) => elem.id?.toString() === param.idValorPadre?.toString()
		);
		const fatherName = pv?.valor;
      
      
		addFieldValue(param)
			.then((response) => {
				const data = response.data;
				console.log(response);
				const newFieldValue = {
					...param,
					id: data.id,
					valorPadre: fatherName,
					actionDisabled: true,
				};
            //console.log(JSON.stringify(newFieldValue,null,2));
				setRows([...rows, newFieldValue]);
				reloadLists();
				setLoading(false);
				//setDisableValueFields(false);
				reset();
				dispatch(
					setMessage({
						msg: "Registro agregado exitosamente",
						severity: "success",
					})
				);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				Swal.fire(
					"Error",
					err.cause ? err.cause.message : err.message ? err.message : err,
					"error"
				);
				dispatch(setError(err));
			});
	};

	const updateItem = (values) => {
		setLoading(true);
		const param = {
			...values,
			idCampo,
		};

		const pv = camposPadre.find(
			(elem) => elem.id?.toString() === param.idValorPadre?.toString()
		);
		const fatherName = pv?.descripcion;

		updateFieldValue(formik.values.id, param)
			.then((response) => {
				const index = rows.findIndex(
					(item) => item.id === formik.values.id
				);

				rows[index].valorPadre = fatherName;
				rows[index].descripcion = param.descripcion;
				rows[index].value = param.valor;
				rows[index].idValorPadre = param.idValorPadre;
				setLoading(false);
				reset();
				dispatch(
					setMessage({
						msg: "Registro actualizado exitosamente",
						severity: "success",
					})
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

	const handleRowChange = (ids) => {
		setSelectedIds(ids);
		console.log("handleRowChange", ids);
		if (ids.length === 0) {
			reset();

			rows.forEach((item) => {
				item["actionDisabled"] = true;
			});
		} else {
			const row = rows.find((r) => r.id === ids[0]);
			console.log("row", JSON.stringify(row));
			setFormState({
				id: row.id,
				descripcion: row.descripcion,
				valor: row.valor,
				idValorPadre: row.idValorPadre,
			});
			if (!disableActionBtn) {
				//Si se trata de programas de referenciación, inhabilitar siempre el btn de acción
				rows.forEach((item) => {
					if (item.id === row.id) {
						item["actionDisabled"] = false;
					} else {
						item["actionDisabled"] = true;
					}
				});
			}
		}
	};

	const handleRemoveRows = (paramIds) => {
		console.log("items:", rows);
		const result = aFilter(rows, paramIds);
		//console.log("result:", result);
		setRows(result);
	};

	const deleteItems = () => {
		handleCloseModal();
		setLoading(true);
		console.log("SelectedIds:", selectedIds);
		try {
			selectedIds.forEach(async (element) => {
				await deleteFieldValue(idCampo, element);
			});
			handleRemoveRows(selectedIds);
			reloadLists();
			Swal.fire(
				"Eliminación exitosa",
				"Registro(s) exitosamente eliminado(s)",
				"success"
			);
		} catch (e) {
			Swal.fire(
				"Error",
				`Error durante la eliminación del(los) registro(s).  ${e.message}`,
				"error"
			);
		}

		setSelectedIds([]);
		reset();
		setLoading(false);
	};

	const reloadLists = () => {
		dispatch(loadFieldValues());
		switch (idCampo) {
			case ID_DOCUMENT_TYPES:
				dispatch(loadDocumentTypes());
				break;
			case ID_GENDERS:
				dispatch(loadGenders());
				break;
			case ID_LOAD_TYPES:
				dispatch(loadLoadTypes());
				break;
			case ID_OUTPUT_FILE_TYPES:
				dispatch(loadOutputFileTypes());
				break;
			case ID_PERIODS:
				dispatch(loadPeriods());
				break;
			case ID_PROCESS_STATES:
				dispatch(loadProcessStates());
				break;
			case ID_PROCESS_TYPES:
				dispatch(loadProcessTypes());
				break;
			case ID_PROGRAMS:
				dispatch(loadPrograms());
				break;
			case ID_REDEMPTION_TYPES:
				dispatch(loadRedemptionTypes());
				break;
			case ID_REFERRED_STATUS:
				dispatch(loadReferredStatus());
				break;
			case ID_SPECIALTIES:
				dispatch(loadSpecialties());
				break;
			case ID_STATES:
				dispatch(loadStates());
				break;

			default:
				break;
		}
	};

	return (
		<div>
			<form className="container__form" onSubmit={formik.handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<SettingsIcon color="primary" />
						<Typography variant="caption" className="left-align">
							Valores campo
						</Typography>
					</Grid>

					<Grid item xs={3} className="">
						<Item>
							<TextField
								label="Item *"
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
							{formik.touched.descripcion && formik.errors.descripcion}
						</FormHelperText>
					</Grid>

					<Grid item xs={3} className="">
						<Item>
							<TextField
								label="Valor *"
								id="valor"
								type="text"
								name="valor"
								autoComplete="off"
								size="small"
								value={formik.values.valor}
								onChange={formik.handleChange}
								error={
									formik.touched.valor && Boolean(formik.errors.valor)
								}
								className="form-control"
								inputProps={{ maxLength: 10 }}
								variant={INPUT_TYPE}
							/>
						</Item>
						<FormHelperText className="helperText">
							{formik.touched.valor && formik.errors.valor}
						</FormHelperText>
					</Grid>

					<Grid item xs={3}>
						<Item className="">
							<TextField
								select
								label="Valor padre"
								id="idValorPadre"
								name="idValorPadre"
								size="small"
								value={formik.values.idValorPadre}
								onChange={formik.handleChange}
								error={
									formik.touched.idValorPadre &&
									Boolean(formik.errors.idValorPadre)
								}
								className="form-control"
								SelectProps={{
									native: true,
								}}
								disabled={disabledFatherFieldcombo}
								variant={INPUT_TYPE}
							>
								<option defaultValue={""} value=""></option>
								{camposPadre?.map((so) => {
									return (
										<option key={so.id} value={so.id}>
											{so.descripcion}
										</option>
									);
								})}
							</TextField>
						</Item>
					</Grid>

					<Grid item xs={3} className="">
						<Button
							sx={{ marginTop: 1 }}
							className="btn btn-secondary left-align left"
							variant="contained"
							startIcon={<AddCircleIcon />}
							style={{ textTransform: "none" }}
							type="submit"
							disabled={disableActionBtn}
						>
							{formState.id ? "Actualizar" : "Agregar"}
						</Button>
					</Grid>

					<Grid item xs={12} />

					<Grid item xs={12} className="" style={{ paddingTop: "2px" }}>
						{formState && (
							<DataTable
								className="container__dataTable3"
								loading={loading}
								rows={rows}
								columns={columns}
								pageSize={10}
								onSelectionModelChange={handleRowChange}
								checkboxSelection={false}
								//disableSelectionOnClick={true}
								editMode="cell"
								onCellClick={() => {}}

								//editRowsModel={editRowsModel}
								//onEditRowsModelChange={handleEditRowsModelChange}
							/>
						)}
					</Grid>
				</Grid>
			</form>

			<DeleteConfirmationModal
				handleClose={handleCloseModal}
				handleAction={deleteItems}
				open={openModal}
				items={selectedIds}
				recordDesc={formik.values.descripcion}
			/>
		</div>
	);
};
