import React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";

export const DataTable = (props) => {
	const { columns, rows, pageSize, onSelectionModelChange, onCellClick, checkboxSelection, disableSelectionOnClick, components, loading, editMode, editRowsModel, onEditRowsModelChange, className } =	props;

   let css = "";
   if (className) {
      css = className;
   }else {
      css = "container__dataTable"
   }

	return (
         
			<DataGrid
            className={css}
            density="compact"
            loading = {loading}
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
            
            disableSelectionOnClick = {disableSelectionOnClick}
            editMode={editMode}
            editRowsModel={editRowsModel}
            onEditRowsModelChange={onEditRowsModelChange}            
			/>

	);
};

DataTable.propTypes = {
	columns: PropTypes.array.isRequired,
	rows: PropTypes.array.isRequired,
   pageSize: PropTypes.number.isRequired,

};
