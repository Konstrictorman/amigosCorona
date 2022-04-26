import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { DataTable } from "../general/DataTable";
import { getClientColumns } from "./selectors/getClientColumns";
import { getClients } from "./selectors/getClients";
import { Button } from "@mui/material";
import { NoRowsOverlay } from "../general/NoRowsOverlay";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Spinner } from "../general/Spinner";
import Swal from "sweetalert2";
import { ERROR_MSG, PAGE_SIZE } from "../../config/config";
import { useDispatch } from "react-redux";
import {
	setError
} from "../general/actions/uiActions";
import { DataGrid } from "@mui/x-data-grid"; 


const useQuery = (page, pageSize) => {
   const [rowCount, setRowCount] = useState(undefined);
   const [loading, setLoading] = useState(false);
   const [rows, setRows] = useState([]);

   useEffect(() => {
     let active = true;

     setLoading(true);
     setRowCount(undefined);
     getClients(pageSize, page)
      .then((response) => {
         if (!active) {
            return;
         }
         setRows(response.data._embedded.clientes);
         setRowCount(response.data.page.totalElements)         
         setLoading(false);
      })
    

   
     return () => {
       active = false;
     }
   }, [page, pageSize])

   return {loading, rows, rowCount}
   
}

export const ClientList = () => {
	const navigate = useNavigate();
	const columns = getClientColumns();
	
	
   //const [pageNumber, setPageNumber] = useState(0);
   
	//const componentMounted = useRef(true);
   //const dispatch = useDispatch();

   const [rowsState, setRowsState] = useState({
      page: 0,
      pageSize: PAGE_SIZE,
   });

   const { loading, rows, rowCount} = useQuery(rowsState.page, rowsState.pageSize)
   const [rowCountState, setRowCountState] = useState(rowCount || 0);

   /*
	useEffect(() => {
		const getClientsList = async () => {
			setLoading(true);
         let data = null;
			try {
				data = await getClients(PAGE_SIZE, pageNumber);
            //console.log("data: ", JSON.stringify(data.data.page));
            
            if (componentMounted.current && data.data._embedded) {
               setRows(data.data._embedded.clientes);
               setRowCount(data.data.page.totalElements)
            } 
                       
			} catch (e) {
				console.log("status",data.status);
            let path = "";
            if (data.status !== 200) {
               path = " - " + data.path;
            }
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
            dispatch(setError(e.message+path));
			}
			setLoading(false);
		};

		getClientsList();

		return () => {
			componentMounted.current = false;
			setLoading(null);
		};
	}, [dispatch, pageNumber]);
*/

   useEffect(() => {
     setRowCountState((prev) => 
         rowCount !== undefined ? rowCount : prev
     );   
   }, [rowCount, setRowCountState]);
   



	const handleClick = (params) => {
		const { field, row } = params;
		if (field === "codigoCliente") {
			navigate(`/client?id=${row.id}`);
		}
	};

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

	if (loading) {
		return <Spinner />;
	}

	return (
		<div className={"text-center animate__animated " + animatedStyle}>
			<h4 className="title align-self-center" style={{ width: "90%" }}>
				Clientes
			</h4>
			<div className="container__dataTable" style={{ width: "90%" }}>
				{
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
						components={{
							NoRowsOverlay: NoRowsOverlay,
						}}
                  loading={loading}
                  pagination
                  {...rowsState}
                  paginationMode="server"
                  rowCount={rowCountState}
                  onPageChange={(page) => setRowsState((prev) => ({...prev, page}))}
					/>
				}
			</div>
			<div className="align-self-center">
				<Button
					className="mt-3 mx-2"
					color="warning"
					variant="contained"
					style={{ textTransform: "none" }}
					startIcon={<ArrowBackIcon />}
					onClick={handleClickOut}
				>
					Volver
				</Button>
			</div>
		</div>
	);
};
