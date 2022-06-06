import React, { useEffect, useMemo, useRef, useState } from "react";
import { DesktopDatePicker, LocalizationProvider, TabPanel } from "@mui/lab";
import { FormHelperText, Grid, Paper, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import esLocale from "date-fns/locale/es";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { getReferencePrograms } from "../../referencePrograms/selectors/getReferencePrograms";
import { FieldsComboBox } from "../../fields/FieldsComboBox";
import { Spinner } from "../../general/Spinner";
import { ERROR_MSG, INPUT_TYPE } from "../../../config/config";
import Swal from "sweetalert2";
import { getProgramsWithSpecialties } from "../../fields/selectors/getProgramsWithSpecialties";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

export const ClientReferrerTab = ({ formValues, index, handleInputChange, handleValueChange }) => {

   const [loading, setLoading] = useState(false);
   const [programs, setPrograms] = useState([]);
   const [specialties, setSpecialties] = useState([]);
   const componentMounted = useRef(true);
   

   const {
		fechaMat,
		idProgramaReferenciacion,
		especialidad,
		numHijos,
		idLifeMiles,
		estadoRef,
		referencia1,
	} = formValues?formValues:{};

   const idProgramaReferenciacionRef = useRef(idProgramaReferenciacion);

   useEffect(() => {
      const getPrograms = async () => {
         setLoading(true);
         try {
            const progs = await getProgramsWithSpecialties();

            if (componentMounted.current) {
               setPrograms(progs);
               //console.log("ref:",idProgramaReferenciacionRef);
               const p = progs?.find((p) => p.twinId === idProgramaReferenciacionRef.current);
               setSpecialties(p?.specs);

            }
			} catch (e) {
				console.log(e);
				Swal.fire(
					"Error",
					e.message + ` - ${ERROR_MSG}`,
					"error"
				);
			}         
         setLoading(false);
         
      };
      
      getPrograms();
		return () => {
			componentMounted.current = false;
         idProgramaReferenciacionRef.current = null;
			setLoading(null);
		};      
   }, []);

   if (loading) {
		return <Spinner />;
	}

   const handleChange = (evt) => {
      handleValueChange(evt);
      const newId = evt.target.value;

      const p = programs?.find((p) => p.twinId?.toString() === newId?.toString());


      setSpecialties(p?.specs);
   }

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
                                    variant={INPUT_TYPE}
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
									onChange={handleChange}
									className="form-control"
									disabled={false}
									required
									SelectProps={{
										native: true,
									}}
                           variant={INPUT_TYPE}
								>
									<option value="">...</option>
									{programs?.map((program) => (
										<option key={program.id} value={program.twinId}>
											{program.descripcion}
										</option>
									))}
								</TextField>                       
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>
                     <TextField
									select
									label="Especialidad"
									error={false}
									id="especialidad"
									type="text"
									name="especialidad"
									size="small"
									value={especialidad}
									onChange={handleInputChange}
									className="form-control"
									disabled={false}
									required
									SelectProps={{
										native: true,
									}}
                           variant={INPUT_TYPE}
								>
									<option value="">...</option>
									{specialties?.map((spec) => (
										<option key={spec.id} value={spec.valor}>
											{spec.descripcion}
										</option>
									))}
								</TextField>  
                      
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
                           variant={INPUT_TYPE}
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
                           variant={INPUT_TYPE}
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={4}>
							<Item>

                     <FieldsComboBox
										id="estadoRef"
										label="Estado"
										value={estadoRef}
										type="estadosReferido"
										handleChange={handleInputChange}
                              valueType="valor"
									/>       
              
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
                           variant={INPUT_TYPE}
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
