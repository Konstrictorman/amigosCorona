import { TabPanel } from "@mui/lab";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { getReferrerLevelColumns } from "../selectors/getReferrerLevelColumns";
import { NoRowsOverlay } from "../../general/NoRowsOverlay";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getBenefits } from "../../benefits/selectors/getBenefits";
import { Spinner } from "../../general/Spinner";
import Swal from "sweetalert2";
import { setError } from "../../general/actions/uiActions";
import { useDispatch } from "react-redux";

export const ClientBenefitsTab = ({ levels, index, handleClickOut }) => {
	const [columns, setColumns] = useState([]);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
   const [rows, setRows] = useState([]);

   /*
	const rows = client?.referenciador?.levels
		? client.referenciador.levels
		: [];
*/
	useEffect(() => {
		setLoading(true);
		const loadBenefits = async () => {
			try {
				const bens = await getBenefits();
				setColumns(getReferrerLevelColumns(bens));
				//console.log(levels);
				setLoading(false);
			} catch (err) {
				setLoading(false);
				Swal.fire(
					"Error",
					err.cause ? err.cause.message : err.message ? err.message : err,
					"error"
				);
				dispatch(setError(err));
			}
		};
		loadBenefits();
	}, [dispatch]);

   useEffect(() => {
     setRows(levels);
   
   }, [levels])
   

	if (loading) {
		return <Spinner  css="text-center"/>;
	}

	return (
		<div>
			<TabPanel value={index} style={{ padding: "0" }}>
				<DataGrid
					className=""
					rows={rows}
					columns={columns}
					pageSize={5}
					checkboxSelection={false}
					density="compact"
					autoHeight={true}
					autoPageSize={true}
					components={{
						NoRowsOverlay: NoRowsOverlay,
					}}
				/>
				<div className="container__blank">
					<Button
						className="mt-3 mx-2 btn-warning"
						variant="contained"
						style={{ textTransform: "none" }}
						startIcon={<ArrowBackIcon />}
						onClick={handleClickOut}
					>
						Volver
					</Button>
				</div>
			</TabPanel>
		</div>
	);
};
