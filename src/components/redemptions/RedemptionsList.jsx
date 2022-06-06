import React, { useEffect, useMemo, useRef, useState } from "react";
import {
	Autocomplete,
	Button,
	Grid,
	Paper,
	Tab,
	TextField,
	Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { getRedemptions } from "./selectors/getRedemptions";
import { getRedemptionById } from "./selectors/getRedemptionById";
import { useCustomForm } from "../customHooks/useCustomForm";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import {
	DesktopDatePicker,
	LocalizationProvider,
	TabContext,
	TabList,
} from "@mui/lab";
import { useNavigate } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import esLocale from "date-fns/locale/es";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import Box from "@mui/material/Box";
import { withStyles } from "@mui/styles";
import SellIcon from "@mui/icons-material/Sell";
import { RedemptionBasicDataTab } from "./tabs/RedemptionBasicDataTab";
import { RedemptionAuditTab } from "./tabs/RedemptionAuditTab";
import ArticleIcon from "@mui/icons-material/Article";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { Spinner } from "../general/Spinner";
import { SalesPointsCombo } from "../salesPoint/SalesPointsCombo";
import { INPUT_TYPE } from "../../config/config";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

const StyledTabs = withStyles({
	indicator: {
		backgroundColor: "pantone300C",
	},
})(TabList);

export const RedemptionsList = () => {
	const navigate = useNavigate();
	const [tabIndex, setTabIndex] = useState("0");
	const [rows, setRows] = useState([]);
   const [loading, setLoading] = useState(false);

	const search = () => {
		setRows(getRedemptions());
	};

	const clear = () => {
		setRows([]);
		reset();
	};

	const [
		formValues,
		handleInputChange,
		handleValueChange,
		handleCheckChange,
		handleComplexInputChange,
		reset,
	] = useCustomForm({
		codeCliente: "",
		idPuntoVenta: "",
		fechaInicial: null,
		fechaFinal: null,
	});

	const { codeCliente, idPuntoVenta, fechaInicial, fechaFinal } = formValues;

	const handleSubmit = (e) => {
		e.preventDefault();
		search();
	};

	const handleTabChange = (e, newValue) => {
		setTabIndex(newValue);
	};

	const handleClick = (params) => {
		const { field, row } = params;
		if (field === "revertir") {
         const redem = getRedemptionById(row.id);
         redem.estado = "Inactivo";
			console.log("Se revirtió el ítem con id:" + row.id);
		}
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
		return <Spinner />;
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
					className="container__form"
					onSubmit={handleSubmit}
				>
					<Grid container spacing={2} rowSpacing={1}>
						<Grid item xs={3}>
							<Item className="">
								<LocalizationProvider
									dateAdapter={AdapterDateFns}
									locale={esLocale}
								>
									<DesktopDatePicker
										label="Fecha inicial"
										id="fechaInicial"
										value={fechaInicial}
										maxDate={new Date()}
										onChange={(newValue) => {
											handleValueChange("fechaInicial", newValue);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												size="small"
												className="form-control"
												error={false}
                                    variant={INPUT_TYPE}
											/>
										)}
										disabled={false}
                              
									/>
								</LocalizationProvider>
							</Item>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<LocalizationProvider
									dateAdapter={AdapterDateFns}
									locale={esLocale}
								>
									<DesktopDatePicker
										label="Fecha final"
										id="fechaFinal"
										value={fechaFinal}
										maxDate={new Date()}
										onChange={(newValue) => {
											handleValueChange("fechaFinal", newValue);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												size="small"
												className="form-control"
												error={false}
                                    variant={INPUT_TYPE}
											/>
										)}
										disabled={false}
                              
									/>
								</LocalizationProvider>
							</Item>
						</Grid>

						<Grid item xs={4}>
							<Item className="">

                        <SalesPointsCombo id={idPuntoVenta} handleValueChange={handleValueChange}/>
							</Item>
						</Grid>

						<Grid item xs={2}>
							<Item className="">
								<TextField
									label="Código cliente"
									error={false}
									id="codeCliente"
									type="text"
									name="codeCliente"
									autoComplete="off"
									size="small"
									value={codeCliente}
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
									onClick={clear}
								>
									Limpiar
								</Button>
								<Button
									variant="contained"
									className="mt-3 mx-2 btn-primary"
									startIcon={<SearchIcon />}
									style={{ textTransform: "none" }}
									type="submit"
									onClick={handleSubmit}
								>
									Buscar
								</Button>
							</div>
						</Grid>
					</Grid>
				</form>

				{rows.length > 0 && (
					<div className="topMargin">
						<Typography variant="h6" className="left-align">
							{rows.length} Resultados
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
										icon={<LocationSearchingIcon fontSize="large"/>}
										wrapped
									/>
								</StyledTabs>
								<RedemptionBasicDataTab
									index="0"
									rows={rows}
									handleClick={handleClick}
								/>
								<RedemptionAuditTab index="1" rows={rows} />
							</TabContext>
						</Box>
					</div>
				)}
			</div>
		</div>
	);
};
