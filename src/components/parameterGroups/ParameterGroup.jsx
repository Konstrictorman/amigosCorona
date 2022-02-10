import React, { useEffect, useMemo, useReducer } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import queryString from "query-string";
import { useForm } from "../customHooks/useForm";
import { getParameterGroupById } from "./selectors/getParameterGroupById";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import {
   Autocomplete,
	Button,
	FormControlLabel,
	FormHelperText,
	Grid,
	MenuItem,
	Switch,
	TextField,
} from "@mui/material";
import { DataTable } from "../general/DataTable";
import { getParameterColumns } from "../parameterGroups/selectors/getParameterColumns";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getSalesPoints } from "../salesPoint/selectors/getSalesPoints";
import { useState } from "react";
import { paramReducer } from "./reducers/paramReducer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DeleteConfirmationModal } from "../general/DeleteConfirmationModal";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

export const ParameterGroup = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [loading, setLoading] = useState(false);
	const { id = "" } = queryString.parse(location.search);
	const pg = useMemo(() => getParameterGroupById(id), [id]);
	const columns = getParameterColumns();
	const salesPoints = getSalesPoints();
	const [selectedIds, setSelectedIds] = useState([]);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
	const [openModal, setOpenModal] = useState(false);

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/parameterGroupsList",
	});

	const handleRowChange = (ids) => {
		console.log("Ids:", ids);
		setSelectedIds(ids);
	};

	const sortedSalesPoints = useMemo(() => {
		const array = salesPoints
			.slice()
			.sort((a, b) => a.name.localeCompare(b.name));

		let options = [];
		array.map((i) => {
			let obj = {};
			obj["id"] = i.id;
			obj["label"] = i.name;
			options.push(obj);
		});
		return options;
	}, [salesPoints]);

	const [formValues, handleInputChange, handleValueChange, handleCheckChange] =
		useForm({
			name: pg?.grupoParametros ? pg.grupoParametros : "",
			desc: pg?.descripcion ? pg.descripcion : "",
			reqPto: pg?.requierePunto ? pg.requierePunto : false,
		});

	const [
		formAuxValues,
		handleAuxInputChange,
		handleAuxValueChange,
		handleAuxCheckChange,
		handleAuxComplexInputChange,
		reset,
	] = useForm({
		paramName: "",
		paramValue: "",
		paramPtoVenta: "",
	});

	const { name, desc, reqPto } = formValues;
	const { paramName, paramValue, paramPtoVenta } = formAuxValues;

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("submitting: " + JSON.stringify(formValues));
	};

	const init = () => {
		return pg?.parametros ? pg.parametros : [];
	};

	const [params, dispatch] = useReducer(paramReducer, [], init);

	const handleAddParam = (newParam) => {
		dispatch({
			type: "add",
			payload: newParam,
		});
	};

	const handleRemoveParam = (paramId) => {
		console.log("Borrando", paramId);
		const action = {
			type: "remove",
			payload: paramId, //Acá no hace falta enviar todo el objeto, sino sólo el id.
		};
		dispatch(action);
	};

	const handleAddClick = () => {
		const param = {
			id: new Date().getTime(),
			parametro: `${paramName}`,
			valor: `${paramValue}`,
			idPuntoVenta: `${paramPtoVenta}`,
			idGrupoParametros: `${pg?.id}`,
		};
		handleAddParam(param);
		reset();
	};

	const handleRemoveClick = (params) => {
		const { field, row } = params;
		if (field === "eliminar") {
			handleRemoveParam(row.id);
		}
	};

	const deleteItems = () => {
		handleCloseModal();
		setLoading(true);
		selectedIds.map((i) => handleRemoveParam(i));
		//setRows(rows.filter((r) => !selectedIds.includes(r.id)));
		setSelectedIds([]);
		setLoading(false);
	};

	return (
		<div
			className={" d-flex flex-column   animate__animated " + animatedStyle}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Grupo de parámetros{" "}
				{pg?.grupoParametros ? "<" + pg.grupoParametros + ">" : "nuevo"}
			</h4>
			<div
				className="align-self-center"
				style={{
					width: "100%",
				}}
			>
				<form
					className="form  border border-primary rounded"
					onSubmit={handleSubmit}
				>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<Item>
								<TextField
									label="Nombre"
									error={false}
									id="name"
									type="text"
									name="name"
									autoComplete="off"
									size="small"
									required
									value={name}
									onChange={handleInputChange}
									className="form-control"
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={8}>
							<Item>
								<TextField
									label="Descripción"
									error={false}
									id="desc"
									type="text"
									name="desc"
									autoComplete="off"
									size="small"
									required
									value={desc}
									onChange={handleInputChange}
									className="form-control"
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={12} className="">
							<FormControlLabel
								className=""
								control={
									<Switch
										id="reqPto"
										name="reqPto"
										checked={reqPto}
										onChange={handleCheckChange}
									/>
								}
								labelPlacement="start"
								label="Requiere punto de venta"
							/>
						</Grid>
						<Grid item xs={12} className="" />
						<Grid item xs={12} className="" />

						<Grid item xs={3} className="">
							<Item>
								<TextField
									label="Parámetro"
									error={false}
									id="paramName"
									type="text"
									name="paramName"
									autoComplete="off"
									size="small"
									required
									value={paramName}
									onChange={handleAuxInputChange}
									className="form-control"
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={3} className="">
							<Item>
								<TextField
									label="Valor"
									error={false}
									id="paramValue"
									type="text"
									name="paramValue"
									autoComplete="off"
									size="small"
									required
									value={paramValue}
									onChange={handleAuxInputChange}
									className="form-control"
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={3} className="">
							<Item>
								<Autocomplete
									disablePortal
									id="paramPtoVenta"
									options={sortedSalesPoints}
									renderInput={(params) => (
										<TextField
											{...params}
											className="form-control"
											size="small"
											label="Punto de venta"
											onChange={handleInputChange}
											value={paramPtoVenta}
											required
										/>
									)}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={3} className="">
							<Button
								sx={{ marginTop: 0.5 }}
								color="secondary"
								variant="contained"
								startIcon={<AddCircleIcon />}
								style={{ textTransform: "none" }}
								onClick={handleAddClick}
							>
								Agregar parámetro
							</Button>
						</Grid>

						<Grid item xs={12} className="">
							{
								<DataTable
									rows={params}
									columns={columns}
									pageSize={10}
									onCellClick={() => {}}
									onSelectionModelChange={handleRowChange}
									checkboxSelection={true}
								/>
							}
						</Grid>
					</Grid>
				</form>

				<div>
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
						color="error"
						variant="contained"
						style={{ textTransform: "none" }}
						startIcon={<DeleteForeverIcon />}
						disabled={!selectedIds.length > 0}
						onClick={handleOpenModal}
					>
						Eliminar parámetro(s) seleccionado(s)
					</Button>
					<Button
						color="primary"
						variant="contained"
						className="mt-3 mx-2"
						startIcon={<CheckIcon />}
						style={{ textTransform: "none" }}
						type="submit"
						onClick={handleSubmit}
					>
						Guardar
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
