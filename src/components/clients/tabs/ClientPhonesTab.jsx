import React from "react";
import { TabPanel } from "@mui/lab";
import { DataGrid } from "@mui/x-data-grid";
import { getClientPhoneColumns } from "../selectors/getClientPhoneColumns";
import { NoRowsOverlay } from "../../general/NoRowsOverlay";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const ClientPhonesTab = ({ client, index, handleClickOut }) => {
	const phoneColumns = getClientPhoneColumns();
	const rows = client?.telefonosclientes ? client.telefonosclientes : [];


	return (
		<div>
			<TabPanel value={index} style={{ padding: "0" }}>
				<DataGrid
					//getRowId={(r) => r.idTelefono}
					className=""
					rows={rows}
					columns={phoneColumns}
					pageSize={5}
					checkboxSelection={false}
					density="compact"
					autoHeight={true}
					autoPageSize={true}
					components={{
						NoRowsOverlay: NoRowsOverlay,
					}}
				/>
				<div className="container__blank">
					<Button
						className="mt-3 mx-2 btn-warning"
						variant="contained"
						style={{ textTransform: "none" }}
						startIcon={<ArrowBackIcon />}
						onClick={handleClickOut}
					>
						Volver
					</Button>
				</div>
			</TabPanel>
		</div>
	);
};
