import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { PAGE_SIZE } from "../../config/config";
import { setError } from "../general/actions/uiActions";
import { DataTable } from "../general/DataTable";
import { Spinner } from "../general/Spinner";
import { downloadFileByProcessId } from "./actions/monitorActions";
import { MessagesModal } from "./MessagesModal";
import { getMessagesByProcessId } from "./selectors/getMessagesByProcessId";
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

///////////////////////////

export const PagedProcessesDataTable = (attrs) => {
	const { handleClick, params, show, estadosProceso } = attrs;

	const [tLoading, setTLoading] = useState(false);
	const [openMsgModal, setOpenMsgModal] = useState(false);
	const [messages, setMessages] = useState([]);
	const handleOpenMsgModal = () => setOpenMsgModal(true);
	const handleCloseMsgModal = () => setOpenMsgModal(false);
   const dispatch = useDispatch();

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

	const handleViewMessages = (id) => {
		
		handleOpenMsgModal();
		setTLoading(true);

		getMessagesByProcessId(id)
         .then((response) => {
			   //console.log(JSON.stringify(response, null, 2));
			   setMessages(response);
			   setTLoading(false);
         })
         .catch((err) => {
				setTLoading(false);				
				Swal.fire(
					"Error",
					err.cause ? err.cause.message : (err.message? err.message:err),
					"error"
				);
				dispatch(setError(err));            
         })
		
	};

	const handleDownload = (row) => {
		console.log("Descargando params", JSON.stringify(row,null,2));
      /*
      var encoding = "application/octet-stream";
      if (row.tipoArchivoSalida === "pdf") {
         encoding = "application/pdf";
      } else if (row.tipoArchivoSalida ==="xls") {
         encoding = "application/vnd.ms-excel";
      } 
      */
      downloadFileByProcessId(row.id)
         .then((response) => {
            const encoding = response.headers['content-type'];
            console.log(JSON.stringify(encoding,null,2));
            const blob = new Blob([response.data], {type: encoding});
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `${row.id}.${row.tipoArchivoSalida}`;
            link.click();
         })
	};

	const columns = getProcessColumns(
		handleViewMessages,
		handleDownload,
		estadosProceso
	);

	/*

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
*/
	if (loading) {
		return <Spinner  css="text-center spinner-top-margin"/>;
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
							//rowsPerPageOptions={[5, 10, 20]}
							rows={rows}
							columns={columns}
							pageSize={parseInt(PAGE_SIZE)}
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
			<MessagesModal
				handleClose={handleCloseMsgModal}
				open={openMsgModal}
				pageSize={10}
				rows={messages}
				loading={tLoading}
			/>
		</div>
	);
};
