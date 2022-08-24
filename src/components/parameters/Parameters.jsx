import React, { useEffect, useState } from "react";
import {
	Button,
	FormHelperText,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Spinner } from "../general/Spinner";
import { DataTable } from "../general/DataTable";
import { getParametersColumns } from "./selectors/getParametersColumns";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Swal from "sweetalert2";
import { ERROR_MSG, INPUT_TYPE } from "../../config/config";
import { getParametersByParameterGroupId } from "./selectors/getParametersByParameterGroupId";
import { Item } from "../general/Item";
import * as yup from "yup";
import { useFormik } from "formik";
import {
	addParameter,
	deleteParameter,
	updateParameter,
} from "./actions/parameterActions";
import { useDispatch } from "react-redux";
import { setError, setMessage } from "../general/actions/uiActions";
import { DeleteConfirmationModal } from "../general/DeleteConfirmationModal";
import { aFilter } from "../../helpers/aFilter";

const validationSchema = yup.object({
	parametro: yup
		.string()
		.min(3, "El nombre del parámetro debe tener al menos 3 caracteres")
		.required("El nombre del parámetro es requerido"),
	valor: yup.string().required("El valor del parámetro es requerido"),
});

export const Parameters = ({ isLoading, parameterGroupId, handleClickOut }) => {
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(isLoading);
	const [selectedIds, setSelectedIds] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
	const dispatch = useDispatch();

	const handleDelete = (id) => {
		setSelectedIds([id]);
		handleOpenModal();
		//console.log("id para borrar...", id);
	};

	const columns = getParametersColumns(handleDelete);

	const initialValues = {
		id: 0,
		parametro: "",
		valor: "",
		idGrupoParametros: parameterGroupId,
	};

	const [formState, setFormState] = useState(initialValues);

	useEffect(() => {
		const loadParameters = async (id) => {
			setLoading(true);
			try {
				if (id) {
					const data = await getParametersByParameterGroupId(id);
					//console.log(data);
					setRows(data);
				}
			} catch (e) {
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
			}
			setLoading(false);
		};
		loadParameters(parameterGroupId);
	}, [parameterGroupId]);

	const formik = useFormik({
		initialValues: formState,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			//console.log(JSON.stringify(values, null, 2));
			if (formik.values.id === 0) {
				create(values);
			} else {
				update(values);
			}
		},
		enableReinitialize: true,
	});

	const create = (values) => {
		setLoading(true);
		addParameter(values)
			.then((response) => {
				response.actionDisabled = true;
				setRows([...rows, response]);
				setLoading(false);
				handleReset();
				dispatch(
					setMessage({
						msg: "Registro agregado exitosamente",
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

	const update = (values) => {
		setLoading(true);
		updateParameter(values.id, values)
			.then((response) => {
				const index = rows.findIndex(
					(item) => item.id === formik.values.id
				);

				rows[index].parametro = values.parametro;
				rows[index].valor = values.valor;
				rows[index].actionDisabled = true;

				setLoading(false);
				handleReset();
				dispatch(
					setMessage({
						msg: "Registro actualizado exitosamente",
						severity: "success",
					})
				);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
				Swal.fire(
					"Error",
					err.cause ? err.cause.message : err.message ? err.message : err,
					"error"
				);
				dispatch(setError(err));
			});
	};

	const deleteItems = () => {
		handleCloseModal();
		setLoading(true);
		console.log("SelectedIds:", selectedIds);
		try {
			selectedIds.forEach(async (element) => {
				await deleteParameter(element);
			});
			handleRemoveRows(selectedIds);
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
		handleReset();
		setLoading(false);
	};

	const handleRemoveRows = (paramIds) => {
		console.log("items:", rows);
		const result = aFilter(rows, paramIds);
		//console.log("result:", result);
		setRows(result);
	};

	const handleReset = () => {
		formik.resetForm();
		setFormState(initialValues);
		setSelectedIds([]);
	};

	const handleRowChange = (ids) => {
		setSelectedIds(ids);
		//console.log("handleRowChange", ids);
		if (ids.length === 0) {
			handleReset();

			rows.forEach((item) => {
				item["actionDisabled"] = true;
			});
		} else {
			const row = rows.find((r) => r.id === ids[0]);
			//console.log("row", JSON.stringify(row));
			setFormState({
				id: row.id,
				parametro: row.parametro,
				valor: row.valor,
            idGrupoParametros: parameterGroupId,
			});

			rows.forEach((item) => {
				if (item.id === row.id) {
					item["actionDisabled"] = false;
				} else {
					item["actionDisabled"] = true;
				}
			});
		}
	};



	if (loading) {
		return <Spinner  css="text-center spinner-top-margin"/>;
	}

	return (
		<>
			<form
				id="parameter-form"
				className="container__form"
				onSubmit={formik.handleSubmit}
			>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TuneIcon color="primary" />
						<Typography variant="caption" className="left-align">
							Parámetros
						</Typography>
					</Grid>

					<Grid item xs={12} className="">
						<Item>
							<TextField
								label="Nombre *"
								id="parametro"
								type="text"
								name="parametro"
								autoComplete="off"
								size="small"
								value={formik.values.parametro}
								onChange={formik.handleChange}
								error={
									formik.touched.parametro &&
									Boolean(formik.errors.parametro)
								}
								className="form-control"
								variant={INPUT_TYPE}
							/>
						</Item>
						<FormHelperText className="helperText">
							{formik.touched.parametro && formik.errors.parametro}
						</FormHelperText>
					</Grid>

					<Grid item xs={9} className="">
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
								variant={INPUT_TYPE}
								minRows={5}
								maxRows={5}
								multiline={true}
							/>
						</Item>
						<FormHelperText className="helperText">
							{formik.touched.valor && formik.errors.valor}
						</FormHelperText>
					</Grid>

					<Grid item xs={2} className="left-align left">
						<Button
							sx={{ marginTop: 1 }}
							className="btn btn-secondary left-align left"
							variant="contained"
							startIcon={<AddCircleIcon />}
							style={{ textTransform: "none" }}
							type="submit"
							//disabled={disableActionBtn}
						>
							{formState.id ? "Actualizar" : "Agregar"}
						</Button>
					</Grid>

					<Grid item xs={12} />

					<Grid item xs={12} className="" style={{ paddingTop: "2px" }}>
						<DataTable
							className="container__dataTable3"
							loading={loading}
							rows={rows}
							columns={columns}
							pageSize={10}
							//selectionModel={selectionModel}
							onSelectionModelChange={handleRowChange}
							checkboxSelection={false}
							//disableSelectionOnClick={true}
							editMode="cell"
							onCellClick={() => {}}

							//editRowsModel={editRowsModel}
							//onEditRowsModelChange={handleEditRowsModelChange}
						/>
					</Grid>
				</Grid>
			</form>
			{!loading && (
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
			)}

			<DeleteConfirmationModal
				handleClose={handleCloseModal}
				handleAction={deleteItems}
				open={openModal}
				items={selectedIds}
				recordDesc={formik.values.parametro}
			/>
		</>
	);
};
