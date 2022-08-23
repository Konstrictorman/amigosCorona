import React from "react";
import { TabPanel } from "@mui/lab";
import { PagedRedemptionsDataTable } from "../PagedRedemptionsDataTable";

export const RedemptionBasicDataTab = ({
	index,
	salesPoints,
	statusList,
	handleRevert,
	handleDownload,
	setResultsCount,
	show,
	params,
}) => {
	//const columns = getRedemptionBasicColumns(salesPoints, statusList,handleRevert,handleDownload);

	return (
		<div>
			<TabPanel value={index} style={{ padding: "0" }}>
				<PagedRedemptionsDataTable
					handleClick={() => {}}
					params={params}
					show={show}
					salesPoints={salesPoints}
					statusList={statusList}
					handleRevert={handleRevert}
					handleDownload={handleDownload}
					setResultsCount={setResultsCount}
				/>
			</TabPanel>
		</div>
	);
};
