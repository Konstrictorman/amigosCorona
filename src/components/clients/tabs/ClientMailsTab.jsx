import React from "react";
import { TabPanel } from "@mui/lab";
import { DataGrid } from "@mui/x-data-grid";
import { NoRowsOverlay } from "../../general/NoRowsOverlay";
import { getClientMailColumns } from "../selectors/getClientMailColumns";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";



export const ClientMailsTab = ({client, index,handleClickOut}) => {

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
