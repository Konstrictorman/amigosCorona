import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DataTable } from "../general/DataTable";
import { getPromosColumns } from "./selectors/getPromosColumns";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { DeleteConfirmationModal } from "../general/DeleteConfirmationModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getPromos } from "./selectors/getPromos";
import Swal from "sweetalert2";
import { ERROR_MSG, PAGE_SIZE } from "../../config/config";
import { useRef } from "react";
import { aFilter } from "../../helpers/aFilter";
import { deletePromotion } from "./actions/promotionActions";

export const PromotionsList = () => {
	const [selectedIds, setSelectedIds] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const columns = getPromosColumns();
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
	const navigate = useNavigate();
	const componentMounted = useRef(true);

	useEffect(() => {
		const getPromotions = async () => {
			setLoading(true);
			try {
				const data = await getPromos();
				console.log("data:", JSON.stringify(data,null,2));

				setRows(data);
            setLoading(false);
			} catch (e) {
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
            setLoading(false);
			}

		};

		getPromotions();
	}, []);

	const handleRowChange = (ids) => {
		setSelectedIds(ids);
	};

	const handleClick = (params) => {
		const { field, row } = params;
		if (field === "tipoPromo") {
			//console.log("Abriendo registro ", row);
			navigate(`/promotion?id=${row.id}`);
		}
	};

	const deleteItems = () => {
		handleCloseModal();
		setLoading(true);
		try {
			selectedIds.forEach(async (item) => {
				await deletePromotion(item);
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
		setLoading(false);
	};

	const handleRemoveRows = () => {
		const result = aFilter(rows, selectedIds);
		//console.log("result:", result);
		setRows(result);
		setSelectedIds([]);
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
		<div
			className={
				" d-flex flex-column   animate__animated " +
				animatedStyle +
				" " +
				animatedStyle2
			}
		>
			<h4 className="title ">Promociones / Exclusiones</h4>
			<div className="align-self-center container__dataTable">

					<DataTable
						rows={rows}
						columns={columns}
						pageSize={10}
						onCellClick={handleClick}
						onSelectionModelChange={handleRowChange}
						checkboxSelection={true}
						loading={loading}
					/>
			</div>



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
					disabled={!selectedIds.length > 0}
					onClick={handleOpenModal}
				>
					Eliminar promoción(es) / exclusión(es) seleccionada(s)
				</Button>
				<Button
					className="mt-3 mx-2 btn-primary"
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
