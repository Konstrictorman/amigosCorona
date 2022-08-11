import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { PAGE_SIZE } from "../../config/config";
import { setError } from "../general/actions/uiActions";
import { NoRowsOverlay } from "../general/NoRowsOverlay";
import { Spinner } from "../general/Spinner";
import { getMovementsByParams } from "./selectors/getMovementsByParams";
import { getMovementsColumns } from "./selectors/getMovementsColumns";



const useQuery = (page, pageSize, params, show) => {
	const [rowCount, setRowCount] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const [rows, setRows] = useState([]);
   const dispatch = useDispatch();

	useEffect(() => {
		let active = true;

		setLoading(true);
		setRowCount(undefined);

		if (show) {
			getMovementsByParams(pageSize, page, params)
				.then((response) => {
               //console.log("response:",response);
					if (!active) {
						return;
					}
               /*
               response.data?._embedded?.registroMovimientoSeqs.forEach((f) => {
                  const estado = estados.find((e) => e.valor === f.estadoFactura);
                  f.estado = estado.descripcion;
               })
               */
					setRows(response.data?._embedded?.registroMovimientoSeqs);
					setRowCount(response.data?.page?.totalElements);
					setLoading(false);
				})
				.catch((e) => {
					setLoading(false);
					Swal.fire("Error", e.message, "error");
               dispatch(setError(e));
				});
		} else {
			setRows([]);
			setRowCount(0);
			setLoading(false);
		}
		return () => {
			active = false;
			setLoading(false);
		};
	}, [page, pageSize, params, show, dispatch]);

	return { loading, rows, rowCount };
};



export const PagedMovementDataTable = (attrs) => {

   const { handleClick, params, show } = attrs;
   const columns = getMovementsColumns();

	const [rowsState, setRowsState] = useState({
		page: 0,
		pageSize: PAGE_SIZE,
	});

	const { loading, rows, rowCount } = useQuery(
		rowsState.page,
		rowsState.pageSize,
		params,
		show,
	);

	const [rowCountState, setRowCountState] = useState(rowCount || 0);

	useEffect(() => {
		setRowCountState((prev) => (rowCount !== undefined ? rowCount : prev));
	}, [rowCount, setRowCountState]);

   useEffect(() => {
     if (!show) {
        setRowsState(_rowsState => {
           return {
           ..._rowsState,
           page: 0,
           };
        });
     }
   }, [show])
   

	if (loading) {
		return <Spinner  css="text-center spinner-top-margin"/>;
	}   
	

	return (
		<div>
			{show > 0 && (
				<div className="topMargin">
					<Typography variant="h6" className="left-align">
						{rowCountState} Resultado(s)
					</Typography>
					<Box
						className="align-self-center container__dataTable "
						sx={{
							border: 1,
							borderColor: "orange",
							borderRadius: "5px",
						}}
					>
						<DataGrid
                     getRowId = {(r) => r.idRegistroMovimientoSeq}
							className="container__dataTable"
							density="compact"
							autoHeight={true}
							autoPageSize={false}
							disableExtendRowFullWidth={true}
							rowsPerPageOptions={[5]}
							rows={rows}
							columns={columns}
							pageSize={PAGE_SIZE}
							onCellClick={handleClick}
							disableSelectionOnClick={true}
							components={{
								NoRowsOverlay: NoRowsOverlay,
							}}
							loading={loading}
							pagination
							{...rowsState}
							paginationMode="server"
							rowCount={rowCountState}
							onPageChange={(page) =>
								setRowsState((prev) => ({ ...prev, page }))
							}
						/>
					</Box>
				</div>
			)}
		</div>
	);
}
