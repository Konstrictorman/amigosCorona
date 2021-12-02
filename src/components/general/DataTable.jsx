import React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";

export const DataTable = (props) => {
	const { columns, rows, pageSize, onSelectionModelChange, onCellClick, checkboxSelection, components } =	props;

	return (
		<>
			<DataGrid
            className="border border-primary rounded align-self-center"
            density="compact"
				rows={rows}
				columns={columns}
				pageSize={pageSize}
				rowsPerPageOptions={[5]}
            onCellClick={(params) => onCellClick(params)}
            disableSelectionOnClick={false}
            onSelectionModelChange={(ids) => onSelectionModelChange(ids)}
            autoHeight={true}
            autoPageSize={true}
            disableExtendRowFullWidth={true}
            checkboxSelection={checkboxSelection}
            components = {components}
			/>
		</>
	);
};

DataTable.propTypes = {
	columns: PropTypes.array.isRequired,
	rows: PropTypes.array.isRequired,
   pageSize: PropTypes.number.isRequired,

};
