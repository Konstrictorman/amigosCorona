import { TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { ERROR_MSG, INPUT_TYPE } from "../../config/config";
import { setError } from "../general/actions/uiActions";
import { getReportDefinitionsForCombo } from "./selectors/getReportDefinitionsForCombo";

export const ReportDefinitionsCombo = (props) => {
	const { handleChange, tipoProceso } = props;

	const [loading, setLoading] = useState(false);
	const [items, setItems] = useState([]);
	const dispatch = useDispatch();
	const componentMounted = useRef(true);

	useEffect(() => {
		const loadDefinitionsNames = async () => {
			setLoading(true);
			try {
				const pNames = await getReportDefinitionsForCombo(tipoProceso);
				setItems(pNames);
			} catch (e) {
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
				dispatch(setError(e));
			}
			setLoading(false);
		};

		if (componentMounted.current) {
			loadDefinitionsNames();
		}
	}, [dispatch,tipoProceso]);


	if (loading) {
		return (
			<TextField
				value="Loading..."
				className="form-control"
				size="small"
				label="Nombre proceso"
				variant={INPUT_TYPE}
			/>
		);
	}

	return (
		<div>
			<TextField
            {...props}
				select
				size="small"
				onChange={handleChange}
				className="form-control"
				SelectProps={{
					native: true,
				}}
				variant={INPUT_TYPE}
			>
				<option value=""></option>
				{items?.map((so) => {
					return (
						<option key={so.id} value={so.id}>
							{so.label}
						</option>
					);
				})}
			</TextField>
		</div>
	);
};
