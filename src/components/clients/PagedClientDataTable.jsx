import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getClientsByParams } from "./selectors/getClientsByParams";
import { NoRowsOverlay } from "../general/NoRowsOverlay";
import { Spinner } from "../general/Spinner";
import { useDispatch } from "react-redux";
import { setError } from "../general/actions/uiActions";

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
			getClientsByParams(pageSize, page, params)
				.then((response) => {
					if (!active) {
						return;
					}
					setRows(response.data?._embedded?.clientes);
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

export const PagedClientDataTable = (attrs) => {
	const { columns, handleClick, params, show, pageSize } = attrs;

	const [rowsState, setRowsState] = useState({
		page: 0,
		pageSize: pageSize,
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

	if (loading) {
		return <Spinner />;
	}

	return (
		<div>
			{show && (
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
						<DataGrid
							className="container__dataTable"
							density="compact"
							autoHeight={true}
							autoPageSize={false}
							disableExtendRowFullWidth={true}
							rowsPerPageOptions={[5]}
							rows={rows}
							columns={columns}
							pageSize={pageSize}
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
};
