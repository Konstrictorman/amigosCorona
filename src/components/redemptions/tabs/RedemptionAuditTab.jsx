import React from "react";
import { TabPanel } from "@mui/lab";
import { NoRowsOverlay } from "../../general/NoRowsOverlay";
import { getRedemptionAuditColumns } from "../selectors/getRedemptionAuditColumns";
import { DataGrid } from "@mui/x-data-grid";

export const RedemptionAuditTab = ({ index, rows, handleClick }) => {
	const columns = getRedemptionAuditColumns();
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
