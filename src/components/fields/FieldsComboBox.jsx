import React from "react";

import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { INPUT_TYPE } from "../../config/config";

export const FieldsComboBox = (params) => {
	const { id, label, value, type, handleChange, valueType, error, labelType } = params;
   const items = useSelector((state) => state.lists[`${type}`]);


	return (
		<div>
			<TextField
            select
				label={label}
				id={id}
				name={id}
				size="small"
				value={value}
				onChange={handleChange}
				className="form-control"
            error={error}
            SelectProps={{
               native: true,
            }}            
            variant={INPUT_TYPE}
			>
				<option value=""></option>
				{items?.map((so) => {
               return(              
					<option key={so.id} value={so[`${valueType}`]}>
						{so[`${labelType}`]}
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
   valueType: PropTypes.string.isRequired,
   labelType: PropTypes.string.isRequired
}
