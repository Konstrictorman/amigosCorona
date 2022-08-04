import { TabPanel } from "@mui/lab";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { getReferrerLevelColumns } from "../selectors/getReferrerLevelColumns";
import { NoRowsOverlay } from "../../general/NoRowsOverlay";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const ClientBenefitsTab = ({ client, index, handleClickOut }) => {

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
