import React, { useMemo } from "react";
import { TabPanel } from "@mui/lab";
import { NoRowsOverlay } from "../../general/NoRowsOverlay";
import { getRedemptionBasicColumns } from "../selectors/getRedemptionBasicColumns";
import { DataTable } from "../../general/DataTable";
import { DataGrid } from "@mui/x-data-grid";

export const RedemptionBasicDataTab = ({ index, rows, handleClick }) => {
	const columns = getRedemptionBasicColumns();

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
               onCellClick={handleClick}
					components={{
						NoRowsOverlay: NoRowsOverlay,
					}}
				/>
			</TabPanel>
		</div>
	);
};
