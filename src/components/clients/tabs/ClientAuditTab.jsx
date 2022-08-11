import { TabPanel } from "@mui/lab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { Item } from "../../general/Item";
import { INPUT_TYPE } from "../../../config/config";
import { CustomDatePicker } from "../../general/CustomDatePicker";
import PersonIcon from '@mui/icons-material/Person';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export const ClientAuditTab = ({ client, index, handleClickOut }) => {
	return (
		<div>
			<TabPanel value={index} style={{ padding: "0" }}>
				<form>
					<Grid container spacing={2}>
						<Grid item xs={12} />
						<Grid item xs={6}>
							<Item className="half-width right">
								<TextField
									label="Creado por"
									id="userCreated"
									type="text"
									name="userCreated"
									size="small"
									value={client.usariosCreacion}
									className="form-control"
									variant={INPUT_TYPE}
                           disabled
                           InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon />
                                </InputAdornment>
                              ),              
                              }}                             
								></TextField>
							</Item>
						</Grid>

						<Grid item xs={6}>
							<Item className="half-width">
								<CustomDatePicker
									label="Fecha creación"
									id="fechaCreacion"
									value={client.fechaCreacion}
									disabled
								/>
							</Item>
						</Grid>

						<Grid item xs={6}>
							<Item className="half-width right">
								<TextField
									label="Actualizado por"
									id="userUpdated"
									type="text"
									name="userUpdated"
									size="small"
									value={client.usariosModificacion}
									className="form-control"
									variant={INPUT_TYPE}
                           disabled
                           InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonAddAltIcon />
                                </InputAdornment>
                              ),              
                              }}                            
								></TextField>
							</Item>
						</Grid>

						<Grid item xs={6}>
							<Item className="half-width">
								<CustomDatePicker
									label="Fecha actualización"
									id="fechaModificacion"
									value={client.fechaModificacion}
									disabled
								/>
							</Item>
						</Grid>
						<Grid item xs={12} />
					</Grid>
				</form>
				<div className="container__blank">
					<Button
						className="mt-3 mx-2 btn-warning"
						variant="contained"
						style={{ textTransform: "none" }}
						startIcon={<ArrowBackIcon />}
						onClick={handleClickOut}
					>
						Volver
					</Button>
				</div>
			</TabPanel>
		</div>
	);
};
