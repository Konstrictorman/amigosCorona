import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { ERROR_MSG, INPUT_TYPE } from "../../config/config";
import { getSalesPointsForCombo } from "./selectors/getSalesPointsForCombo";
import {setError} from "../general/actions/uiActions";

export const SalesPointsCombo = (props) => {
	const { id, handleValueChange } = props;

   console.log("props:", id);

	const [sortedSalesPoints, setSortedSalesPoints] = useState([]);
	const componentMounted = useRef(true);
	const [loading, setLoading] = useState(false);
	const [inputValue, setInputValue] = useState("");
   const [selected, setSelected] = useState({});
   const dispatch = useDispatch();

	useEffect(() => {
		const getSalesPointsList = async () => {
			setLoading(true);
			try {
				const sps = await getSalesPointsForCombo();

				if (componentMounted.current) {
					setSortedSalesPoints(sps);
            }

            const sel = sps.filter((s) => s.id === id.toString());
            setSelected(sel[0]);            
            
			} catch (e) {
				console.log(e);
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
		return () => {
			componentMounted.current = false;
			setLoading(null);
		};
	}, [id,dispatch]);

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
      handleValueChange("idPuntoVenta", newValue?.id);      
   }

	return (
		<Autocomplete
         disablePortal      
         id="salesPoint"
			options={sortedSalesPoints}         

			value={selected}
         onChange={(event, newValue) => handleChange(event, newValue)}  

			inputValue={inputValue}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}}

			renderInput={(params) => (
				<TextField
					{...params}
					className="form-control"
					size="small"
					label="Punto de venta"
					required
               variant={INPUT_TYPE}
				/>
			)}
		/>
	);
};


