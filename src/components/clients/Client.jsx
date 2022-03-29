import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { useForm } from "../customHooks/useForm";
import queryString from "query-string";
import { getClientById } from "./selectors/getClientById";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import Box from "@mui/material/Box";
import { Button, Grid, Tab, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { TabContext, TabList } from "@mui/lab";
import { withStyles } from "@mui/styles";
import { ClientAuditTab } from "./tabs/ClientAuditTab";
import { ClientBenefitsTab } from "./tabs/ClientBenefitsTab";
import { ClientStateHistoryTab } from "./tabs/ClientStateHistoryTab";
import { ClientMailsTab } from "./tabs/ClientMailsTab";
import { ClientAddressTab } from "./tabs/ClientAddressTab";
import { ClientPhonesTab } from "./tabs/ClientPhonesTab";
import { ClientReferrerTab } from "./tabs/ClientReferrerTab";

const StyledTabs = withStyles({
	indicator: {
		backgroundColor: "orange",
	},
})(TabList);

export const Client = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);
	const client = useMemo(() => getClientById(id), [id]);

	const {
		primerNombre,
		segundoNombre,
		primerApellido,
		segundoApellido,
		tipoDocumento,
		documento,
	} = client;

	const [
		formValues,
		handleInputChange,
		handleValueChange,

	] = useForm({
		fechaMat: client?.referenciador?.fechaMat ? client?.referenciador?.fechaMat : "",
		idProgramaReferenciacion: client?.referenciador?.idProgramaReferenciacion
			? client.referenciador?.idProgramaReferenciacion
			: "",
		especialidad: client?.referenciador?.especialidad ? client.referenciador?.especialidad : "",
		numHijos: client?.referenciador?.numHijos ? client.referenciador?.numHijos : 0,
		idLifeMiles: client?.referenciador?.idLifeMiles ? client.referenciador?.idLifeMiles : "",
		estadoRef: client?.referenciador?.estadoRef ? client.referenciador?.estadoRef : "",
		referencia1: client?.referenciador?.referencia1 ? client.referenciador?.referencia1 : "",
	});
/*
	const {
		fechaMat,
		idProgramaReferenciacion,
		especialidad,
		numHijos,
		idLifeMiles,
		estadoRef,
		referencia1,
	} = formValues;   
*/
	const [tabIndex, setTabIndex] = useState("0");
	const [saveBtnEnabled, setsaveBtnEnabled] = useState(false);

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/clientList",
	});

	const handleTabChange = (e, newValue) => {
		setTabIndex(newValue);
		setsaveBtnEnabled(newValue === "0" ? true : false);
	};

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
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Cliente {client.codigoCliente}
			</h4>
			<div
				className="align-self-center"
				style={{
					width: "100%",
				}}
			>
				<div className="align-self-center container__basic">
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<AssignmentIndIcon color="primary" />
							<Typography variant="h6">
								{primerNombre} {segundoNombre} {primerApellido}{" "}
								{segundoApellido}
							</Typography>
						</Grid>

						<Grid item xs={3}>
							<Typography variant="subtitle2" className="right-align">
								Tipo documento:
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Typography variant="body1" className="left-align">
								{tipoDocumento}
							</Typography>
						</Grid>

						<Grid item xs={3}>
							<Typography variant="subtitle2" className="right-align">
								Número de documento:
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Typography variant="body1" className="left-align">
								{documento}
							</Typography>
						</Grid>
					</Grid>
				</div>

				<div className="topMargin">
					<Box
						className="align-self-center container__dataTable"
						sx={{ border: 1, borderColor: "orange", borderRadius: "5px" }}
					>
						<TabContext value={tabIndex}>
							<StyledTabs
								onChange={handleTabChange}
								sx={{ backgroundColor: "#e6e6e6" }}
							>
								<Tab
									value="0"
									label="Referenciador"
									style={{ textTransform: "none" }}
									icon={<AssignmentIndIcon />}
									wrapped
								/>
								<Tab
									value="1"
									label="Teléfonos"
									style={{ textTransform: "none" }}
									icon={<LocalPhoneIcon />}
									wrapped
								/>
								<Tab
									value="2"
									label="Direcciones"
									style={{ textTransform: "none" }}
									icon={<LocationOnIcon />}
									wrapped
								/>
								<Tab
									value="3"
									label="e-Mails"
									style={{ textTransform: "none" }}
									icon={<EmailIcon />}
									wrapped
								/>
								<Tab
									value="4"
									label="Historial de estados"
									style={{ textTransform: "none" }}
									icon={<HistoryToggleOffIcon />}
									wrapped
								/>
								<Tab
									value="5"
									label="Niveles de beneficios"
									style={{ textTransform: "none" }}
									icon={<EmojiEventsIcon />}
									wrapped
								/>
								<Tab
									value="6"
									label="Auditoría"
									style={{ textTransform: "none" }}
									icon={<LocationSearchingIcon />}
									wrapped
								/>
							</StyledTabs>

							<ClientReferrerTab formValues={formValues} index="0" handleInputChange={handleInputChange} handleValueChange={handleValueChange}/>
							<ClientPhonesTab client={client} index="1" />
							<ClientAddressTab client={client} index="2" />
							<ClientMailsTab client={client} index="3" />
							<ClientStateHistoryTab client={client} index="4" />
							<ClientBenefitsTab client={client} index="5" />
							<ClientAuditTab client={client} index="6" />
						</TabContext>
					</Box>
				</div>
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
						disabled={!saveBtnEnabled}
					>
						Guardar
					</Button>
				</div>
			</div>
		</div>
	);
};
