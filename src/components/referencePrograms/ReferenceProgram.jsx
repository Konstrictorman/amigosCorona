import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import queryString from "query-string";
import { getReferenceProgramById } from "./selectors/getReferenceProgramById";
import { getReferenceProgramPeriodSelect } from "./selectors/getReferenceProgramPeriodSelect";
import { getReferenceProgramStateColumns } from "./selectors/getReferenceProgramStateColumns";
import { getReferenceProgramSalesPointColumns} from "./selectors/getReferenceProgramSalesPointColumns";
import { getReferenceProgramSalesPointById } from "./selectors/getReferenceProgramSalesPointById";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import {
	Button,
	FormHelperText,
	Grid,
	MenuItem,
	Paper,
	Stack,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import { useForm } from "../customHooks/useForm";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { NoRowsOverlay } from "../general/NoRowsOverlay";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

export const ReferenceProgram = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);
	const refProgram = useMemo(() => getReferenceProgramById(id), [id]);
	const periodValues = getReferenceProgramPeriodSelect();
	const stateColumns = getReferenceProgramStateColumns();
   const activeSalesPointColumns = getReferenceProgramSalesPointColumns();
   const [activeSalesPoints, setActiveSalesPoints] = useState(getReferenceProgramSalesPointById(id));
   const [editRowsModel, setEditRowsModel] = useState({});

   const handleEditRowsModelChange = useCallback((model) => {
      setEditRowsModel(model);
      const key = Object.keys(model)[0];
      if (key) {
         console.log("model: ", JSON.stringify(model[key]["flagActivo"]["value"]));
         const newActive = model[key]["flagActivo"]["value"];
         const asps = activeSalesPoints.map((asp) =>(
            asp.id === parseInt(key,10)? {...asp, flagActivo: newActive} : asp
         ));

         setActiveSalesPoints(asps);


         //Llamar a handleValueChange para pasar el valor de programaPuntoVentas
      }
      
    }, [activeSalesPoints]);


	const sortedPeriodValues = useMemo(() => {
		const array = periodValues.slice().sort((a, b) => a.label.localeCompare(b.label));
		return array;
   }, [periodValues]);

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/referenceProgramList",
	});

	const [formValues, handleInputChange, handleValueChange] =
		useForm({
			programa: refProgram?.programa ? refProgram.programa : "",
			descripcion: refProgram?.descripcion ? refProgram.descripcion : "",
			tipoPeriodo: refProgram?.tipoPeriodo ? refProgram.tipoPeriodo : "",
			estado: refProgram?.estado ? refProgram.estado : "",
			programaEstados: refProgram?.programaEstados
				? refProgram.programaEstados
				: [],
         programaPuntoVentas: refProgram?.programaPuntoVentas ? refProgram.programaPuntoVentas: [],
		});

	const { programa, descripcion, tipoPeriodo, programaEstados, estado } =
		formValues;

	const [activo, setActivo] = useState(estado==='activo'?true:false);

	const handleChange = (e) => {
		setActivo(e.target.checked);
	};

   useEffect(() => {
      handleValueChange("estado", activo ? "activo" : "inactivo");
 }, [activo]);

	const handleSubmit = (e) => {
		e.preventDefault();
      console.log(JSON.stringify(activeSalesPoints));
		console.log(formValues);
	};

	return (
		<div
			className={
				"d-flex flex-column container animate__animated " + animatedStyle
			}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Programa de referenciación{" "}
				{refProgram?.id ? refProgram.programa : "nueva"}
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
					<Grid container spacing={2}>
						<Grid item xs={8}>
							<Item>
								<TextField
									label="Nombre del programa de referenciación"
									error={false}
									id="programa"
									type="text"
									name="programa"
									autoComplete="off"
									size="small"
									required
									value={programa}
									onChange={handleInputChange}
									className="form-control"
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>
						<Grid item xs={4}>
							<Item>
								<TextField
									select
									label="Periodo"
									error={false}
									id="tipoPeriodo"
									type="text"
									name="tipoPeriodo"
									size="small"
									value={tipoPeriodo}
									onChange={handleInputChange}
									className="form-control"
								>
									<MenuItem value="">...</MenuItem>
									{sortedPeriodValues.map((sp) => (
										<MenuItem key={sp.value} value={sp.value}>
											{sp.label}
										</MenuItem>
									))}
								</TextField>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
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
									minRows={2}
									maxRows={2}
									multiline={true}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={12}>
							<div className="center">
								<DataGrid
									className="rounded border-primary"
									rows={activeSalesPoints}
									columns={activeSalesPointColumns}
									pageSize={5}
									checkboxSelection={false}
									density="compact"
									autoHeight={true}
									autoPageSize={true}
                           components={{
                              NoRowsOverlay: NoRowsOverlay,
                            }}     
                            
                            editRowsModel={editRowsModel}
                            onEditRowsModelChange={handleEditRowsModelChange}                                                  
                            
								/>
							</div>
						</Grid>                  

						<Grid item xs={12}>
							<div className="center">
								<Stack direction="row" spacing={1} alignItems="center"  className="center">
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
							<div className="center  half-quarter-width">
								<DataGrid
									className="rounded border-warning"
									getRowId={(r) => r.idProgramaEstado}
									rows={programaEstados}
									columns={stateColumns}
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
