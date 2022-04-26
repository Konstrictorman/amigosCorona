import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { DataTable } from "../general/DataTable";
import { getFieldColumns } from "./selectors/getFieldColumns";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { DeleteConfirmationModal } from "../general/DeleteConfirmationModal";
import { Spinner } from "../general/Spinner";
import { getFields } from "./selectors/getFields";
import Swal from "sweetalert2";
import { deleteField } from "./actions/fieldActions";
import { aFilter } from "../../helpers/aFilter";
import { ERROR_MSG, PAGE_SIZE } from "../../config/config";

export const FieldsList = () => {
	const navigate = useNavigate();
	const columns = getFieldColumns();
	const [rows, setRows] = useState([]);
	const [selectedIds, setSelectedIds] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
	const [loading, setLoading] = useState(false);
	const componentMounted = useRef(true);

	useEffect(() => {
		const getFieldsList = async () => {
			setLoading(true);
			try {
				const data = await getFields();

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

		getFieldsList();

		return () => {
			componentMounted.current = false;
			setLoading(null);
		};
	}, []);

	const handleRowChange = (ids) => {
		console.log("Ids:", ids);
		setSelectedIds(ids);
	};

	const handleClick = (params) => {
		const { field, row } = params;
		console.log(field, row);
		if (field === "campo") {
			//dispatch()
			navigate(`/field?id=${row.id}`);
		}
	};

	const deleteItems = () => {
		handleCloseModal();
		setLoading(true);

		try {
			selectedIds.forEach(async (item) => {
				await deleteField(item);
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

		setSelectedIds([]);
		setLoading(false);
	};

	const handleRemoveRows = () => {
		const result = aFilter(rows, selectedIds);
		console.log("result:", result);
		setRows(result);
	};

	const [animatedStyle2, handleClickCreate] = useAnimatedStyle({
		navigate,
		path: "/field",
	});

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
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
				Campos
			</h4>
			<div className="container__dataTable">
				{rows && (
					<DataTable
						rows={rows}
						columns={columns}
						pageSize={PAGE_SIZE}
						onCellClick={handleClick}
						onSelectionModelChange={handleRowChange}
						checkboxSelection={true}
					/>
				)}
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
					Eliminar campo(s) seleccionado(s)
				</Button>
				<Button
					className="mt-3 mx-2 btn-primary"
					variant="contained"
					style={{ textTransform: "none" }}
					startIcon={<Inventory2Icon />}
					onClick={handleClickCreate}
				>
					Crear campo
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
