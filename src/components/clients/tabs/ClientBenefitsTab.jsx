import { TabPanel } from "@mui/lab";
import { DataGrid } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import { getReferrerLevelColumns } from "../selectors/getReferrerLevelColumns";
import { getReferrerLevelsByClientId } from "../selectors/getReferrerLevelsByClientId";
import { NoRowsOverlay } from "../../general/NoRowsOverlay";

export const ClientBenefitsTab = ({ client, index }) => {

   const referrerLevelColumns = getReferrerLevelColumns();
	const referrerLevels = useMemo(() => getReferrerLevelsByClientId(client.id), [client]);

	return (
		<div>
			<TabPanel value={index} style={{ padding: "0" }}>
				<DataGrid
					className=""
					rows={referrerLevels}
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
