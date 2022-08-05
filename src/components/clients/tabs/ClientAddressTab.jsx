import React from "react";
import { TabPanel } from "@mui/lab";
import { DataGrid } from "@mui/x-data-grid";
import { getClientAddressColumns } from "../selectors/getClientAddressColumns";
import { NoRowsOverlay } from "../../general/NoRowsOverlay";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export const ClientAddressTab = ({client, index, handleClickOut}) => {
	
   const addressColumns = getClientAddressColumns();
   const direccionesCliente = client?.direccionesCliente;

   return (
		<div>
			<TabPanel value={index} style={{ padding: "0" }}>
				<DataGrid
					className=""
					rows={direccionesCliente}
					columns={addressColumns}
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
