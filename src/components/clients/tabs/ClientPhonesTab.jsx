import React from "react";
import { TabPanel } from "@mui/lab";
import { DataGrid } from "@mui/x-data-grid";
import { getClientPhoneColumns } from "../selectors/getClientPhoneColumns";
import { NoRowsOverlay } from "../../general/NoRowsOverlay";

export const ClientPhonesTab = ({client, index}) => {
   const phoneColumns = getClientPhoneColumns();
   const rows = client?.telefonosclientes? client.telefonosclientes: [];
   

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
			</TabPanel>
		</div>
	); 
};
