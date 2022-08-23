import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { PAGE_SIZE } from "../../config/config";
import { NoRowsOverlay } from "../general/NoRowsOverlay";
import { Spinner } from "../general/Spinner";
import { getRedemptionBasicColumns } from "./selectors/getRedemptionBasicColumns";
import { useRedemptionsQuery } from "./useRedemptionsQuery";


export const PagedRedemptionsDataTable = (attrs) => {

   const { handleClick, params, show, statusList, salesPoints,handleRevert, handleDownload, setResultsCount } = attrs;
   const columns = getRedemptionBasicColumns(salesPoints, statusList, handleRevert, handleDownload);

	const [rowsState, setRowsState] = useState({
		page: 0,
		pageSize: 5,
	});

	const { loading, rows, rowCount } = useRedemptionsQuery(
		rowsState.page,
		rowsState.pageSize,
		params,
		show,
	);

	const [rowCountState, setRowCountState] = useState(rowCount || 0);

	useEffect(() => {
		setRowCountState((prev) => (rowCount !== undefined ? rowCount : prev));
      setResultsCount((prev) => (rowCount !== undefined ? rowCount : prev));
	}, [rowCount, setRowCountState, setResultsCount]);

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
				<div className="">
               	<DataGrid                     
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
                     checkboxSelection={false}
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
				</div>
			)}
		</div>
	);

}