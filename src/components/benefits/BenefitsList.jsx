import React, { useState } from 'react';
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { DeleteConfirmationModal } from "../general/DeleteConfirmationModal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useHistory } from "react-router";
import { DataTable } from "../general/DataTable";
import { Button } from "@mui/material";
import { getBenefitById} from "./selectors/getBenefitById";
import { getBenefitsColumns } from './selectors/getBenefitsColumns';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { NoRowsOverlay } from '../general/NoRowsOverlay';
import { getBenefits } from './selectors/getBenefits';

const columns = getBenefitsColumns();
const rows = getBenefits();

export const BenefitsList = () => {
	const [selectedIds, setSelectedIds] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
   const history = useHistory();

	const handleRowChange = (ids) => {
		console.log("Ids:", ids);
		setSelectedIds(ids);
	};

   const handleClick = (params) => {
		const { field, row } = params;
		if (field === "programa") {
			history.replace(`/benefit?id=${row.id}`);
		}
	};

	const deleteItems = () => {
		selectedIds.map((sId) => {
			let rp = getBenefitById(sId);
			console.log(JSON.stringify(rp), " eliminated");
		});
		handleCloseModal();
	};   

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		history,
		path: "/benefit",
	});   
   
   
   return (
      <div className={" d-flex flex-column   animate__animated " + animatedStyle}>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Nivel de beneficios
			</h4>
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
            components={{
               NoRowsOverlay: NoRowsOverlay,
             }}   
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
					Eliminar nivel(es) de beneficio(s)
				</Button>
				<Button
					className="mt-3 mx-2"
					color="primary"
					variant="contained"
					style={{ textTransform: "none" }}
					startIcon={<EmojiEventsIcon />}
					onClick={handleClickOut}
				>
					Crear nuevo nivel de beneficios
				</Button>
			</div>

			<DeleteConfirmationModal
				handleClose={handleCloseModal}
				handleAction={deleteItems}
				open={openModal}
				items={selectedIds}
			/>
      </div>
   )
}
