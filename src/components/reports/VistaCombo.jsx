import { TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { ERROR_MSG, INPUT_TYPE } from '../../config/config';
import { setError } from '../general/actions/uiActions';
import { getReportValidValuesForCombo } from './selectors/getReportValidValuesForCombo';

export const VistaCombo = (props) => {

   const { idDefinicionParametroReporte } = props;

	const [loading, setLoading] = useState(false);
	const [items, setItems] = useState([]);
	const dispatch = useDispatch();
	const componentMounted = useRef(true);

   
	useEffect(() => {
		const loadVista = async (idVista) => {
			setLoading(true);
			try {
				const vValues = await getReportValidValuesForCombo(idVista);
				setItems(vValues);
			} catch (e) {
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
				dispatch(setError(e));
			}
			setLoading(false);
		};

		if (componentMounted.current) {
			loadVista(idDefinicionParametroReporte);
		}
	}, [dispatch,idDefinicionParametroReporte]);

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
}
