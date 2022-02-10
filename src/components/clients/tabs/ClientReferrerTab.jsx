import React, { useEffect, useMemo, useState } from "react";
import { DesktopDatePicker, LocalizationProvider, TabPanel } from "@mui/lab";
import { Button, FormHelperText, Grid, Paper, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import esLocale from "date-fns/locale/es";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { getClientStatusList } from "../selectors/getClientStatusList";
import { getReferencePrograms } from "../../referencePrograms/selectors/getReferencePrograms";
import { useForm } from "../../customHooks/useForm";
import { useAnimatedStyle } from "../../customHooks/useAnimatedStyle";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

export const ClientReferrerTab = ({ formValues, index, handleInputChange, handleValueChange }) => {
	const statusList = getClientStatusList();

	const sortedRefPrograms = useMemo(() => {
		const rp = getReferencePrograms();
		const array = rp
			.slice()
			.sort((a, b) => a.programa.localeCompare(b.programa));
		return array;
	}, [getReferencePrograms]);

   /*
	const [
		formValues,
		handleInputChange,
		handleValueChange,
		handleCheckChange,
		handleComplexInputChange,
		reset,
	] = useForm({
		fechaMat: client?.fechaMat ? client?.fechaMat : "",
		idProgramaReferenciacion: client?.idProgramaReferenciacion
			? client.idProgramaReferenciacion
			: "",
		especialidad: client?.especialidad ? client.especialidad : "",
		numHijos: client?.numHijos ? client.numHijos : 0,
		idLifeMiles: client?.idLifeMiles ? client.idLifeMiles : "",
		estadoRef: client?.estadoRef ? client.estadoRef : "",
		referencia1: client?.referencia1 ? client.referencia1 : "",
	});
*/
	const {
		fechaMat,
		idProgramaReferenciacion,
		especialidad,
		numHijos,
		idLifeMiles,
		estadoRef,
		referencia1,
	} = formValues;

	return (
		<div>
			<TabPanel value={index} style={{ padding: "0" }}>
				<form className="form">
					<Grid container spacing={2}>
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
									onChange={handleInputChange}
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
									label="Id Life Miles"
									error={false}
									id="idLifeMiles"
									type="text"
									name="idLifeMiles"
									autoComplete="off"
									size="small"
									required
									value={idLifeMiles}
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
									onChange={handleInputChange}
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
									onChange={handleInputChange}
									className="form-control"
									disabled={false}
									minRows={5}
									maxRows={5}
									multiline={true}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>
					</Grid>
				</form>
			</TabPanel>
		</div>
	);
};
