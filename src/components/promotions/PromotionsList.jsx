import React, { useState } from "react";
import { useHistory } from "react-router";
import { DataTable } from "../general/DataTable";
import { getPromos } from "./selectors/getPromos";
import { getPromosColumns } from "./selectors/getPromosColumns";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { DeleteConfirmationModal } from "../general/DeleteConfirmationModal";
import { getPromoById } from "./selectors/getPromoById";

const columns = getPromosColumns();
const rows = getPromos();

export const PromotionsList = () => {
	const history = useHistory();
	const [selectedIds, setSelectedIds] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);   

	const handleRowChange = (ids) => {
		console.log("Ids:", ids);
		setSelectedIds(ids);
	};

	const handleClick = (params) => {
		const { field, row } = params;
		if (field === "name") {
			console.log("Abriendo registro ", row);
			history.replace(`/promotion?id=${row.id}`);
		}
	};

   const deleteItems = () => {
      selectedIds.map((sId)=> {
         let p = getPromoById(sId);
         console.log(JSON.stringify(p), " eliminated");
         
      });
      handleCloseModal();
   }

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		history,
		path: "/promotion",
	});

	return (
		<div
			className={" d-flex flex-column   animate__animated " + animatedStyle}
		>
			<h4 className="title ">Promociones / Exclusiones</h4>
			<div
				className="align-self-center dataTableContainer"

			>
				{
					<DataTable
						rows={rows}
						columns={columns}
						pageSize={10}
						onCellClick={handleClick}
						onSelectionModelChange={handleRowChange}
					/>
				}
			</div>
			<div className="align-self-center">
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
					onClick={handleClickOut}
				>
					Crear nueva promoción/exclusión
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
