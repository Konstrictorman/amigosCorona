import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import LocalPlayIcon from "@mui/icons-material/LocalPlay";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SellIcon from "@mui/icons-material/Sell";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { HomeCard } from "./HomeCard";
import { useNavigate } from "react-router";
import { Grid } from "@mui/material";
import ClubMaestros from "../../assets/images/Club_Maestros-01.png";
import Profesionales from "../../assets/images/Profesionales-01.png";
import { ReactComponent as BenefitsIcon } from "../../assets/images/BENEFICIOS_Mesa de trabajo 1.svg";
import { ReactComponent as FieldIcon } from "../../assets/images/CAMPOS_Mesa de trabajo 1.svg";
import { ReactComponent as DataLoadIcon } from "../../assets/images/CARGA DE DATOS_Mesa de trabajo 1.svg";
import { ReactComponent as ClientsIcon } from "../../assets/images/CLIENTES_Mesa de trabajo 1.svg";
import { ReactComponent as BillsIcon } from "../../assets/images/FACTURAS_Mesa de trabajo 1.svg";
import { ReactComponent as ParametersIcon } from "../../assets/images/G.PARAMETROS_Mesa de trabajo 1.svg";
import { ReactComponent as MovementsIcon } from "../../assets/images/MOVIMIENTOS_Mesa de trabajo 1.svg";
import { ReactComponent as SalesPointIcon } from "../../assets/images/PDV_Mesa de trabajo 1.svg";
import { ReactComponent as PromotionsIcon } from "../../assets/images/PROMO_Mesa de trabajo 1.svg";
import { ReactComponent as RedemptionsIcon } from "../../assets/images/REDENCIONES_Mesa de trabajo 1.svg";
import { ReactComponent as ReferredIcon } from "../../assets/images/REFERENCIACION_Mesa de trabajo 1.svg";
import { ReactComponent as RegisterMovementIcon } from "../../assets/images/REGISTRAR_Mesa de trabajo 1.svg";

export const Home = () => {
	const navigate = useNavigate();

	const handleClick = (e, path) => {
		navigate(path);
	};

	return (
		<>
			<div>
				<Grid container spacing={2} className="home">
					<div item xs={12} className="home__banner">
						<img src={ClubMaestros} alt="Club Maestros" width="35%" className="home__banner__maestros"/>
						<img src={Profesionales} alt="Club Maestros" width="25%" className="home__banner__profesionales"/>
					</div>

					<Grid item xs={12}>
						<p className="home__title">
							PROGRAMAS DE FIDELIZACIÓN CENTRO CORONA
						</p>
					</Grid>


					<HomeCard
						title="CAMPOS"
						icon={<FieldIcon className="home__icon" />}
						handleClick={(e) => {
							handleClick(e, "/fieldsList");
						}}
					/>

					<HomeCard
						title="CARGA DE DATOS"
						icon={<DataLoadIcon className="home__icon" />}
						handleClick={(e) => {
							handleClick(e, "/loadData");
						}}
					/>

					<HomeCard
						title="CLIENTES"
						icon={<ClientsIcon className="home__icon" />}
						handleClick={(e) => {
							handleClick(e, "/clientList");
						}}
					/>

					<HomeCard
						title="FACTURAS"
						icon={<BillsIcon className="home__icon" />}
						handleClick={(e) => {
							handleClick(e, "/billsList");
						}}
					/>

					<HomeCard
						title="MOVIMIENTOS"
						icon={<MovementsIcon className="home__icon" />}
						handleClick={(e) => {
							handleClick(e, "/movementList");
						}}
					/>

					<HomeCard
						title="NIVEL DE BENEFICIOS"
						icon={<BenefitsIcon className="home__icon" />}
						handleClick={(e) => {
							handleClick(e, "/benefitsList");
						}}
					/>

					<HomeCard
						title="PARÁMETROS"
						icon={<ParametersIcon className="home__icon" />}
						handleClick={(e) => {
							handleClick(e, "/parameters");
						}}
					/>

					<HomeCard
						title="PROGRAMAS DE REFERENCIACIÓN"
						icon={<ReferredIcon className="home__icon" />}
						handleClick={(e) => {
							handleClick(e, "/referenceProgramList");
						}}
					/>

					<HomeCard
						title="PROMOCIONES / EXCLUSIONES"
						icon={<PromotionsIcon className="home__icon" />}
						handleClick={(e) => {
							handleClick(e, "/promotionsList");
						}}
					/>

					<HomeCard
						title="PUNTOS DE VENTA"
						icon={<SalesPointIcon className="home__icon" />}
						handleClick={(e) => {
							handleClick(e, "/salesPointList");
						}}
					/>

					<HomeCard
						title="REDENCIONES"
						icon={<RedemptionsIcon className="home__icon" />}
						handleClick={(e) => {
							handleClick(e, "/redemptionsList");
						}}
					/>

					<HomeCard
						title="REGISTRAR MOVIMIENTOS"
						icon={<RegisterMovementIcon className="home__icon" />}
						handleClick={(e) => {
							handleClick(e, "/recordMovement");
						}}
					/>
				</Grid>
			</div>
		</>
	);
};
