import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ERROR_MSG, PAGE_SIZE } from "../../config/config";
import { getParametersGroupColumns } from "./selectors/getParametersGroupColumns";
import { getParametersGroup } from "./selectors/getParametersGroup";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { Spinner } from "../general/Spinner";
import { DeleteConfirmationModal } from "../general/DeleteConfirmationModal";
import { Button } from "@mui/material";
import { DataTable } from "../general/DataTable";
import { aFilter } from "../../helpers/aFilter";
import { deleteParameterGroup } from "./actions/parameterActions";
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const ParametersGroupList = () => {
	const navigate = useNavigate();
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
	const columns = getParametersGroupColumns();
	const [selectedIds, setSelectedIds] = useState([]);
	const [loading, setLoading] = useState(false);
	const [rows, setRows] = useState([]);

	useEffect(() => {
		const gParameters = async () => {
			setLoading(true);
			try {
				const data = await getParametersGroup();
				setRows(data);
			} catch (e) {
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
			}
         setLoading(false);
		};
		gParameters();
	}, []);

	const deleteItems = () => {
		handleCloseModal();
		setLoading(true);
		try {
			selectedIds.forEach(async (id) => {
				await deleteParameterGroup(id);
			});
			handleRemoveRows();
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

	const handleRemoveRows = () => {
		const result = aFilter(rows, selectedIds);
		//console.log("result:", result);
		setRows(result);
		setSelectedIds([]);
	};

	const handleClick = (params) => {
		const { field, row } = params;
		if (field === "grupoParametros") {
			navigate(`/parameterGroup?id=${row.id}`);
		}
	};   

	const handleRowChange = (ids) => {
		//console.log("Ids:", ids);
		setSelectedIds(ids);
	};

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

	const [animatedStyle2, handleClickCreate] = useAnimatedStyle({
		navigate,
		path: "/parameterGroup",
	});

	if (loading) {
		return <Spinner />;
	}

	return (
		<div
			className={
				" d-flex flex-column   animate__animated " +
				animatedStyle +
				" " +
				animatedStyle2
			}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Grupos de parámetros
			</h4>

			{rows && (
				<div className="align-self-center container__dataTable">
					{
						<DataTable
							rows={rows}
							columns={columns}
							pageSize={PAGE_SIZE}
							onCellClick={handleClick}
							onSelectionModelChange={handleRowChange}
							checkboxSelection={true}
							loading={loading}
						/>
					}
				</div>
			)}

			<div className="align-self-center">
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
					disabled={!selectedIds?.length > 0}
					onClick={handleOpenModal}
				>
					Eliminar grupo(s) de parámetros seleccionado(s)
				</Button>
				<Button
					className="mt-3 mx-2 btn-primary"
					variant="contained"
					style={{ textTransform: "none" }}
					startIcon={<SettingsInputComponentIcon />}
					onClick={handleClickCreate}
				>
					Crear grupo de parámetros
				</Button>
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
