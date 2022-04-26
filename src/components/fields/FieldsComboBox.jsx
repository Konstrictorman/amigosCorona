import React from "react";

import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

export const FieldsComboBox = (params) => {
	const { id, label, value, type, handleChange } = params;
   const items = useSelector((state) => state.lists[`${type}`]);



	return (
		<div>
			<TextField
            select
				label={label}
				error={false}
				id={id}
				name={id}
				size="small"
				value={value}
				onChange={handleChange}
				className="form-control"
            SelectProps={{
               native: true,
            }}            
			>
				<option value="">...</option>
				{items?.map((so) => {
               return(              
					<option key={so.id} value={so.valor}>
						{so.descripcion}
					</option>
            
				)})}
			</TextField>
		</div>
	);
};

FieldsComboBox.propTypes = {
   id: PropTypes.string.isRequired,
   label: PropTypes.string.isRequired,
   value: PropTypes.number.isRequired,
   type: PropTypes.string.isRequired,
   handleChange: PropTypes.func.isRequired,
}
