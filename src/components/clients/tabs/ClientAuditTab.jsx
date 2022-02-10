import { TabPanel } from "@mui/lab";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { getAuditColumns } from "../selectors/getAuditColumns";
import { NoRowsOverlay } from "../../general/NoRowsOverlay";

export const ClientAuditTab = ({client, index}) => {
	const columns = getAuditColumns();
   //const rows = [];
   
	const rows = [
			{
            id: `${client.id}`,
				usuarioCreacion: `${client.referenciador.usuarioCreacion}`,
				fechaCreacion: `${client.referenciador.fechaCreacion}`,
				usuarioModificacion: `${client.referenciador.usuarioModificacion}`,
				fechaModificacion: `${client.referenciador.fechaModificacion}`,
			}
		];
   

	return (
		<div>
			<TabPanel value={index} style={{ padding: "0" }}>
				<DataGrid
					className=""
					rows={rows}
					columns={columns}
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
