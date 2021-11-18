import React, { useState } from "react";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { DataTable } from "../general/DataTable";
import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { getSalesPointsColumns } from "./selectors/getSalesPointColumns";
import { getSalesPoints } from "./selectors/getSalesPoints";

const columns = getSalesPointsColumns();

const rows = getSalesPoints();

export const SalesPointList = ({ history }) => {
	const [selectedIds, setSelectedIds] = useState([]);

	const handleRowChange = (ids) => {
		console.log("Ids:", ids);
		setSelectedIds(ids);
	};

	const handleClick = (params) => {
		const { field, row } = params;
		if (field === "name") {
			history.replace(`/salesPoint?id=${row.id}`);
		}
	};

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		history,
		path: "/salesPoint",
	});

	return (
		<div
			className={
				" d-flex flex-column   animate__animated " +
				animatedStyle
			}
		>
			<h4 className="title align-self-center" style={{ width: "80%" }}>
				Puntos de venta
			</h4>
				<div 
               className="align-self-center"
					style={{
						height: 460,
						width: "80%",
						backgroundColor: "whitesmoke",
					}}
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
			<div className='align-self-center'>
				<Button
					className="mt-3 mx-2"
					color="error"
					variant="contained"
					style={{ textTransform: "none" }}
					startIcon={<DeleteForeverIcon />}
					disabled={!selectedIds.length > 0}
				>
					Eliminar punto(s) de venta seleccionado(s)
				</Button>
				<Button
					className="mt-3 mx-2"
					color="primary"
					variant="contained"
					style={{ textTransform: "none" }}
					startIcon={<PointOfSaleIcon />}
					onClick={handleClickOut}
				>
					Crear nuevo punto de venta
				</Button>
			</div>
		</div>
	);
};
