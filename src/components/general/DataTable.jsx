import React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import { NoRowsOverlay } from '../general/NoRowsOverlay';

export const DataTable = (props) => {
	const { columns, rows, pageSize, onSelectionModelChange, onCellClick, checkboxSelection, disableSelectionOnClick, components, loading } =	props;

	return (

			<DataGrid
            className='container__dataTable3'
            density="compact"
				rows={rows}
				columns={columns}
				pageSize={pageSize}
				rowsPerPageOptions={[5]}
            onCellClick={(params) => onCellClick(params)}
            onSelectionModelChange={(ids) => onSelectionModelChange(ids)}
            autoHeight={true}
            autoPageSize={true}
            disableExtendRowFullWidth={true}
            checkboxSelection={checkboxSelection}
            components = {components}
            loading = {loading}
            disableSelectionOnClick = {disableSelectionOnClick}
			/>

	);
};

DataTable.propTypes = {
	columns: PropTypes.array.isRequired,
	rows: PropTypes.array.isRequired,
   pageSize: PropTypes.number.isRequired,

};
