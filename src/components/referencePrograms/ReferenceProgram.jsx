import React, { useMemo, useState, useCallback } from "react";
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
import { useSelector } from "react-redux";
import { FieldsComboBox } from "../fields/FieldsComboBox";

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
   const [activeSalesPoints, setActiveSalesPoints] = useState([]);
   const [editRowsModel, setEditRowsModel] = useState({});
   const items = useSelector((state) => state.lists.periodos);

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
      handleValueChange("estado", e.target.checked ? "activo":"inactivo");
	};


	const handleSubmit = (e) => {
		e.preventDefault();
     // console.log(JSON.stringify(activeSalesPoints));
	};

	return (
		<div
			className={
				"d-flex flex-column container animate__animated " + animatedStyle
			}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Programa de referenciación{" "}
				{refProgram?.id ? refProgram.programa : "nuevo"}
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
                           <FieldsComboBox
										id="tipoPeriodo"
										index="2"
										label="Periodo"
										value={tipoPeriodo}
										items={items}
										handleChange={handleInputChange}
									/>
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
									className="container__dataTable"
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
{                           
                  (programaEstados.length > 0 &&
						<Grid item xs={12}>
							<div className="center half-quarter-width">
								<DataGrid
									className="container__dataTable2"
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
						</Grid>)
}                  
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
