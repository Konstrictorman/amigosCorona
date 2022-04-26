import React from "react";
import { TabPanel } from "@mui/lab";
import { DataGrid } from "@mui/x-data-grid";
import { getClientAddressColumns } from "../selectors/getClientAddressColumns";
import { NoRowsOverlay } from "../../general/NoRowsOverlay";

export const ClientAddressTab = ({client, index}) => {
	
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
			</TabPanel>
		</div>
	);  
};
