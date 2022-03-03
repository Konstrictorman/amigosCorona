import React, { useMemo, useState, useEffect} from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useLocation, useNavigate } from "react-router";
import queryString from "query-string";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import {
	Button,
	FormControlLabel,
	FormHelperText,
	Grid,
	InputAdornment,
	MenuItem,
	Stack,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import PercentIcon from '@mui/icons-material/Percent';
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import "../../assets/styles/global.css";
import { useForm } from "../customHooks/useForm";

import { getBenefitById } from "./selectors/getBenefitById";
import { getReferencePrograms } from "../referencePrograms/selectors/getReferencePrograms";
import { CustomNumberFormat } from "../general/CustomNumberFormat";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

export const Benefit = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);
	const benefit = useMemo(() => getBenefitById(id), [id]);
	const programs = getReferencePrograms();

	const sortedPrograms = useMemo(() => {
		const array = programs
			.slice()
			.sort((a, b) => a.programa.localeCompare(b.programa));
		return array;      
      }
      , [programs]);

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/benefitsList",
	});

	const [formValues, handleInputChange, handleValueChange, handleCheckChange] =
		useForm({
			nivelBeneficio: benefit?.nivelBeneficio ? benefit.nivelBeneficio : "",
			descripcion: benefit?.descripcion ? benefit.descripcion : "",
			estado: benefit?.estado ? benefit.estado : "inactivo",
			flagDefecto: benefit?.flagDefecto ? benefit.flagDefecto : "",
			flagEnvEle: benefit?.flagEnvEle ? benefit.flagEnvEle : "",
			frecuenciaComp: benefit?.frecuenciaComp ? benefit.frecuenciaComp : 0,
			idProgramaReferenciacion: benefit?.idProgramaReferenciacion
				? benefit.idProgramaReferenciacion
				: "",
			numMesesCom: benefit?.numMesesCom ? benefit.numMesesCom : 0,
			numMesesVigencia: benefit?.numMesesVigencia
				? benefit.numMesesVigencia
				: 0,
			pctValInicial: benefit?.pctValInicial ? benefit.pctValInicial : 0,
			pctValNormal: benefit?.pctValNormal ? benefit.pctValNormal : 0,
			pctValPropio: benefit?.pctValPropio ? benefit.pctValPropio : 0,
			valMaxmo: benefit?.valMaxmo ? benefit.valMaxmo : 0,
			valMinRedencion: benefit?.valMinRedencion
				? benefit.valMinRedencion
				: 0,
			valMinimo: benefit?.valMinimo ? benefit.valMinimo : 0,
		});

	const {
		nivelBeneficio,
		descripcion,
		flagDefecto,
		flagEnvEle,
		frecuenciaComp,
		idProgramaReferenciacion,
		numMesesCom,
		numMesesVigencia,
		pctValInicial,
		pctValNormal,
		pctValPropio,
		valMaxmo,
		valMinRedencion,
		valMinimo,
	} = formValues;

	const [activo, setActivo] = useState(benefit?.estado==='activo'?true:false);

	const handleChange = (e) => {
		setActivo(e.target.checked);
	};

	useEffect(() => {
  		handleValueChange("estado", activo ? "activo" : "inactivo");
	}, [activo]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formValues);
	};

   const getProgramDescription = (id) => {
      return sortedPrograms.find(p => p.id === idProgramaReferenciacion).descripcion;
   }

	return (
		<div
			className={
				"d-flex flex-column container animate__animated " + animatedStyle
			}
		>
			<h4 className="title align-self-center" style={{ width: "80%" }}>
				Nivel de beneficios {benefit?.id ? benefit.nivelBeneficio : "nuevo"}
			</h4>
			<div
				className="align-self-center"
				style={{
					width: "80%",
				}}
			>
				<form
					className="form border border-primary rounded"
					onSubmit={handleSubmit}
				>
					<Grid container spacing={2}>
						<Grid item xs={8}>
							<Item>
								<TextField
									label="Nivel de beneficios"
									error={false}
									id="nivelBeneficio"
									type="text"
									name="nivelBeneficio"
									autoComplete="off"
									size="small"
									required
									value={nivelBeneficio}
									onChange={handleInputChange}
									className="form-control"
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>
						<Grid item xs={4}>
							<div className="center">
								<Stack
									direction="row"
									spacing={1}
									alignItems="center"
									className="center"
								>
									<Typography>Inactivo</Typography>
									<Switch
										className="center"
										checked={activo}
										onChange={handleChange}
										inputProps={{ "aria-label": "controlled" }}
									/>
									<Typography>Activo</Typography>
								</Stack>
							</div>
						</Grid>                  

						<Grid item xs={12}>
							<Item>
								<TextField
									label="Descripción"
									error={false}
									id="descripcion"
									type="text"
									name="descripcion"
									autoComplete="off"
									size="small"
									required
									value={descripcion}
									onChange={handleInputChange}
									className="form-control"
									minRows={3}
									maxRows={3}
									multiline={true}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
								<TextField
									label="Programa"
									error={false}
									id="idProgramaReferenciacion"
									select
									name="idProgramaReferenciacion"
									size="small"
									value={idProgramaReferenciacion}
									onChange={handleInputChange}
									className="form-control"
									required
								>
									<MenuItem value="">...</MenuItem>
									{sortedPrograms.map((sp) => (
										<MenuItem key={sp.id} value={sp.id}>
											{sp.programa}
										</MenuItem>
									))}
								</TextField>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>
                  <Grid item xs={8}>
                     <Typography variant="body2" className="left-align">
                        {idProgramaReferenciacion? getProgramDescription(idProgramaReferenciacion): ''}
                     </Typography>
                     
                  </Grid>
                  <Grid item xs={12}>
                     <PercentIcon color="primary"/>
                     <Typography variant="caption" className="left-align">
                        Porcentajes asignados por ventas
                     </Typography>                     
                  </Grid>
						<Grid item xs={4} className="grid-item-noPadding">
							<Item>
								<TextField
									label="Por venta inicial"
									error={false}
									id="pctValInicial"
									type="number"
									name="pctValInicial"
									autoComplete="off"
									size="small"
									required
									value={pctValInicial}
									onChange={handleInputChange}
									className="form-control"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												%
											</InputAdornment>
										),
									}}                           
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>
						<Grid item xs={4} className="grid-item-noPadding">
							<Item>
								<TextField
									label="Por ventas referenciadas"
									error={false}
									id="pctValNormal"
									type="number"
									name="pctValNormal"
									autoComplete="off"
									size="small"
									required
									value={pctValNormal}
									onChange={handleInputChange}
									className="form-control"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												%
											</InputAdornment>
										),
									}}                           
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>
						<Grid item xs={4} className="grid-item-noPadding">
							<Item>
								<TextField
									label="Por ventas propias"
									error={false}
									id="pctValPropio"
									type="number"
									name="pctValPropio"
									autoComplete="off"
									size="small"
									required
									value={pctValPropio}
									onChange={handleInputChange}
									className="form-control"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												%
											</InputAdornment>
										),
									}}                           
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>          
						<Grid item xs={4}>
							<Item>
                     <TextField
									label="Monto mínimo redención"
									error={false}
									id="valMinRedencion"
									name="valMinRedencion"
									autoComplete="off"
									size="small"
									required
									value={valMinRedencion}
									onChange={handleInputChange}
									className="form-control"
									InputProps={{
                              inputComponent: CustomNumberFormat,
										startAdornment: (
											<InputAdornment position="start">
												$
											</InputAdornment>
										),                              
									}}                           
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid> 
						<Grid item xs={4}>
							<Item>
								<TextField
									label="Periodo vigencia (meses)"
									error={false}
									id="numMesesVigencia"
									type="number"
									name="numMesesVigencia"
									autoComplete="off"
									size="small"
									required
									value={numMesesVigencia}
									onChange={handleInputChange}
									className="form-control"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												#
											</InputAdornment>
										),
									}}                           
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid> 
						<Grid item xs={4}/>                                                                                            
                  <Grid item xs={4}>
							<Item>
								<TextField
									label="Frecuencia de compras"
									error={false}
									id="frecuenciaComp"
									type="number"
									name="frecuenciaComp"
									autoComplete="off"
									size="small"
									required
									value={frecuenciaComp}
									onChange={handleInputChange}
									className="form-control"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												#
											</InputAdornment>
										),
									}}                           
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>     
						<Grid item xs={8} className=" left-align">
							<FormControlLabel
								className=""
								control={
									<Switch
										id="flagDefecto"
										name="flagDefecto"
										checked={flagDefecto}
										onChange={handleCheckChange}
									/>
								}
								labelPlacement="start"
								label="Plan inicial del programa"
							/>
						</Grid>    
                  <Grid item xs={4}>
							<Item>
								<TextField
									label="Periodo compras (meses)"
									error={false}
									id="numMesesCom"
									type="number"
									name="numMesesCom"
									autoComplete="off"
									size="small"
									required
									value={numMesesCom}
									onChange={handleInputChange}
									className="form-control"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												#
											</InputAdornment>
										),
									}}                           
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>     
						<Grid item xs={8} className=" left-align">
							<FormControlLabel
								className=""
								control={
									<Switch
										id="flagEnvEle"
										name="flagEnvEle"
										checked={flagEnvEle}
										onChange={handleCheckChange}
									/>
								}
								labelPlacement="start"
								label="Envío electrónico de dinero"
							/>
						</Grid>        
						<Grid item xs={6}>
							<Item>
								<TextField
									label="Monto mínimo total compra"
									error={false}
									id="valMinimo"
									name="valMinimo"
									autoComplete="off"
									size="small"
									required
									value={valMinimo}
									onChange={handleInputChange}
									className="form-control"
									InputProps={{
                              inputComponent: CustomNumberFormat,
										startAdornment: (
											<InputAdornment position="start">
												$
											</InputAdornment>
										),                              
									}}                         
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid> 
						<Grid item xs={6}>
							<Item>
								<TextField
									label="Monto máximo total compra"
									error={false}
									id="valMaxmo"
									name="valMaxmo"
									autoComplete="off"
									size="small"
									required
									value={valMaxmo}
									onChange={handleInputChange}
									className="form-control"
									InputProps={{
                              inputComponent: CustomNumberFormat,
										startAdornment: (
											<InputAdornment position="start">
												$
											</InputAdornment>
										),                              
									}}                          
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
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
