import React, { useEffect, useState } from "react";
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
import { ReactComponent as ProcessMonitorIcon } from "../../assets/images/PROCESOS-01.svg";
import { ReactComponent as AmountsIcon } from "../../assets/images/MONTOS-01.svg";
import { useMsal } from "@azure/msal-react";

export const Home = () => {
	const navigate = useNavigate();
	const { accounts } = useMsal();
	const claims = accounts[0] && accounts[0].idTokenClaims;
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const checkRoles = () => {
			const admin = claims?.roles?.find((x) => x === "Administrador");
			if (admin) {
				setIsAdmin(true);
			}
		};
		checkRoles();
	}, [claims]);

	const handleClick = (e, path) => {
		navigate(path);
	};

	return (
		<>
			<div>
				<Grid container spacing={2} className="home">
					<div item={true} xs={12} className="home__banner">
						<img
							src={ClubMaestros}
							alt="Club Maestros"
							width="35%"
							className="home__banner__maestros"
						/>
						<img
							src={Profesionales}
							alt="Club Maestros"
							width="25%"
							className="home__banner__profesionales"
						/>
					</div>

					<Grid item={true} xs={12}>
						<p className="home__title">
							PROGRAMAS DE FIDELIZACIÓN CENTRO CORONA
						</p>
					</Grid>

					{isAdmin && (
						<HomeCard
							title="ASIGNACIÓN DE MONTOS"
							icon={<AmountsIcon className="home__icon" />}
							handleClick={(e) => {
								handleClick(e, "/amounts");
							}}
						/>
					)}

					{isAdmin && (
						<HomeCard
							title="CAMPOS"
							icon={<FieldIcon className="home__icon" />}
							handleClick={(e) => {
								handleClick(e, "/fieldsList");
							}}
						/>
					)}

					{isAdmin && (
						<HomeCard
							title="CARGA DE DATOS"
							icon={<DataLoadIcon className="home__icon" />}
							handleClick={(e) => {
								handleClick(e, "/loadData");
							}}
						/>
					)}

					<HomeCard
						title="CLIENTES"
						icon={<ClientsIcon className="home__icon" />}
						handleClick={(e) => {
							handleClick(e, "/clientList");
						}}
					/>

					{isAdmin && (
						<HomeCard
							title="FACTURAS"
							icon={<BillsIcon className="home__icon" />}
							handleClick={(e) => {
								handleClick(e, "/billsList");
							}}
						/>
					)}

					{isAdmin && (
						<HomeCard
							title="MONITOR DE PROCESOS"
							icon={<ProcessMonitorIcon className="home__icon" />}
							handleClick={(e) => {
								handleClick(e, "/processMonitor");
							}}
						/>
					)}

					{isAdmin && (
						<HomeCard
							title="MOVIMIENTOS"
							icon={<MovementsIcon className="home__icon" />}
							handleClick={(e) => {
								handleClick(e, "/movementList");
							}}
						/>
					)}

					{isAdmin && (
						<HomeCard
							title="NIVEL DE BENEFICIOS"
							icon={<BenefitsIcon className="home__icon" />}
							handleClick={(e) => {
								handleClick(e, "/benefitsList");
							}}
						/>
					)}

					{isAdmin && (
						<HomeCard
							title="PARÁMETROS"
							icon={<ParametersIcon className="home__icon" />}
							handleClick={(e) => {
								handleClick(e, "/parametersGroupList");
							}}
						/>
					)}

					{isAdmin && (
						<HomeCard
							title="PROGRAMAS DE REFERENCIACIÓN"
							icon={<ReferredIcon className="home__icon" />}
							handleClick={(e) => {
								handleClick(e, "/referenceProgramList");
							}}
						/>
					)}

					{isAdmin && (
						<HomeCard
							title="PROMOCIONES / EXCLUSIONES"
							icon={<PromotionsIcon className="home__icon" />}
							handleClick={(e) => {
								handleClick(e, "/promotionsList");
							}}
						/>
					)}

					{isAdmin && (
						<HomeCard
							title="PUNTOS DE VENTA"
							icon={<SalesPointIcon className="home__icon" />}
							handleClick={(e) => {
								handleClick(e, "/salesPointList");
							}}
						/>
					)}

					<HomeCard
						title="REDENCIONES"
						icon={<RedemptionsIcon className="home__icon" />}
						handleClick={(e) => {
							handleClick(e, "/redemptionsList");
						}}
					/>

					{isAdmin && (
						<HomeCard
							title="REPORTES & PROCESOS"
							icon={<RegisterMovementIcon className="home__icon" />}
							handleClick={(e) => {
								handleClick(e, "/reports");
							}}
						/>
					)}
				</Grid>
			</div>
		</>
	);
};
