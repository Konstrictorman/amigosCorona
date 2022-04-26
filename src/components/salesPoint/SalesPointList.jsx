import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { DeleteConfirmationModal } from "../general/DeleteConfirmationModal";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Spinner } from "../general/Spinner";
import { getSalesPointsColumns } from "./selectors/getSalesPointColumns";
import { DataTable } from "../general/DataTable";
import { getSalesPoints } from "./selectors/getSalesPoints";
import { deleteSalesPoint } from "./actions/salesPointActions";
import Swal from "sweetalert2";
import { ERROR_MSG, PAGE_SIZE } from "../../config/config";

export const SalesPointList = () => {
	const navigate = useNavigate();
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
	const columns = getSalesPointsColumns();
	const [selectedIds, setSelectedIds] = useState([]);
	const [loading, setLoading] = useState(false);
	const [rows, setRows] = useState([]);
	const componentMounted = useRef(true);

	useEffect(() => {
		const getSalesPointsList = async () => {
			setLoading(true);
			try {
				const data = await getSalesPoints();

				if (componentMounted.current) {
					setRows(data);
				}
			} catch (e) {
				console.log(e);
				Swal.fire(
					"Error",
					e.message + ` - ${ERROR_MSG}`,
					"error"
				);
			}
			setLoading(false);
		};

		getSalesPointsList();
		return () => {
			componentMounted.current = false;
			setLoading(null);
		};
	}, []);

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

	const [animatedStyle2, handleClickCreate] = useAnimatedStyle({
		navigate,
		path: "/salesPoint",
	});

	const deleteItems = () => {
		handleCloseModal();
		setLoading(true);
		try {
			selectedIds.forEach(async (id) => {
				await deleteSalesPoint(id);
			});
			Swal.fire(
				"Eliminación exitosa",
				"Registro(s) exitosamente eliminado(s)",
				"success"
			);
			setRows(rows.filter((r) => !selectedIds.includes(r.id)));
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

	const handleRowChange = (ids) => {
		//console.log("Ids:", ids);
		setSelectedIds(ids);
	};

	const handleClick = (params) => {
		const { field, row } = params;
		if (field === "puntoVenta") {
			navigate(`/SalesPoint?id=${row.id}`);
		}
	};

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
				Puntos de venta
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
					Eliminar punto(s) de venta seleccionado(s)
				</Button>
				<Button
					className="mt-3 mx-2 btn-primary"
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
