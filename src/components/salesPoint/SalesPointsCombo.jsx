import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { ERROR_MSG, INPUT_TYPE } from "../../config/config";
import { getSalesPointsForCombo } from "./selectors/getSalesPointsForCombo";
import {setError} from "../general/actions/uiActions";

export const SalesPointsCombo = (props) => {
	const { value, handleValueChange, error, label, disabled} = props;

   const [selected, setSelected] = useState({});
   const [sortedSalesPoints, setSortedSalesPoints] = useState([]);
	const componentMounted = useRef(true);
	const [loading, setLoading] = useState(false);
	
   
   const dispatch = useDispatch();

	useEffect(() => {
		const getSalesPointsList = async () => {
			setLoading(true);
			try {
				
            let sps = [];
				if (componentMounted.current) {
               sps = await getSalesPointsForCombo();
					setSortedSalesPoints(sps);
            }

            const sel = sps.filter((s) => s.id === value?.toString());
            if (sel.length >0) {
               setSelected(sel[0]);            
            } else {
               setSelected("");            
            }
            
          
            
			} catch (e) {
            Swal.fire(
					"Error",
					e.message + ` - ${ERROR_MSG}`,
					"error"
				);
            dispatch(setError(e));
			}
			setLoading(false);
		};

		getSalesPointsList();

	}, [dispatch,value]);
/*
   useEffect(() => {
     setSelected("");
   }, [value]);
   
*/
	if (loading) {
		return (
			<TextField
				value="Loading..."
				className="form-control"
				size="small"
				label="Punto de venta"
            variant={INPUT_TYPE}
			/>
		);
	}

   const handleChange = (event, newValue) => {
		setSelected(newValue);
      handleValueChange(newValue?newValue.id:undefined);    
      console.log(event,newValue);
   }

	return (
		<Autocomplete
         disablePortal               
			options={sortedSalesPoints}                  
			value={selected}
         onChange={handleChange}  
         disabled={disabled}
         //isOptionEqualToValue={(option, value) => value === undefined || value === "" || option.id === value.id}
         filterSelectedOptions
			renderInput={(params) => (
				<TextField
					{...params}
               error={error}
					className="form-control"
					size="small"
               label={label}
               variant={INPUT_TYPE}         
                   
				/>
			)}
         defaultValue={""}
		/>
	);
};


