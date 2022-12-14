import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";

import queryString from "query-string";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import Box from "@mui/material/Box";
import { Grid, Tab } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import NumbersIcon from "@mui/icons-material/Numbers";
import { TabContext, TabList } from "@mui/lab";
import { withStyles } from "@mui/styles";
import { ClientBenefitsTab } from "./tabs/ClientBenefitsTab";
import { ClientStateHistoryTab } from "./tabs/ClientStateHistoryTab";
import { ClientMailsTab } from "./tabs/ClientMailsTab";
import { ClientAddressTab } from "./tabs/ClientAddressTab";
import { ClientPhonesTab } from "./tabs/ClientPhonesTab";
import { ClientReferrerTab } from "./tabs/ClientReferrerTab";
import Swal from "sweetalert2";
import { loadClientById } from "./actions/clientActions";
import { Spinner } from "../general/Spinner";
import { ERROR_MSG } from "../../config/config";
import { setError } from "../general/actions/uiActions";
import { useDispatch, useSelector } from "react-redux";
import { ClientAuditTab } from "./tabs/ClientAuditTab";

const StyledTabs = withStyles({
	indicator: {
		backgroundColor: "pantone300C",
		height: "3px",
	},
})(TabList);

export const Client = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const [client, setClient] = useState({
		id: 0,
		codigoCliente: "",
		tipoDocumento: "",
		documento: "",
		nombreCompleto: "",
		facturas: [],
		telefonosclientes: [],
		referenciador: {},
		direccionesCliente: [],
		emailsCliente: [],
	});
   const [levels, setLevels] = useState([]);
	const { nombreCompleto, tipoDocumento, documento, referenciador } = client;
	const { tiposDocumento } = useSelector((state) => state.lists);

	useEffect(() => {
		const cliente = async (id) => {
			setLoading(true);
			try {
				if (tiposDocumento) {
               const data = await loadClientById(id);               
					const td = tiposDocumento?.filter(
						(t) => t.valor === data.tipoDocumento
					);
					const tipoDoc = td[0].descripcion;
					data.tipoDocumento = tipoDoc;

					setClient(data);
               //console.log(JSON.stringify(data.referenciador.levels,null,2));
               setLevels(data.referenciador.levels);
				}
			} catch (e) {
				console.log(e);
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
				dispatch(setError(e));
			}
			setLoading(false);
		};

		cliente(id);
	}, [id, dispatch, tiposDocumento]);

	const [tabIndex, setTabIndex] = useState("0");
	//const [saveBtnEnabled, setsaveBtnEnabled] = useState(false);

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/clientList",
	});

	const handleTabChange = (e, newValue) => {
		setTabIndex(newValue);
		//setsaveBtnEnabled(newValue === "0" ? true : false);
	};

	if (loading) {
		return <Spinner css="text-center spinner-top-margin" />;
	}

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
							<div className="client__properties">
								<AssignmentIndIcon color="primary" fontSize="large" />
								<span className="client__name">{nombreCompleto}</span>
							</div>
						</Grid>

						<Grid item xs={12}>
							<div className="client__properties">
								<CreditCardIcon color="primary" />
								<span className="client__docs">{tipoDocumento}</span>
							</div>
						</Grid>

						<Grid item xs={12}>
							<div className="client__properties">
								<NumbersIcon color="primary" />
								<span className="client__docs">{documento}</span>
							</div>
						</Grid>
					</Grid>
				</div>

				<div className="">
					<Box className="align-self-center container__dataTable">
						<TabContext value={tabIndex}>
							<StyledTabs
								onChange={handleTabChange}
								sx={{ backgroundColor: "#e6e6e6" }}
							>
								<Tab
									value="0"
									label="Referenciador"
									style={{ textTransform: "none" }}
									icon={<AssignmentIndIcon fontSize="large" />}
									wrapped
								/>
								<Tab
									value="1"
									label="Tel??fonos"
									style={{ textTransform: "none" }}
									icon={<LocalPhoneIcon fontSize="large" />}
									wrapped
								/>
								<Tab
									value="2"
									label="Direcciones"
									style={{ textTransform: "none" }}
									icon={<LocationOnIcon fontSize="large" />}
									wrapped
								/>
								<Tab
									value="3"
									label="e-Mails"
									style={{ textTransform: "none" }}
									icon={<EmailIcon fontSize="large" />}
									wrapped
								/>
								<Tab
									value="4"
									label="Historial de estados"
									style={{ textTransform: "none" }}
									icon={<HistoryToggleOffIcon fontSize="large" />}
									wrapped
								/>
								<Tab
									value="5"
									label="Niveles de beneficios"
									style={{ textTransform: "none" }}
									icon={<EmojiEventsIcon fontSize="large" />}
									wrapped
								/>

								<Tab
									value="6"
									label="Auditor??a"
									style={{ textTransform: "none" }}
									icon={<LocationSearchingIcon fontSize="large" />}
									wrapped
								/>
							</StyledTabs>

							<ClientReferrerTab
                        client={client}
								formValues={referenciador}
								index="0"
								handleClickOut={handleClickOut}
                        setLevels={setLevels}
							/>
							<ClientPhonesTab
								client={client}
								index="1"
								handleClickOut={handleClickOut}
							/>
							<ClientAddressTab
								client={client}
								index="2"
								handleClickOut={handleClickOut}
							/>
							<ClientMailsTab
								client={client}
								index="3"
								handleClickOut={handleClickOut}
							/>
							<ClientStateHistoryTab
								client={client}
								index="4"
								handleClickOut={handleClickOut}
							/>
							<ClientBenefitsTab
								levels={levels}
								index="5"
								handleClickOut={handleClickOut}
							/>
							<ClientAuditTab
								client={referenciador}
								index="6"
								handleClickOut={handleClickOut}
							/>
						</TabContext>
					</Box>
				</div>
			</div>
		</div>
	);
};
