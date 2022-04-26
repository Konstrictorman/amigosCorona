import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import queryString from "query-string";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import {
	Button,
	FormControlLabel,
	FormHelperText,
	Grid,
	Switch,
	TextField,
} from "@mui/material";
import { DataTable } from "../general/DataTable";
import { getFieldValueColumns } from "./selectors/getFieldValueColumns";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DeleteConfirmationModal } from "../general/DeleteConfirmationModal";
import { Spinner } from "../general/Spinner";
import Swal from "sweetalert2";
import {
	getFieldByIdWithChildren,
	getFieldByIdWithItems,
} from "./selectors/getFieldByIdWithItems";
import { aFilter } from "../../helpers/aFilter";
import {
	addFieldValue,
	deleteFieldValue,
	updateFieldValue,
} from "./actions/fieldValuesActions";
import { saveField, updateField } from "./actions/fieldActions";
import { ERROR_MSG, INPUT_TYPE, TIME_OUT } from "../../config/config";
import { getFields } from "./selectors/getFields";
import { getFieldValuesByFieldId } from "./selectors/getFieldValuesByFieldId";
import { delay } from "../../helpers/delay";
import { getFieldValueById } from "./selectors/getFieldValueById";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

export const Field = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);
	const columns = getFieldValueColumns();
	const [selectedIds, setSelectedIds] = useState([]);
	const [padresCampo, setPadresCampo] = useState([]);
	const [padresValor, setPadresValor] = useState([]);
   
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
	const [openModal, setOpenModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const componentMounted = useRef(true);
	const [disabledAddBtn, setDisabledAddBtn] = useState(true);
	const [disabledFatherFieldcombo, setDisabledFatherFieldcombo] =
		useState(false);
	const [disableValueFields, setDisableValueFields] = useState(true);
	const [editRowsModel, setEditRowsModel] = useState({});

	const [formState, setFormState] = useState({
		id: 0,
		campo: "",
		descripcion: "",
		items: [],
		permitePadre: false,
		idCampoPadre: 0,
	});

	const { campo, descripcion, items, permitePadre, idCampoPadre } = formState;

	const [childForm, setChildForm] = useState({
		idItem: 0,
		nomItem: "",
		valueItem: "",
		idValorPadre: 0,      
	});

	const { idItem, nomItem, valueItem, idValorPadre } = childForm;

	useEffect(() => {
		const field = async (id) => {
			setLoading(true);
			try {
            
				const data = await getFieldByIdWithItems(id);

				if (componentMounted.current) {
					const fields = await getFields();
					setFormState(data);
					const padres = fields.filter((f) => f.id.toString() !== id);
					setPadresCampo(padres);
					setDisabledFatherFieldcombo(data.idCampoPadre ? false : true);

               
               

               
				}
            //await delay(TIME_OUT);
			} catch (e) {
				console.log(e);
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
			}
			setLoading(false);
		};

		if (id) {
			field(id);
			setDisableValueFields(false);
		}

		return () => {
			componentMounted.current = false;
			setLoading(null);
		};
	}, [id]);

	useEffect(() => {
		if (nomItem?.length > 0 && valueItem?.length > 0) {
			setDisabledAddBtn(false);
		} else {
			setDisabledAddBtn(true);
		}
	}, [nomItem, valueItem]);

	useEffect(() => {
      const getPadresValor = async () => {
         try {
            const pv = await getFieldValuesByFieldId(idCampoPadre);
            console.log("_>:",idCampoPadre, pv);
            setPadresValor(pv);
         } catch (e) {
				console.log(e);
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
			}
      }

      getPadresValor();
		return () => {
			
		};
	}, [idCampoPadre]);

	const handleEditRowsModelChange = React.useCallback(
		(model) => {
			setEditRowsModel(model);
			const key = Object.keys(model)[0];

			if (key) {
				let array = [];

				if (model[key]["descripcion"]) {
					const desc = model[key]["descripcion"]["value"];
					array = items.map((i) =>
						i.id === parseInt(key, 10) ? { ...i, descripcion: desc } : i
					);
				}

				if (model[key]["valor"]) {
					const value = model[key]["valor"]["value"];
					array = items.map((i) =>
						i.id === parseInt(key, 10) ? { ...i, valor: value } : i
					);
				}

				setFormState({
					...formState,
					items: array,
				});
			}
		},
		[formState, items]
	);

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/fieldsList",
	});

	//Desestructura del event, el objeto target en el argumento
	const handleInputChange = ({ target }) => {
		setFormState({
			...formState,
			[target.name]: target.value,
		});
		console.log("f?:", formState);
	};

	const handleChildInputChange = ({ target }) => {
		setChildForm({
			...childForm,
			[target.name]: target.value,
		});
	};

	const handleRowChange = (ids) => {
		setSelectedIds(ids);
	};

	const handleCheckChange = ({ target }) => {
		console.log("target:", target.name, target.checked);
		setFormState({
			...formState,
			[target.name]: target.checked,
		});
		setDisabledFatherFieldcombo(!target.checked);
	};

	const handleSaveField = (e) => {
		setLoading(true);

		if (formState.id) {
			//Si no permite padre, el idCampoPadre debe ser null
			if (!permitePadre) {
				setFormState({
					...formState,
					idCampoPadre: null,
				});
			}
			updateField(formState.id, formState)
				.then((response) => {
					setLoading(false);
					Swal.fire(
						"Cambio exitoso",
						"El registro se modificó con éxito",
						"success"
					);
				})
				.catch((e) => {
					setLoading(false);
					Swal.fire("Error", e.message, "error");
				});
		} else {
			//Si no permite padre, el idCampoPadre debe ser null
			if (!permitePadre) {
				setFormState({
					...formState,
					idCampoPadre: null,
				});
			}

			saveField(formState)
				.then((response) => {
					setFormState({
						...formState,
						id: response.data.id,
					});

					setLoading(false);
					setDisableValueFields(false);
					Swal.fire(
						"Registro exitoso",
						"El registro se agregó con éxito",
						"success"
					);
				})
				.catch((e) => {
					setLoading(false);
					Swal.fire("Error", e.message, "error");
				});
		}
	};

	const reset = () => {
		setChildForm({
			idItem: 0,
			nomItem: "",
			valueItem: "",
			idValorPadre: 0,
		});
		setDisabledAddBtn(true);
	};

	const handleAddClick = () => {
		setLoading(true);
		const param = {
			id: 0,
			valor: valueItem,
			descripcion: nomItem,
			idCampo: formState.id,
			idValorPadre: idValorPadre,
		};
		console.log("param:", param);
		addFieldValue(param)
			.then(async (response) => {
				console.log(response);
				const data = response.data;
            const fatherName = await getFieldValueById(data.idValorPadre);

				const newFieldValue = {
					...param,
					id: data.id,
               valorPadre: fatherName?.valor
				};

				setFormState({
					...formState,
					items: [...items, newFieldValue],
				});
				reset();
				setLoading(false);
			})
			.catch((e) => {
				setLoading(false);            
				Swal.fire("Error", e.message, "error");
			});
      
	};

	const handleRemoveRows = (paramIds) => {
		console.log("items:", items);
		const result = aFilter(items, paramIds);
		console.log("result:", result);
		setFormState({
			...formState,
			items: result,
		});
	};

	const deleteItems = () => {
		handleCloseModal();
		setLoading(true);
		console.log("SelectedIds:", selectedIds);
		try {
			selectedIds.forEach(async (element) => {
				await deleteFieldValue(element);
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
		setLoading(false);
	};

	const handleUpdateFieldValues = () => {
		console.log(JSON.stringify(items));
		setLoading(true);
		try {
			items.forEach(async (hijo) => {
				await updateFieldValue(hijo.id, hijo);
			});
			Swal.fire(
				"Actualización exitosa",
				"Cambios(s) guardado(s) exitosamente",
				"success"
			);
		} catch (e) {
			Swal.fire(
				"Error",
				`Error durante la actualización del(los) registro(s).  ${e.message}`,
				"error"
			);
		}
		setSelectedIds([]);
		setLoading(false);
	};

	if (loading) {
		return <Spinner />;
	}

	return (
		<div
			className={" d-flex flex-column   animate__animated " + animatedStyle}
		>
			{formState && (
				<h4 className="title align-self-center" style={{ width: "90%" }}>
					Campo {campo ? "<" + descripcion + ">" : "nuevo"}
				</h4>
			)}
			<div
				className="align-self-center"
				style={{
					width: "90%",
				}}
			>
				{formState && (
					<div className="container__form">
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<Item className="half-quarter-width right">
									<TextField
										label="Nombre"
										error={false}
										id="campo"
										type="text"
										name="campo"
										autoComplete="off"
										size="small"
										required
										value={campo}
										onChange={handleInputChange}
										className="form-control"
										variant={INPUT_TYPE}
									/>
								</Item>
								<FormHelperText className="helperText">
									{" "}
								</FormHelperText>
							</Grid>

							<Grid item xs={6}>
								<Item className="half-quarter-width">
									<TextField
										label="Descripción"
										error={false}
										id="descripcion"
										type="text"
										name="descripcion"
										autoComplete="off"
										size="small"
										required
										value={descripcion}
										onChange={handleInputChange}
										className="form-control"
										variant={INPUT_TYPE}
									/>
								</Item>
								<FormHelperText className="helperText">
									{" "}
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
											checked={permitePadre}
											onChange={handleCheckChange}
										/>
									}
									labelPlacement="start"
									label="Permite padre"
								/>
							</Grid>

							<Grid item xs={6}>
								<Item className="half-quarter-width">
									<TextField
										select
										label="Padre"
										error={false}
										id="idCampoPadre"
										name="idCampoPadre"
										size="small"
										value={idCampoPadre}
										onChange={handleInputChange}
										className="form-control"
										SelectProps={{
											native: true,
										}}
										disabled={disabledFatherFieldcombo}
										variant={INPUT_TYPE}
									>
										<option value="">...</option>
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
									className="mt-1 mx-1 btn-error"
									startIcon={<ClearIcon />}
									style={{ textTransform: "none" }}
									type="submit"
									onClick={handleClickOut}
								>
									Cancelar
								</Button>
							</Grid>

							<Grid item xs={6} className="left-align">
								<Button
									variant="contained"
									className="mt-1 mx-1 btn-primary"
									startIcon={<CheckIcon />}
									style={{ textTransform: "none" }}
									type="submit"
									onClick={handleSaveField}
								>
									{formState.id ? "Guardar" : "Crear"}
								</Button>
							</Grid>

							<Grid item xs={12} />
							<Grid item xs={12} />
							<Grid item xs={12} />
							<Grid item xs={12} />

							<Grid item xs={3} className="">
								<Item>
									<TextField
										label="Item"
										error={false}
										id="nomItem"
										type="text"
										name="nomItem"
										autoComplete="off"
										size="small"
										required
										value={nomItem}
										onChange={handleChildInputChange}
										className="form-control"
										disabled={disableValueFields}
										variant={INPUT_TYPE}
									/>
								</Item>
								<FormHelperText className="helperText">
									{" "}
								</FormHelperText>
							</Grid>

							<Grid item xs={3} className="">
								<Item>
									<TextField
										label="Valor"
										error={false}
										id="valueItem"
										type="text"
										name="valueItem"
										autoComplete="off"
										size="small"
										required
										value={valueItem}
										onChange={handleChildInputChange}
										className="form-control"
										inputProps={{ maxLength: 10 }}
										disabled={disableValueFields}
										variant={INPUT_TYPE}
									/>
								</Item>
								<FormHelperText className="helperText">
									{" "}
								</FormHelperText>
							</Grid>

							<Grid item xs={3}>
								<Item className="">
									<TextField
										select
										label="Valor padre"
										error={false}
										id="idValorPadre"
										name="idValorPadre"
										size="small"
										value={idValorPadre}
										onChange={handleChildInputChange}
										className="form-control"
										SelectProps={{
											native: true,
										}}
										disabled={disabledFatherFieldcombo}
										variant={INPUT_TYPE}
									>
										<option value="">...</option>
										{padresValor?.map((so) => {
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
									sx={{ marginTop: 0.5 }}
									className="btn-secondary left-align left"
									variant="contained"
									startIcon={<AddCircleIcon />}
									style={{ textTransform: "none" }}
									onClick={handleAddClick}
									disabled={disabledAddBtn}
								>
									Agregar ítem
								</Button>
							</Grid>

							<Grid
								item
								xs={12}
								className=""
								style={{ paddingTop: "2px" }}
							>
								{formState && (
									<DataTable
										className="container__dataTable3"
                              loading={loading}
                              
										rows={items}
										columns={columns}
										pageSize={10}
										onSelectionModelChange={handleRowChange}
										checkboxSelection={true}
										onCellClick={() => {}}
										disableSelectionOnClick={true}
										editMode="cell"
										editRowsModel={editRowsModel}
										onEditRowsModelChange={handleEditRowsModelChange}
									/>
								)}
							</Grid>
                     
						</Grid>
					</div>
				)}

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
						className="mt-3 mx-2 btn-error"
						variant="contained"
						style={{ textTransform: "none" }}
						startIcon={<DeleteForeverIcon />}
						disabled={!selectedIds.length > 0}
						onClick={handleOpenModal}
					>
						Eliminar parámetro(s) seleccionado(s)
					</Button>

					<Button
						variant="contained"
						className="mt-3 mx-2 btn-secondary"
						startIcon={<CheckIcon />}
						style={{ textTransform: "none" }}
						onClick={handleUpdateFieldValues}
					>
						Guardar cambios
					</Button>
				</div>
			</div>

			<DeleteConfirmationModal
				handleClose={handleCloseModal}
				handleAction={deleteItems}
				open={openModal}
				items={selectedIds}
			/>
		</div>
	);
};
