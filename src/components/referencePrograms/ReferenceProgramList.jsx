import { Button } from "@mui/material";
import React, { useState } from "react";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { DeleteConfirmationModal } from "../general/DeleteConfirmationModal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getReferenceProgramColumns } from "./selectors/getReferenceProgramColumns";
import { useNavigate } from "react-router";
import { getReferencePrograms } from "./selectors/getReferencePrograms";
import LocalPlayIcon from '@mui/icons-material/LocalPlay';
import { DataTable } from "../general/DataTable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Spinner } from "../general/Spinner";


export const ReferenceProgramList = () => {
   const columns = getReferenceProgramColumns();
   const [rows, setRows] = useState(getReferencePrograms());
	const [selectedIds, setSelectedIds] = useState([]);
	const [loading, setLoading] = useState(false);   
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
		path: "/referenceProgram",
	});

   if (loading) {
      return (<Spinner/>);
   }

	return (
		<div
			className={" d-flex flex-column   animate__animated " + animatedStyle+ " "+animatedStyle2}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Programas de referenciación
			</h4>
			<div
				className="container__dataTable"

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
					Eliminar programa(s) de referido(s) seleccionado(s)
				</Button>
				<Button
					className="mt-3 mx-2 btn-primary"
					
					variant="contained"
					style={{ textTransform: "none" }}
					startIcon={<LocalPlayIcon />}
					onClick={handleClickCreate}
				>
					Crear programa de referidos
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
