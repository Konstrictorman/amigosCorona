import React from "react";
import { TabPanel } from "@mui/lab";
import { DataGrid } from "@mui/x-data-grid";
import { NoRowsOverlay } from "../../general/NoRowsOverlay";
import { getStatusHistoryColumns } from "../selectors/getStatusHistoryColumns";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const ClientStateHistoryTab = ({client, index, handleClickOut}) => {

   //console.log(client);
	const statusHistoryColumns = getStatusHistoryColumns();
	const rows = client?.referenciador?.states? client.referenciador.states: [];


  
	return (
		<div>
			<TabPanel value={index} style={{ padding: "0" }}>
				<DataGrid
					className=""
					rows={rows}
					columns={statusHistoryColumns}
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
