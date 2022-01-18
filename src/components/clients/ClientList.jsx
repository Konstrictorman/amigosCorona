import React from "react";
import { useNavigate } from "react-router";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { DataTable } from "../general/DataTable";
import { getClientColumns } from "./selectors/getClientColumns";
import { getClients} from "./selectors/getClients";
import { Button } from "@mui/material";
import { NoRowsOverlay } from '../general/NoRowsOverlay';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const columns = getClientColumns();
const rows = getClients();

export const ClientList = () => {
	const navigate = useNavigate();

	const handleClick = (params) => {
		const { field, row } = params;
		if (field === "codigoCliente") {
			navigate(`/client?id=${row.id}`);
		}
	};

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

	return (
		<div className={"text-center animate__animated " + animatedStyle}>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Clientes
			</h4>
			<div className="align-self-center dataTableContainer">
				{
					<DataTable
						rows={rows}
						columns={columns}
						pageSize={10}
						onCellClick={handleClick}
                  disableSelectionOnClick = {true}
						components={{
							NoRowsOverlay: NoRowsOverlay,
						}}
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
			</div>

		</div>
	);
};
