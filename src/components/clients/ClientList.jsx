import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { getClientColumns } from "./selectors/getClientColumns";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Spinner } from "../general/Spinner";
import { styled } from "@mui/material/styles";
import { INPUT_TYPE } from "../../config/config";
import { useCustomForm } from "../customHooks/useCustomForm";
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { PagedClientDataTable } from "./PagedClientDataTable";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

export const ClientList = () => {
	const navigate = useNavigate();
	const columns = getClientColumns();

	const [params, setParams] = useState({});
   const [show, setShow] = useState(false);

	const [
		formValues,
		handleInputChange,
		handleValueChange,
		handleCheckChange,
		handleComplexInputChange,
		reset,
	] = useCustomForm({
		codigoCliente: "",
		nombreCompleto: "",
	});

	const { codigoCliente, nombreCompleto } = formValues;

	const handleClick = (params) => {
		const { field, row } = params;
		if (field === "codigoCliente") {
			navigate(`/client?id=${row.id}`);
		}
	};

   const handleReset = () => {
      reset();
      setParams({});
      setShow(false);
   }

	const handleSearch = () => {
		Object.entries(formValues).forEach((fv) => {
			
			if (fv[1]) {
				setParams(_params => {
               return (
               {
					   ..._params,
					   [fv[0]]: fv[1],
				   })
            });
			}
		});

      setShow(true);
	};

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

	return (
		<div className={"text-center animate__animated " + animatedStyle}>
			<h4 className="title align-self-center" style={{ width: "90%" }}>
				Clientes
			</h4>
			<div className="align-self-center" style={{ width: "90%" }}>
				<form className="container__form">
					<Grid container spacing={2} rowSpacing={1}>
						<Grid item xs={6}>
							<Item className="half-quarter-width right">
								<TextField
									label="Código cliente"
									error={false}
									id="codigoCliente"
									type="text"
									name="codigoCliente"
									autoComplete="off"
									size="small"
									value={codigoCliente}
									onChange={handleInputChange}
									className="form-control"
									disabled={false}
									variant={INPUT_TYPE}
								/>
							</Item>
						</Grid>
						<Grid item xs={6}>
							<Item className="half-quarter-width">
								<TextField
									label="Nombre cliente"
									error={false}
									id="nombreCompleto"
									type="text"
									name="nombreCompleto"
									autoComplete="off"
									size="small"
									value={nombreCompleto}
									onChange={handleInputChange}
									className="form-control"
									disabled={false}
									variant={INPUT_TYPE}
								/>
							</Item>
						</Grid>

						<Grid item xs={12}>
							<div>
								<Button
									className="mt-3 mx-2 btn-warning"
									variant="contained"
									style={{ textTransform: "none" }}
									startIcon={<ArrowBackIcon />}
									onClick={handleClickOut}
								>
									Volver
								</Button>

								<Button
									variant="contained"
									className="mt-3 mx-2 btn-error"
									startIcon={<CleaningServicesIcon />}
									style={{ textTransform: "none" }}
									onClick={handleReset}
								>
									Limpiar
								</Button>
								<Button
									variant="contained"
									className="mt-3 mx-2 btn-primary"
									startIcon={<SearchIcon />}
									style={{ textTransform: "none" }}
									onClick={handleSearch}
								>
									Buscar
								</Button>
							</div>
						</Grid>
					</Grid>
				</form>

				{/*
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
								onPageChange={(page) =>
									setRowsState((prev) => ({ ...prev, page }))
								}
							/>

                     */}
				<PagedClientDataTable
					columns={columns}
					handleClick={handleClick}
					params={params}
               show = {show}
				/>
			</div>
			{/** 
			<div className="align-self-center">
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
         */}
		</div>
	);
};
