import React, { useEffect, useRef, useState } from "react";
import { DeleteConfirmationModal } from "../general/DeleteConfirmationModal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router";
import { DataTable } from "../general/DataTable";
import { Button } from "@mui/material";
import { getBenefitsColumns } from "./selectors/getBenefitsColumns";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { getBenefits } from "./selectors/getBenefits";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Spinner } from "../general/Spinner";
import { ERROR_MSG, PAGE_SIZE } from "../../config/config";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { deleteBenefit } from "./actions/benefitsAction";
import { aFilter } from "../../helpers/aFilter";

export const BenefitsList = () => {
   const navigate = useNavigate();
	const [openModal, setOpenModal] = useState(false);
   const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);	
   const columns = getBenefitsColumns();
   const [selectedIds, setSelectedIds] = useState([]);
   const [loading, setLoading] = useState(false);
   const [rows, setRows] = useState([]);
	const componentMounted = useRef(true);
   const { estados, programas } = useSelector((state) => state.lists);
   
   
   useEffect(() => {
     const getBenefitLevels = async () => {
        setLoading(true);
        try {
           const data = await getBenefits();

           if (componentMounted.current) {
              data.forEach((b)=> {
                  const estado = estados?.find((e)=> e.valor === b.estado);
                  b.estadoDesc = estado?.descripcion;

                  const prog = programas?.find((p) => p.idProgramaReferenciacion === b.idProgramaReferenciacion);
                  b.programa = prog?.descripcion;
              })
              
              console.log("data:",data);
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
     }

     getBenefitLevels();
   
     return () => {
      componentMounted.current = false;
      setLoading(null);
     }
   }, [estados, programas])
   
	

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

	const [animatedStyle2, handleClickCreate] = useAnimatedStyle({
		navigate,
		path: "/benefit",
	});

	const handleRowChange = (ids) => {
		console.log("Ids:", ids);
		setSelectedIds(ids);
	};

	const handleClick = (params) => {
		const { field, row } = params;
		if (field === "nivelBeneficio") {
			navigate(`/benefit?id=${row.id}`);
		}
	};

	const deleteItems = () => {
		handleCloseModal();
		setLoading(true);
		//setRows(rows.filter((r) => !selectedIds.includes(r.id)));

      
		try {
			selectedIds.forEach(async (item) => {
            await deleteBenefit(item);
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
		console.log("result:", result);
		setRows(result);
      setSelectedIds([]);
	};   

   if (loading) {
      return (<Spinner/>)
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
				Nivel de beneficios
			</h4>
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
					Eliminar nivel(es) de beneficio(s)
				</Button>
				<Button
					className="mt-3 mx-2 btn-primary"
					
					variant="contained"
					style={{ textTransform: "none" }}
					startIcon={<EmojiEventsIcon />}
					onClick={handleClickCreate}
				>
					Crear nivel de beneficios
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
