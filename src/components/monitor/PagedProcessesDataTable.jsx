import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { PAGE_SIZE } from "../../config/config";
import { setError } from "../general/actions/uiActions";
import { DataTable } from "../general/DataTable";
import { Spinner } from "../general/Spinner";
import { getProcessByParams } from "./selectors/getProcessByParams";
import { getProcessColumns } from "./selectors/getProcessColumns";


const useQuery = (page, pageSize, params, show, estados) => {
	const [rowCount, setRowCount] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const [rows, setRows] = useState([]);
   const dispatch = useDispatch();

	useEffect(() => {
		let active = true;

		setLoading(true);
		setRowCount(undefined);

		if (show) {
			getProcessByParams(pageSize, page, params)
				.then((response) => {
               
					if (!active) {
						return;
					}

               //console.log("bills:", response);
					setRows(response.data?._embedded?.procesoes);
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
	}, [page, pageSize, params, show, estados, dispatch]);

	return { loading, rows, rowCount };
};

export const PagedProcessesDataTable = (attrs) => {
	const { handleClick, params, show, estadosProceso } = attrs;

   const handleViewMessages = (id) => {
      console.log("Buscando mensajes para ",id);
   }

   const handleDownload = (id) => {
      console.log("Descargando params", id);
   }

	const columns = getProcessColumns(handleViewMessages, handleDownload, estadosProceso);

	const [rowsState, setRowsState] = useState({
		page: 0,
		pageSize: PAGE_SIZE,
	});

	const { loading, rows, rowCount } = useQuery(
		rowsState.page,
		rowsState.pageSize,
		params,
		show
	);

	const [rowCountState, setRowCountState] = useState(rowCount || 0);

	useEffect(() => {
		setRowCountState((prev) => (rowCount !== undefined ? rowCount : prev));
	}, [rowCount, setRowCountState]);

	useEffect(() => {
		if (!show) {
			setRowsState((_rowsState) => {
				return {
					..._rowsState,
					page: 0,
				};
			});
		}
	}, [show]);

	if (loading) {
		return <Spinner />;
	}

	return (
		<div>
			{show > 0 && (
				<div className="topMargin">
					<Typography variant="h6" className="left-align">
						{rowCountState} Resultados
					</Typography>
					<Box
						className="align-self-center container__dataTable "
						sx={{
							border: 1,
							borderColor: "orange",
							borderRadius: "5px",
						}}
					>
						<DataTable
							className="container__dataTable"
							disableExtendRowFullWidth={true}
							rowsPerPageOptions={[5]}
							rows={rows}
							columns={columns}
							pageSize={PAGE_SIZE}
							onCellClick={handleClick}
							disableSelectionOnClick={true}
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
};
