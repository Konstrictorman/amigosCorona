import React, { useMemo } from "react";
import { TabPanel } from "@mui/lab";
import { DataGrid } from "@mui/x-data-grid";
import { NoRowsOverlay } from "../../general/NoRowsOverlay";
import { getStatusHistoryColumns } from "../selectors/getStatusHistoryColumns";
import { getStatusHistoryByClientId } from "../selectors/getStatusHistoryByClientId";

export const ClientStateHistoryTab = ({client, index}) => {

	const statusHistoryColumns = getStatusHistoryColumns();
	const statusHistory = useMemo(() => getStatusHistoryByClientId(client.id), [client]);

  
	return (
		<div>
			<TabPanel value={index} style={{ padding: "0" }}>
				<DataGrid
					className=""
					rows={statusHistory}
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
			</TabPanel>
		</div>
	);   
};
