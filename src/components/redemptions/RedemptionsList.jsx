import React, { useMemo, useState } from "react";
import {
	Autocomplete,
	Button,
	FormHelperText,
	Grid,
	MenuItem,
	Paper,
	Tab,
	TextField,
	Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { getRedemptions } from "./selectors/getRedemptions";
import { useForm } from "../customHooks/useForm";
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
import { getSalesPoints } from "../salesPoint/selectors/getSalesPoints";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

const StyledTabs = withStyles({
	indicator: {
		backgroundColor: "orange",
	},
})(TabList);

export const RedemptionsList = () => {
	const navigate = useNavigate();
	const [tabIndex, setTabIndex] = useState("0");
	const [rows, setRows] = useState([]);
	const salesPoints = getSalesPoints();

	const sortedSalesPoints = useMemo(() => {
		const array = salesPoints
			.slice()
			.sort((a, b) => a.name.localeCompare(b.name));

		let options = [];
		array.map((i) => {
			let obj = {};
			obj["id"] = i.id;
			obj["label"] = i.name;
			options.push(obj);
		});
		return options;
	}, [salesPoints]);

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
	] = useForm({
		idCliente: "",
		puntoDeVenta: "",
		fechaInicial: "",
		fechaFinal: "",
	});

	const { idCliente, puntoDeVenta, fechaInicial, fechaFinal } = formValues;

	const handleSubmit = (e) => {
		e.preventDefault();
		search();
	};

	const handleTabChange = (e, newValue) => {
		setTabIndex(newValue);
		/*
      if (newValue === "1") {
         setcolumns(getRedemptionAuditColumns());
      } else {
         setcolumns(getRedemptionBasicColumns());
      }
      */
	};

	const handleClick = (params) => {
		const { field, row } = params;
		if (field === "revertir") {
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
					className="form border border-primary rounded"
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
											/>
										)}
										disabled={false}
									/>
								</LocalizationProvider>
							</Item>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<Autocomplete
									disablePortal
									id="puntoDeVenta"
									options={sortedSalesPoints}
									renderInput={(params) => (
										<TextField
											{...params}
											className="form-control"
											size="small"
											label="Punto de venta"
											onChange={handleInputChange}
											value={puntoDeVenta}
											required
										/>
									)}
								/>
							</Item>
						</Grid>

						<Grid item xs={3}>
							<Item className="">
								<TextField
									label="Id cliente"
									error={false}
									id="idCliente"
									type="text"
									name="idCliente"
									autoComplete="off"
									size="small"
									value={idCliente}
									onChange={handleInputChange}
									className="form-control"
									disabled={false}
								/>
							</Item>
						</Grid>

						<Grid item xs={12}>
							<div>
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
								<Button
									className="mt-3 mx-2"
									color="secondary"
									variant="contained"
									style={{ textTransform: "none" }}
									startIcon={<SellIcon />}
									onClick={handleClickCreate}
								>
									Crear nueva redención
								</Button>
								<Button
									color="error"
									variant="contained"
									className="mt-3 mx-2"
									startIcon={<CleaningServicesIcon />}
									style={{ textTransform: "none" }}
									onClick={clear}
								>
									Limpiar
								</Button>
								<Button
									color="primary"
									variant="contained"
									className="mt-3 mx-2"
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
							className="align-self-center dataTableContainer "
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
										icon={<ArticleIcon />}
										wrapped
									/>
									<Tab
										value="1"
										label="Auditoría"
										style={{ textTransform: "none" }}
										icon={<LocationSearchingIcon />}
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
