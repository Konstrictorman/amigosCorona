import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { DeleteConfirmationModal } from "../general/DeleteConfirmationModal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getReferenceProgramColumns } from "./selectors/getReferenceProgramColumns";
import { useNavigate } from "react-router";
import { getReferencePrograms } from "./selectors/getReferencePrograms";
import LocalPlayIcon from "@mui/icons-material/LocalPlay";
import { DataTable } from "../general/DataTable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Spinner } from "../general/Spinner";
import Swal from "sweetalert2";
import { ERROR_MSG } from "../../config/config";
import { removeReferencePrograms } from "./actions/referenceProgramActions";
import { aFilter } from "../../helpers/aFilter";
import { getFieldValueByName } from "../fields/selectors/getFieldValueByName";
import { getReferenceProgramById } from "./selectors/getReferenceProgramById";
import { deleteFieldValue } from "../fields/actions/fieldValuesActions";

export const ReferenceProgramList = () => {
	const columns = getReferenceProgramColumns();
	const [rows, setRows] = useState([]);
	const [selectedIds, setSelectedIds] = useState([]);
	const [loading, setLoading] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const componentMounted = useRef(true);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
	const navigate = useNavigate();

   
	useEffect(() => {
		const getRefPrograms = async () => {
			setLoading(true);
			try {
				const data = await getReferencePrograms();
            console.log(data);
					setRows(data);

			} catch (e) {
				console.log(e);
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
			}
			setLoading(false);
		};
		getRefPrograms();
	}, []);
   

	const handleRowChange = (ids) => {
		setSelectedIds(ids);
	};

	const handleClick = (params) => {
		const { field, row } = params;
		if (field === "programa") {
			navigate(`/referenceProgram?id=${row.id}`);
		}
	};

	const deleteItems = async () => {
      handleCloseModal();		
      setLoading(true);
		
      try {
         await removeReferencePrograms(selectedIds);
         await removeReferenceField(selectedIds[0]);
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
	};

   const removeReferenceField = async (programId) => {
      const program = await getReferenceProgramById(programId);
      const field = await getFieldValueByName(program.programa);
      console.log("Eliminando",JSON.stringify(field,null,2));
      await deleteFieldValue(field.id);
      
   }


	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

	const [animatedStyle2, handleClickCreate] = useAnimatedStyle({
		navigate,
		path: "/referenceProgram",
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
				Programas de referenciación
			</h4>

			<div className="container__dataTable">
            
				<DataTable
					className="container__dataTable"
					loading={loading}
					rows={rows}
					columns={columns}
					pageSize={10}            
					onCellClick={handleClick}
					onSelectionModelChange={handleRowChange}
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
