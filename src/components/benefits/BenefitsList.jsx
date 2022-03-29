import React, { useState } from "react";
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



export const BenefitsList = () => {
   const columns = getBenefitsColumns();
   const [rows, setRows] = useState(getBenefits());
	const [selectedIds, setSelectedIds] = useState([]);
	const [openModal, setOpenModal] = useState(false);
   const [loading, setLoading] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
	const navigate = useNavigate();

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
		setRows(rows.filter((r) => !selectedIds.includes(r.id)));
		setSelectedIds([]);
		setLoading(false);
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
						pageSize={10}
						onCellClick={handleClick}
						onSelectionModelChange={handleRowChange}
                  checkboxSelection={true}
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
					Eliminar nivel(es) de beneficio(s)
				</Button>
				<Button
					className="mt-3 mx-2"
					color="secondary"
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
