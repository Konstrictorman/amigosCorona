import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { useForm } from "../customHooks/useForm";
import queryString from "query-string";
import { getClientById } from "./selectors/getClientById";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import esLocale from "date-fns/locale/es";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";

import {
	Button,
	FormHelperText,
	Grid,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { NoRowsOverlay } from "../general/NoRowsOverlay";
import { getDocumentTypes } from "../documentTypes/selectors/getDocumentTypes";
import { getClientAddressColumns } from "./selectors/getClientAddressColumns";
import { getClientMailColumns } from "./selectors/getClientMailColumns";
import { getClientPhoneColumns } from "./selectors/getClientPhoneColumns";
import { getReferrerLevelColumns } from "./selectors/getReferrerLevelColumns";
import { DesktopDatePicker, TimelineOppositeContent } from "@mui/lab";
import { getReferencePrograms } from "../referencePrograms/selectors/getReferencePrograms";
import { getClientStatusList } from "./selectors/getClientStatusList";
import { getReferrerLevelsByClientId } from "./selectors/getReferrerLevelsByClientId";
import { getStatusHistoryColumns } from "./selectors/getStatusHistoryColumns";
import { getStatusHistoryByClientId } from "./selectors/getStatusHistoryByClientId";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

export const Client = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);
	const cliente = useMemo(() => getClientById(id), [id]);
	const phoneColumns = getClientPhoneColumns();
	const addressColumns = getClientAddressColumns();
	const mailColumns = getClientMailColumns();
	const statusList = getClientStatusList();
	const docTypeSelect = getDocumentTypes();
	const referrerLevelColumns = getReferrerLevelColumns();
	const referrerLevels = useMemo(() => getReferrerLevelsByClientId(id), [id]);
   const statusHistoryColumns = getStatusHistoryColumns();
   const statusHistory = useMemo(() => getStatusHistoryByClientId(id), [id]);

	const sortedRefPrograms = useMemo(() => {
		const rp = getReferencePrograms();
		const array = rp
			.slice()
			.sort((a, b) => a.programa.localeCompare(b.programa));
		return array;
	}, [getReferencePrograms]);

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/clientList",
	});

	const [
		formValues,
		handleInputChange,
		handleValueChange,
		handleCheckChange,
		handleComplexInputChange,
	] = useForm({
		codigoCliente: cliente?.codigoCliente ? cliente.codigoCliente : "",
		documento: cliente?.documento ? cliente.documento : "",
		primerApellido: cliente?.primerApellido ? cliente.primerApellido : "",
		primerNombre: cliente?.primerNombre ? cliente.primerNombre : "",
		segundoApellido: cliente?.segundoApellido ? cliente.segundoApellido : "",
		segundoNombre: cliente?.segundoNombre ? cliente.segundoNombre : "",
		telefonosCliente: cliente?.telefonosCliente
			? cliente.telefonosCliente
			: [],
		direccionesCliente: cliente?.direccionesCliente
			? cliente.direccionesCliente
			: [],
		tipoDocumento: cliente?.tipoDocumento ? cliente.tipoDocumento : "",
		emailsCliente: cliente?.emailsCliente ? cliente.emailsCliente : [],
		referenciador: cliente?.referenciador ? cliente.referenciador : {},
	});

	const {
		codigoCliente,
		documento,
		primerApellido,
		primerNombre,
		segundoApellido,
		segundoNombre,
		telefonosCliente,
		direccionesCliente,
		tipoDocumento,
		emailsCliente,
		referenciador: {
			especialidad,
			estadoRef,
			fechaMat,
			referencia1,
			idProgramaReferenciacion,
			numHijos,
			fechaCreacion,
			fechaModificacion,
			usuarioCreacion,
			usuarioModificacion,
		},
	} = formValues;

	//const  = referenciador;

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formValues);
	};

	return (
		<div
			className={
				"d-flex flex-column container animate__animated " + animatedStyle
			}
		>
			<h4 className="title align-self-center" style={{ width: "90%" }}>
				Cliente {cliente.codigoCliente}
			</h4>
			<div
				className="align-self-center"
				style={{
					width: "90%",
				}}
			>
				<form
					className="form border border-primary rounded"
					onSubmit={handleSubmit}
				>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<Item>
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
									disabled={true}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Tipo documento"
									error={false}
									id="tipoDocumento"
									type="text"
									name="tipoDocumento"
									size="small"
									value={tipoDocumento}
									onChange={handleInputChange}
									className="form-control"
									disabled={true}
								></TextField>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>
						<Grid item xs={4}>
							<Item>
								<TextField
									label="Número de documento"
									error={false}
									id="documento"
									type="text"
									name="documento"
									autoComplete="off"
									size="small"
									value={documento}
									onChange={handleInputChange}
									className="form-control"
									disabled={true}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>
						<Grid item xs={3}>
							<Item>
								<TextField
									label="Primer nombre"
									error={false}
									id="primerNombre"
									type="text"
									name="primerNombre"
									autoComplete="off"
									size="small"
									value={primerNombre}
									onChange={handleInputChange}
									className="form-control"
									disabled={true}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>
						<Grid item xs={3}>
							<Item>
								<TextField
									label="Segundo nombre"
									error={false}
									id="segundoNombre"
									type="text"
									name="segundoNombre"
									autoComplete="off"
									size="small"
									value={segundoNombre}
									onChange={handleInputChange}
									className="form-control"
									disabled={true}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>
						<Grid item xs={3}>
							<Item>
								<TextField
									label="Primer apellido"
									error={false}
									id="primerApellido"
									type="text"
									name="primerApellido"
									autoComplete="off"
									size="small"
									required
									value={primerApellido}
									onChange={handleInputChange}
									className="form-control"
									disabled={true}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>
						<Grid item xs={3}>
							<Item>
								<TextField
									label="Segundo Apellido"
									error={false}
									id="segundoApellido"
									type="text"
									name="segundoApellido"
									autoComplete="off"
									size="small"
									required
									value={segundoApellido}
									onChange={handleInputChange}
									className="form-control"
									disabled={true}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>
						<Grid item xs={12}>
							<LocalPhoneIcon color="primary" />
							<Typography variant="caption" className="left-align">
								Teléfonos
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<div className="center">
								<DataGrid
									className="rounded border-primary"
									getRowId={(r) => r.idTelefono}
									rows={telefonosCliente}
									columns={phoneColumns}
									pageSize={5}
									checkboxSelection={false}
									density="compact"
									autoHeight={true}
									autoPageSize={true}
									components={{
										NoRowsOverlay: NoRowsOverlay,
									}}
									disableSelectionOnClick={true}
									disableColumnMenu={true}
								/>
							</div>
						</Grid>

                  <Grid item xs={12}/>                  
						<Grid item xs={12}>
							<LocationOnIcon color="primary" />
							<Typography variant="caption" className="left-align">
								Direcciones
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<div className="center">
								<DataGrid
									className="rounded border-primary"
									getRowId={(r) => r.idDireccion}
									rows={direccionesCliente}
									columns={addressColumns}
									pageSize={5}
									checkboxSelection={false}
									density="compact"
									autoHeight={true}
									autoPageSize={true}
									components={{
										NoRowsOverlay: NoRowsOverlay,
									}}
									disableSelectionOnClick={true}
									disableColumnMenu={true}
								/>
							</div>
						</Grid>

                  <Grid item xs={12}/>                  
						<Grid item xs={12}>
							<EmailIcon color="primary" />
							<Typography variant="caption" className="left-align">
								Correos electrónicos
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<div className="center">
								<DataGrid
									className="rounded border-primary"
									getRowId={(r) => r.idMail}
									rows={emailsCliente}
									columns={mailColumns}
									pageSize={5}
									checkboxSelection={false}
									density="compact"
									autoHeight={true}
									autoPageSize={true}
									components={{
										NoRowsOverlay: NoRowsOverlay,
									}}
									disableSelectionOnClick={true}
									disableColumnMenu={true}
									onCellClick={() => false}
									isCellEditable={() => false}
								/>
							</div>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<LocalizationProvider
									dateAdapter={AdapterDateFns}
									locale={esLocale}
								>
									<DesktopDatePicker
										label="Fecha de matrícula"
										id="fechaMat"
										value={fechaMat}
										minDate={new Date()}
										onChange={(newValue) => {
											handleValueChange("fechaMat", newValue);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												size="small"
												required
												className="form-control"
												error={false}
											/>
										)}
										disabled={false}
									/>
								</LocalizationProvider>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									select
									label="Programa referenciación"
									error={false}
									id="idProgramaReferenciacion"
									type="text"
									name="idProgramaReferenciacion"
									size="small"
									value={idProgramaReferenciacion}
									//onChange={handleInputChange}
									onChange={(e) => {
										handleComplexInputChange(e, "referenciador");
									}}
									className="form-control"
									disabled={false}
									SelectProps={{
										native: true,
									}}
								>
									<option value="">...</option>
									{sortedRefPrograms.map((rp) => (
										<option key={rp.id} value={rp.id}>
											{rp.programa}
										</option>
									))}
								</TextField>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Especialidad"
									error={false}
									id="especialidad"
									type="text"
									name="especialidad"
									autoComplete="off"
									size="small"
									required
									value={especialidad}
									onChange={handleInputChange}
									className="form-control"
									disabled={false}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="# de hijos"
									error={false}
									id="numHijos"
									type="number"
									name="numHijos"
									autoComplete="off"
									size="small"
									required
									value={numHijos}
									onChange={(e) => {
										handleComplexInputChange(e, "referenciador");
									}}
									className="form-control"
									disabled={false}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Id Life Miles"
									error={false}
									id="referencia1"
									type="text"
									name="referencia1"
									autoComplete="off"
									size="small"
									required
									value={referencia1}
									onChange={handleInputChange}
									className="form-control"
									disabled={false}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									select
									label="Estado"
									error={false}
									id="estadoRef"
									type="text"
									name="estadoRef"
									size="small"
									value={estadoRef}
									onChange={(e) => {
										handleComplexInputChange(e, "referenciador");
									}}
									className="form-control"
									disabled={false}
									required
									SelectProps={{
										native: true,
									}}
								>
									<option value="">...</option>
									{statusList.map((status) => (
										<option key={status.label} value={status.value}>
											{status.label}
										</option>
									))}
								</TextField>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={12}>
							<Item>
								<TextField
									label="Referencias"
									error={false}
									id="referencia1"
									type="text"
									name="referencia1"
									autoComplete="off"
									size="small"
									required
									value={referencia1}
									onChange={(e) => {
										handleComplexInputChange(e, "referenciador");
									}}
									className="form-control"
									disabled={false}
									minRows={5}
									maxRows={5}
									multiline={true}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={12} />
						<Grid item xs={12}>
							<HistoryToggleOffIcon color="primary" />
							<Typography variant="caption" className="left-align">
								Hisotrial de estados
							</Typography>
						</Grid>

						<Grid item xs={12}>
							<div className="center">
								<DataGrid
									className="rounded border-warning"
									rows={statusHistory}
									columns={statusHistoryColumns}
									pageSize={5}
									checkboxSelection={false}
									density="compact"
									autoHeight={true}
									autoPageSize={true}
									components={{
										NoRowsOverlay: NoRowsOverlay,
									}}
								/>
							</div>
						</Grid>                  

                  <Grid item xs={12}/>
						<Grid item xs={12}>
							<EmojiEventsIcon color="primary" />
							<Typography variant="caption" className="left-align">
								Niveles de beneficios
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<div className="center">
								<DataGrid
									className="rounded border-warning"
									rows={referrerLevels}
									columns={referrerLevelColumns}
									pageSize={5}
									checkboxSelection={false}
									density="compact"
									autoHeight={true}
									autoPageSize={true}
									components={{
										NoRowsOverlay: NoRowsOverlay,
									}}
								/>
							</div>
						</Grid>


                  <Grid item xs={12}/>
						<Grid container spacing={2} className="grid-container">
							<Grid item xs={12}>
								<LocationSearchingIcon color="primary" />
								<Typography variant="caption" className="left-align">
									Auditoría
								</Typography>
							</Grid>

							<Grid item xs={6} className="grid-item">
								<Item className="half-quarter-width right">
									<TextField
										label="Añadido por"
										error={false}
										id="usuarioCreacion"
										type="text"
										name="usuarioCreacion"
										autoComplete="off"
										size="small"
										value={usuarioCreacion}
										onChange={handleInputChange}
										className="form-control"
										disabled={true}
									/>
								</Item>
							</Grid>
							<Grid item xs={6} className="grid-item-rightPadding">
								<Item className="half-quarter-width ">
									<LocalizationProvider
										dateAdapter={AdapterDateFns}
										locale={esLocale}
									>
										<DesktopDatePicker
											label="Fecha de creación"
											id="fechaCreacion"
											value={fechaCreacion}
											minDate={new Date()}
											disabled={true}
											onChange={() => {}}
											renderInput={(params) => (
												<TextField
													{...params}
													size="small"
													required
													className="form-control"
													error={false}
												/>
											)}
										/>
									</LocalizationProvider>
								</Item>
							</Grid>

							<Grid item xs={6} className="grid-item">
								<Item className="half-quarter-width right">
									<TextField
										label="Modificado por"
										error={false}
										id="usuarioModificacion"
										type="text"
										name="usuarioModificacion"
										autoComplete="off"
										size="small"
										value={usuarioModificacion}
										onChange={handleInputChange}
										className="form-control"
										disabled={true}
									/>
								</Item>
							</Grid>
							<Grid item xs={6} className="grid-item-rightPadding">
								<Item className="half-quarter-width ">
									<LocalizationProvider
										dateAdapter={AdapterDateFns}
										locale={esLocale}
									>
										<DesktopDatePicker
											label="Fecha de modificación"
											id="fechaModificacion"
											value={fechaModificacion}
											minDate={new Date()}
											disabled={true}
											onChange={() => {}}
											renderInput={(params) => (
												<TextField
													{...params}
													size="small"
													required
													className="form-control"
													error={false}
												/>
											)}
										/>
									</LocalizationProvider>
								</Item>
							</Grid>
						</Grid>
					</Grid>
				</form>
				<div>
					<Button
						color="error"
						variant="contained"
						className="mt-3 mx-2"
						startIcon={<ClearIcon />}
						style={{ textTransform: "none" }}
						onClick={handleClickOut}
					>
						Cancelar
					</Button>
					<Button
						color="primary"
						variant="contained"
						className="mt-3 mx-2"
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
