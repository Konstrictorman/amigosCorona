import React, { useState } from "react";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { DataTable } from "../general/DataTable";
import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { getSalesPointsColumns } from "./selectors/getSalesPointColumns";
import { getSalesPoints } from "./selectors/getSalesPoints";
import { DeleteConfirmationModal } from "../general/DeleteConfirmationModal";
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";



export const SalesPointList = () => {

   const columns = getSalesPointsColumns();
	const [selectedIds, setSelectedIds] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [rows, setRows] = useState(getSalesPoints());
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
			navigate(`/salesPoint?id=${row.id}`);
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
		path: "/salesPoint",
	});

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
				Puntos de venta
			</h4>
			<div className="align-self-center container__dataTable">
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
					Eliminar punto(s) de venta seleccionado(s)
				</Button>
				<Button
					className="mt-3 mx-2"
					color="secondary"
					variant="contained"
					style={{ textTransform: "none" }}
					startIcon={<PointOfSaleIcon />}
					onClick={handleClickCreate}
				>
					Crear punto de venta
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
