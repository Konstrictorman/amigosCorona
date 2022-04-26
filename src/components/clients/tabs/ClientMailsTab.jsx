import React from "react";
import { TabPanel } from "@mui/lab";
import { DataGrid } from "@mui/x-data-grid";
import { NoRowsOverlay } from "../../general/NoRowsOverlay";
import { getClientMailColumns } from "../selectors/getClientMailColumns";

export const ClientMailsTab = ({client, index}) => {

   const rows = client?.emailsCliente;
   const mailColumns = getClientMailColumns();
  
   return (
		<div>
			<TabPanel value={index} style={{ padding: "0" }}>
				<DataGrid
               //getRowId={(r) => r.idMail}            
					className=""
					rows={rows}
					columns={mailColumns}
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
