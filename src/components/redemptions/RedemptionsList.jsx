import React, { useEffect, useState } from "react";
import {
	Button,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	Tab,
	TextField,
	Typography,
} from "@mui/material";

import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import {
	TabContext,
	TabList,
} from "@mui/lab";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import Box from "@mui/material/Box";
import { withStyles } from "@mui/styles";
import SellIcon from "@mui/icons-material/Sell";
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { RedemptionBasicDataTab } from "./tabs/RedemptionBasicDataTab";
import ArticleIcon from "@mui/icons-material/Article";
import { Spinner } from "../general/Spinner";
import { SalesPointsCombo } from "../salesPoint/SalesPointsCombo";
import { INPUT_TYPE } from "../../config/config";
import { Item } from "../general/Item";
import { useFormik } from "formik";
import * as yup from "yup";
import { CustomDatePicker } from "../general/CustomDatePicker";
import { ReverseConfirmationModal } from "../general/ReverseConfirmationModal";
import { downloadRedemptionById, reverseRedemption } from "./actions/redemptionActions";
import Swal from "sweetalert2";
import { setError, setMessage } from "../general/actions/uiActions";
import { useDispatch, useSelector } from "react-redux";
import { getSalesPointsActive } from "../salesPoint/selectors/getSalesPointsActive";
import { RedemptionAuditTab } from "./tabs/RedemptionAuditTab";
import { SearchTableModal } from "../general/SearchTableModal";
import { getClientColumns2 } from "../clients/selectors/getClientColumns2";

const StyledTabs = withStyles({
	indicator: {
		backgroundColor: "pantone300C",
		height: "3px",
	},
})(TabList);

const validationSchema = yup.object({
	fechaDesde: yup.date().required("Se requiere la fecha inicial").nullable(),
	fechaHasta: yup
		.date()
		.nullable()
		.required("Se requiere la fecha final")
		.min(
			yup.ref("fechaDesde"),
			"La fecha final debe ser mayor a la fecha inicial"
		),
   //idPuntoVenta: yup.string().required("El punto de venta es requerido"),      
});

export const RedemptionsList = () => {
	const navigate = useNavigate();
	const [tabIndex, setTabIndex] = useState("0");
	//const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [params, setParams] = useState({});
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

	const [openRevModal, setOpenRevModal] = useState(false);
	const handleOpenRevModal = () => setOpenRevModal(true);
	const handleCloseRevModal = () => setOpenRevModal(false);
	const [selected, setSelected] = useState({});
   const [salesPoints, setSalesPoints] = useState([]);
	const dispatch = useDispatch();
   const { estadosRedencion, tiposDocumento } = useSelector((state) => state.lists);
   const [resultsCount, setResultsCount] = useState(0);
   const columns = getClientColumns2(tiposDocumento);

   useEffect(() => {
      const loadSalesPoints = async () => {
         setLoading(true);
         try {
            const sps = await getSalesPointsActive();
            setSalesPoints(sps);
            setLoading(false);
         } catch(e) {
            Swal.fire("Error", e.message, "error");
            setLoading(false);
         }            
      }
      loadSalesPoints();
   }, [])

   
	const initialValues = {
		documento: "",
		idPuntoVenta: "",
		fechaDesde: null,
		fechaHasta: null,
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			//console.log(JSON.stringify(values, null, 2));
			handleSearch();
		},

		enableReinitialize: true,
	});

   const handleRevert = (row) => {
		setSelected(row);
		handleOpenRevModal();
	};

   const handleDownload = (row) => {
		setSelected(row);
		console.log("Descargando archivo para ",row);
      downloadRedemptionById(row.id)
         .then((response) => {
            const blob = new Blob([response.data], {type: 'application/pdf'});
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `${row.id}.pdf`;
            link.click();            
         })
   }

   //const columns = getRedemptionBasicColumns(salesPoints, estadosRedencion, handleClick);

	const handleSearch = async () => {
		setLoading(true);
		setShow(false);
            setParams({});
		Object.entries(formik.values).forEach((fv) => {
			if (fv[1]) {
				setParams((_params) => {
					//console.log("fv:", fv);
					return {
						..._params,
						[fv[0]]: fv[1],
					};
				});
			}
		});
		//const redemptions = await getRedemptions();

		//setRows(redemptions);
      //setResultsCount(redemptions.length);
		setLoading(false);
		setShow(true);
	};

	const handleReset = () => {
		formik.resetForm();
		//setRows([]);
		setShow(false);
	};

	const handleTabChange = (e, newValue) => {
		setTabIndex(newValue);
	};

   const handleClick = (params) => {
      setLoading(true);
		const { field, row } = params;
		if (field === "documento") {
         formik.setFieldValue("documento", row.codigoCliente);
			formik.setFieldValue("idCliente", row.id);
		}

		handleCloseModal();
      setLoading(false);
	};


	const reverseItem = () => {
		setLoading(true);
		//const index = rows.findIndex((item) => item.id === selected.id);
      handleCloseRevModal();
		reverseRedemption(selected)
			.then((response) => {
				setLoading(false);
				//handleReset();
				dispatch(
					setMessage({
						msg: "Registro reversado exitosamente",
						severity: "success",
					})
				);
				setSelected(null);

			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
				Swal.fire(
					"Error",
					err.cause ? err.cause.message : err.message ? err.message : err,
					"error"
				);
				dispatch(setError(err));
			});
	};

	const handleCustomChange = (name, val) => {
		formik.setFieldValue(name, val);
	};

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

	const [animatedStyle2, handleClickCreate] = useAnimatedStyle({
		navigate,
		path: "/redemption",
	});

	if (loading) {
		return <Spinner  css="text-center spinner-top-margin"/>;
	}

	return (
		<div
			className={
				" d-flex flex-column   animate__animated " +
				animatedStyle +
				" " +
				animatedStyle2
			}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Consulta de redenciones
			</h4>
			<div
				className="align-self-center"
				style={{
					width: "100%",
				}}
			>
				<form
					id="search-form"
					className="container__form"
					onSubmit={formik.handleSubmit}
				>
					<Grid container spacing={2} rowSpacing={1}>
						<Grid item xs={3}>
							<Item className="">
								<CustomDatePicker
									label="Fecha inicial *"
									id="fechaDesde"
									value={formik.values.fechaDesde}
									maxDate={new Date()}
									onChange={(val) => {
										handleCustomChange("fechaDesde", val);
									}}
									error={
										formik.touched.fechaDesde &&
										Boolean(formik.errors.fechaDesde)
									}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.fechaDesde &&
									formik.errors.fechaDesde}
							</FormHelperText>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<CustomDatePicker
									label="Fecha final *"
									id="fechaHasta"
									value={formik.values.fechaHasta}
									maxDate={new Date()}
									onChange={(val) => {
										handleCustomChange("fechaHasta", val);
									}}
									error={
										formik.touched.fechaHasta &&
										Boolean(formik.errors.fechaHasta)
									}
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.fechaHasta && formik.errors.fechaHasta}
							</FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item className="">
								<SalesPointsCombo
									label="Punto de venta"
									id="salesPoint"
									value={formik.values.idPuntoVenta}
									handleValueChange={(val) => {
										handleCustomChange("idPuntoVenta", val);
									}}
									error={
										formik.touched.idPuntoVenta &&
										Boolean(formik.errors.idPuntoVenta)
									}
								/>
							</Item>
						</Grid>

						<Grid item xs={2}>
							<Item className="">
								<TextField
									label="Nro documento"
									id="documento"
									type="text"
									name="documento"
									autoComplete="off"
									size="small"
									value={formik.values.documento}
									onChange={formik.handleChange}
									className="form-control"
									error={
										formik.touched.documento &&
										Boolean(formik.errors.documento)
									}
									variant={INPUT_TYPE}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													onClick={handleOpenModal}
													disabled={
														formik.values.documento?.length < 4
													}
												>
													<SearchIcon />
												</IconButton>
											</InputAdornment>
										),
									}}                           
								/>
							</Item>
							<FormHelperText className="helperText">
								{formik.touched.documento &&
									formik.errors.documento}
							</FormHelperText>
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
									className="mt-3 mx-2 btn-secondary"
									variant="contained"
									style={{ textTransform: "none" }}
									startIcon={<SellIcon />}
									onClick={handleClickCreate}
								>
									Crear nueva redención
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
									form="search-form"
									variant="contained"
									className="mt-3 mx-2 btn-primary"
									startIcon={<SearchIcon />}
									style={{ textTransform: "none" }}
									type="submit"
								>
									Buscar
								</Button>
							</div>
						</Grid>
					</Grid>
				</form>

				{loading && <Spinner  css="text-center spinner-top-margin"/>}

				{show && (
					<div className="topMargin">
                  
						<Typography variant="h6" className="left-align">                     
                     {resultsCount?`${resultsCount} Resultados`:'No se encontraron resultados'} 
                  </Typography>


                  
						<Box
							className="align-self-center container__dataTable "
							sx={{
								border: 1,
								borderColor: "orange",
								borderRadius: "5px",
							}}
						>
							<TabContext value={tabIndex}>
								<StyledTabs
									onChange={handleTabChange}
									sx={{ backgroundColor: "#e6e6e6" }}
								>
									<Tab
										value="0"
										label="Datos básicos"
										style={{ textTransform: "none" }}
										icon={<ArticleIcon fontSize="large" />}
										wrapped
									/>
                           
									<Tab
										value="1"
										label="Auditoría"
										style={{ textTransform: "none" }}
										icon={<LocationSearchingIcon fontSize="large" />}
										wrapped
									/>
                           
								</StyledTabs>
								<RedemptionBasicDataTab
									index="0"
                           params={params}
                           salesPoints={salesPoints}
                           statusList={estadosRedencion}
									handleRevert={handleRevert}
                           handleDownload={handleDownload}
                           setResultsCount={setResultsCount}
                           show={show}                           
								/>
                        
								<RedemptionAuditTab 
                           index="1"                            
                           params={params}
                           setResultsCount={setResultsCount}
                           show={show}                
                        />
                        
							</TabContext>
						</Box>
					</div>
				)}
			</div>

         <SearchTableModal
               title="Referenciadores"
					handleClose={handleCloseModal}
					handleAction={handleClick}
					open={openModal}
               criteria="documento"
					filter={formik.values.documento}
					pageSize={10}
               columns={columns}
					//items={selectedIds}
				/>         

			<ReverseConfirmationModal
				handleClose={handleCloseRevModal}
				handleAction={reverseItem}
				open={openRevModal}
				items={selected?.id}
				recordDesc={selected?.referencia}
			/>
		</div>
	);
};
