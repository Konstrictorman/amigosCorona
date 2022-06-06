import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { ERROR_MSG, PAGE_SIZE } from "../../config/config";
import { NoRowsOverlay } from "../general/NoRowsOverlay";
import { getMovementResume } from "./selectors/getMovementResume";
import { getMovementsResumeColumns } from "./selectors/getMovementsResumeColumns";

export const MovementsResume = (props) => {

   const {fechaDesde, fechaHasta} = props;
	const columns = getMovementsResumeColumns();
	const [loading, setLoading] = useState(false);
	const [rows, setRows] = useState([]);
	const componentMounted = useRef(true);

	useEffect(() => {
		const getResume = async () => {
			setLoading(true);
			try {
				const data = await getMovementResume(fechaDesde,fechaHasta);

				if (componentMounted.current) {
					setRows(data);
				}
			} catch (e) {
				console.log(e);
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
			}
			setLoading(false);
		};

		getResume();
		return () => {
			componentMounted.current = false;
			setLoading(null);
		};
	}, [fechaDesde, fechaHasta]);

	return (
		<div className="topMargin">
			<DataGrid
				getRowId={(r) => r.saldoInicial}
				className="container__dataTable"
				density="compact"
				autoHeight={true}
				autoPageSize={false}
				disableExtendRowFullWidth={true}
				rowsPerPageOptions={[5]}
				rows={rows}
				columns={columns}
				pageSize={PAGE_SIZE}
				disableSelectionOnClick={true}
				components={{
					NoRowsOverlay: NoRowsOverlay,
				}}
				loading={loading}
            hideFooter={true}
			/>
		</div>
	);
};
