import React, { useEffect, useMemo, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { Autocomplete, Button, Grid, Paper, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { getSalesPoints } from "../salesPoint/selectors/getSalesPoints";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { useForm } from "../customHooks/useForm";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import esLocale from "date-fns/locale/es";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { getReferencePrograms } from "../referencePrograms/selectors/getReferencePrograms";
import { getClients } from "../clients/selectors/getClients";
import { getSalesPointsForCombo } from "../salesPoint/selectors/getSalesPointsForCombo";
import { Spinner } from "../general/Spinner";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

export const RecordMovement = () => {
	const navigate = useNavigate();
   const refPrograms = getReferencePrograms();
   const clientes = getClients();
   const [loading, setLoading] = useState(false);
   const [sortedSalesPoints, setSortedSalesPoints] = useState([]);
   const componentMounted = useRef(true);

   useEffect(() => {
      const getSalesPointsList = async () => {
			setLoading(true);
			const sps = await getSalesPointsForCombo();

			if (componentMounted.current) {
				setSortedSalesPoints(sps);
			}
			setLoading(false);
		};
   
		getSalesPointsList();
		return () => {
			componentMounted.current = false;
			setLoading(null);
		};

   }, []);

	const sortedRefPrograms = useMemo(() => {
		const array = refPrograms
			.slice()
			.sort((a, b) => a.programa.localeCompare(b.programa));

		let options = [];
		array.map((i) => {
			let obj = {};
			obj["id"] = i.id;
			obj["label"] = i.programa;
			options.push(obj);
         return null;
		});
		return options;
	}, [refPrograms]);   

	const sortedClients = useMemo(() => {
		const array = clientes
			.slice()
			.sort((a, b) => a.codigoCliente.localeCompare(b.codigoCliente));

		let options = [];
		array.map((i) => {
			let obj = {};
			obj["id"] = i.id;
			obj["label"] = i.codigoCliente;
			options.push(obj);
         return null;
		});
		return options;
	}, [clientes]);      



	const [
		formValues,
		handleInputChange,
		handleValueChange,
	] = useForm({
		idProceso: "",
		puntoDeVenta: "",
		fechaInicial: null,
		fechaFinal: null,
		programaRef: "",
		codeRef: "",
	});

	const {
		idProceso,
		puntoDeVenta,
		fechaInicial,
		fechaFinal,
		programaRef,
		codeRef,
	} = formValues;

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/home",
	});

	if (loading) {
		return <Spinner />;
	}   

	return (
		<div
      className={" d-flex flex-column   animate__animated " + animatedStyle}
			style={{
				width: "100%",
			}}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Registrar movimientos
			</h4>
			<div>
				<form
					className="container__form"
					onSubmit={handleSubmit}
				>
					<Grid container spacing={2} rowSpacing={1}>
						<Grid item xs={6}>
							<Item className="half-quarter-width right">
								<TextField
									label="Id proceso"
									error={false}
									id="idProceso"
									type="text"
									name="idProceso"
									autoComplete="off"
									size="small"
									value={idProceso}
									onChange={handleInputChange}
									className="form-control"
									disabled={true}
								/>
							</Item>
						</Grid>

						<Grid item xs={6}>
							<Item className="half-quarter-width">
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

						<Grid item xs={6}>
							<Item className="half-width right">
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

						<Grid item xs={6}>
							<Item className="half-width">
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

						<Grid item xs={6}>
							<Item className="half-quarter-width right">
								<Autocomplete
									disablePortal
									id="programaRef"
									options={sortedRefPrograms}
									renderInput={(params) => (
										<TextField
											{...params}
											className="form-control"
											size="small"
											label="Programa referenciación"
											onChange={handleInputChange}
											value={programaRef}
											required
										/>
									)}
								/>
							</Item>
						</Grid>

						<Grid item xs={6}>
							<Item className="half-quarter-width">
								<Autocomplete
									disablePortal
									id="codeRef"
									options={sortedClients}
									renderInput={(params) => (
										<TextField
											{...params}
											className="form-control"
											size="small"
											label="Código referenciador"
											onChange={handleInputChange}
											value={codeRef}
											required
										/>
									)}
								/>
							</Item>
						</Grid>
					</Grid>
				</form>

				<div>
					<Button
						
						variant="contained"
						className="mt-3 mx-2 btn-error"
						startIcon={<ClearIcon />}
						style={{ textTransform: "none" }}
						onClick={handleClickOut}
					>
						Cancelar
					</Button>
					<Button
						
						variant="contained"
						className="mt-3 mx-2 btn-primary"
						startIcon={<CheckIcon />}
						style={{ textTransform: "none" }}
						type="submit"
						onClick={handleSubmit}
					>
						Guardar
					</Button>
				</div>            
			</div>
		</div>
	);
};
