import React, { useState } from "react";
import { useNavigate } from "react-router";
import { DataTable } from "../general/DataTable";
import { getPromos } from "./selectors/getPromos";
import { getPromosColumns } from "./selectors/getPromosColumns";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { DeleteConfirmationModal } from "../general/DeleteConfirmationModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const columns = getPromosColumns();

export const PromotionsList = () => {
	const [selectedIds, setSelectedIds] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [rows, setRows] = useState(getPromos());
	const [loading, setLoading] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
	const navigate = useNavigate();

	const handleRowChange = (ids) => {
		console.log("Ids:", ids);
		setSelectedIds(ids);
	};

	const handleClick = (params) => {
		const { field, row } = params;
		if (field === "name") {
			console.log("Abriendo registro ", row);
			navigate(`/promotion?id=${row.id}`);
		}
	};

	const deleteItems = () => {
		handleCloseModal();
		setLoading(true);
		setRows(rows.filter((r) => !selectedIds.includes(r.id)));
		setSelectedIds([]);
		setLoading(false);
	};

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

	const [animatedStyle2, handleClickCreate] = useAnimatedStyle({
		navigate,
		path: "/promotion",
	});

	return (
      <div className={" d-flex flex-column   animate__animated " + animatedStyle +" " +animatedStyle2}>
			<h4 className="title ">Promociones / Exclusiones</h4>
			<div className="align-self-center dataTableContainer">
				{
					<DataTable
						rows={rows}
						columns={columns}
						pageSize={10}
						onCellClick={handleClick}
						onSelectionModelChange={handleRowChange}
						checkboxSelection={true}
						loading={loading}
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
					Eliminar promoción(es) / exclusión(es) seleccionada(s)
				</Button>
				<Button
					className="mt-3 mx-2"
					color="primary"
					variant="contained"
					style={{ textTransform: "none" }}
					startIcon={<PriceCheckIcon />}
					onClick={handleClickCreate}
				>
					Crear nueva promoción/exclusión
				</Button>
			</div>

			<DeleteConfirmationModal
				handleClose={() => {
					handleCloseModal();
				}}
				handleAction={deleteItems}
				open={openModal}
				items={selectedIds}
			/>
		</div>
	);
};
