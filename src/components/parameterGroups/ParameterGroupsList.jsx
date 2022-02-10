import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { DataTable } from "../general/DataTable";
import { getParameterGroupColumns } from "./selectors/getParameterGroupColumns";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { getParameterGroups } from "./selectors/getParameterGroups";
import { DeleteConfirmationModal } from "../general/DeleteConfirmationModal";

export const ParameterGroupsList = () => {
	const navigate = useNavigate();
	const columns = getParameterGroupColumns();
	const [rows, setRows] = useState(getParameterGroups());   
	const [selectedIds, setSelectedIds] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
	const [loading, setLoading] = useState(false);   

	const handleRowChange = (ids) => {
		console.log("Ids:", ids);
		setSelectedIds(ids);
	};

	const handleClick = (params) => {
		const { field, row } = params;
      console.log(field, row);
		if (field === "grupoParametros") {
			navigate(`/parameterGroup?id=${row.id}`);
		}
	};

   const deleteItems = () => {
		handleCloseModal();
		setLoading(true);
		setRows(rows.filter((r) => !selectedIds.includes(r.id)));
		setSelectedIds([]);
		setLoading(false);
	};

	const [animatedStyle2, handleClickCreate] = useAnimatedStyle({
		navigate,
		path: "/parameterGroup",
	});

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

	return (
		<div
			className={" d-flex flex-column   animate__animated " + animatedStyle}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Grupos de parámetros 
			</h4>
			<div className="align-self-center dataTableContainer">
				{
					<DataTable
						rows={rows}
						columns={columns}
						pageSize={10}
						onCellClick={handleClick}
						onSelectionModelChange={handleRowChange}
						checkboxSelection={true}
					/>
				}
			</div>
			<div className="align-self-center">
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
					Eliminar grupo(s) de parámetros seleccionado(s)
				</Button>
				<Button
					className="mt-3 mx-2"
					color="secondary"
					variant="contained"
					style={{ textTransform: "none" }}
					startIcon={<Inventory2Icon />}
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
