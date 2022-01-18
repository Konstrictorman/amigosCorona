import { Button } from "@mui/material";
import React, { useState } from "react";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { DeleteConfirmationModal } from "../general/DeleteConfirmationModal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getReferenceProgramColumns } from "./selectors/getReferenceProgramColumns";
import { useNavigate } from "react-router";
import { getReferencePrograms } from "./selectors/getReferencePrograms";
import { getReferenceProgramById } from "./selectors/getReferenceProgramById";
import LocalPlayIcon from '@mui/icons-material/LocalPlay';
import { DataTable } from "../general/DataTable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const columns = getReferenceProgramColumns();
const rows = getReferencePrograms();

export const ReferenceProgramList = () => {
	const [selectedIds, setSelectedIds] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
   const navigate = useNavigate();

	const handleRowChange = (ids) => {
		console.log("Ids:", ids);
		setSelectedIds(ids);
	};

   const handleClick = (params) => {
		const { field, row } = params;
		if (field === "programa") {
			navigate(`/referenceProgram?id=${row.id}`);
		}
	};

	const deleteItems = () => {
		selectedIds.map((sId) => {
			let rp = getReferenceProgramById(sId);
			console.log(JSON.stringify(rp), " eliminated");
         return rp;
		});
		handleCloseModal();
	};

   const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	}); 

	const [animatedStyle2, handleClickCreate] = useAnimatedStyle({
		navigate,
		path: "/referenceProgram",
	});

	return (
		<div
			className={" d-flex flex-column   animate__animated " + animatedStyle+ " "+animatedStyle2}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Programas de referenciación
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
					Eliminar programa(s) de referido(s) seleccionado(s)
				</Button>
				<Button
					className="mt-3 mx-2"
					color="primary"
					variant="contained"
					style={{ textTransform: "none" }}
					startIcon={<LocalPlayIcon />}
					onClick={handleClickCreate}
				>
					Crear nuevo programa de referidos
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
