import React from "react";
import { TabPanel } from "@mui/lab";
import { PagedRedemptionsAuditTable } from "../PagedRedemptionsAuditTable";

export const RedemptionAuditTab = ({ index, params, show, handleClick, setResultsCount }) => {
	
	return (
		<div>
			<TabPanel value={index} style={{ padding: "0" }}>
				<PagedRedemptionsAuditTable
					handleClick={() => {}}
					params={params}
					show={show}
					setResultsCount={setResultsCount}
				/>            
			</TabPanel>
		</div>
	);
};
