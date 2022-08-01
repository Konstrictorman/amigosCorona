import React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { NoRowsOverlay } from "./NoRowsOverlay";

export const DataTable = (props) => {
	const { className } = props;
	/*
   let css = "";
   if (className) {
      css = className;
   }else {
      css = "container__dataTable"
   }
*/
	return (
		<Box
			sx={{
            width:'100%',
				"& .MuiDataGrid-root .MuiDataGrid-columnHeaderTitle": {
					fontWeight: "900",
				},

			}}
		>
			<DataGrid
				{...props}
				className={className}
            density="compact"
            autoHeight={true}
            autoPageSize={true}
            components={{
               NoRowsOverlay: NoRowsOverlay,
            }}               
			/>
		</Box>
	);
};

DataTable.propTypes = {
	columns: PropTypes.array.isRequired,
	rows: PropTypes.array.isRequired,
	pageSize: PropTypes.number.isRequired,
};
