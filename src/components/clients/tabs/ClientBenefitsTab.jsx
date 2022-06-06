import { TabPanel } from "@mui/lab";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { getReferrerLevelColumns } from "../selectors/getReferrerLevelColumns";
import { NoRowsOverlay } from "../../general/NoRowsOverlay";

export const ClientBenefitsTab = ({ client, index }) => {

   const referrerLevelColumns = getReferrerLevelColumns();
	const rows = client?.referenciador?.levels? client.referenciador.levels: [];

	return (
		<div>
			<TabPanel value={index} style={{ padding: "0" }}>
				<DataGrid
					className=""
					rows={rows}
					columns={referrerLevelColumns}
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
