import React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";

export const DataTable = (props) => {
	const { columns, rows, pageSize, onRowClick, onSelectionModelChange, onRequestSort } =
		props;

	return (
		<>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={pageSize}
				rowsPerPageOptions={[5]}
				checkboxSelection
            
            disableSelectionOnClick={false}
            onSelectionModelChange={(ids) => onSelectionModelChange(ids)}
			/>
		</>
	);
};

DataTable.propTypes = {
	columns: PropTypes.array.isRequired,
	rows: PropTypes.array.isRequired,
   pageSize: PropTypes.number.isRequired,
   setSelectedRows: PropTypes.func.isRequired,
   onRowClick: PropTypes.func.isRequired,

};
