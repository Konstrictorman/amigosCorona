import React, { useState } from "react";
import { Spinner } from "./Spinner";
import GroupsIcon from "@mui/icons-material/Groups";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Grid,
	IconButton,
	Link,
	Typography,
} from "@mui/material";
import Title from "../../assets/images/Title.png";
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

export const Home = () => {
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();



	const handleClick = (e, path) => {
      navigate(path);
	};

	return (
		<>
			{loading && <Spinner />}
			{!loading && (
				<div>
					<Grid container spacing={2}>
						<Grid
							className=""
							item
							xs={12}
							sx={{ paddingBottom: "32px" }}
						>
							{/*<img src={Title} alt="Title" width="50%" />*/}
							<span className="home__title" >Club de amigos CORONA</span>
						</Grid>

						<HomeCard
							title="Carga de datos"
							icon={
									<UploadFileIcon className="home__icon"/>
							}
                     handleClick={(e) => {handleClick(e, '/loadData')}}
						/>

						<HomeCard
							title="Clientes"
							icon={
									<GroupsIcon className="home__icon"/>
							}
                     handleClick={(e) => {handleClick(e, '/clientList')}}
						/>

						<HomeCard
							title="Facturas"							
							icon={
									<ReceiptIcon className="home__icon" />
							}
                     handleClick={(e) => {handleClick(e, '/billsList')}}
						/>

						<HomeCard
							title="Grupos de parámetros"
							icon={
									<Inventory2Icon className="home__icon"/>
							}
                     handleClick={(e) => {handleClick(e, '/parameterGroupsList')}}
						/>

						<HomeCard
							title="Movimientos"
							icon={
									<DirectionsRunIcon className="home__icon"/>
							}
                     handleClick={(e) => {handleClick(e, '/movementList')}}
						/>

						<HomeCard
							title="Nivel de beneficios"
							icon={
									<EmojiEventsIcon className="home__icon"/>
							}
                     handleClick={(e) => {handleClick(e, '/benefitsList')}}
						/>

						<HomeCard
							title="Programas de referenciación"
							icon={
									<LocalPlayIcon className="home__icon"/>
							}
                     handleClick={(e) => {handleClick(e, '/referenceProgramList')}}
						/>

						<HomeCard
							title="Promociones / Exclusiones"
							icon={
									<PriceCheckIcon className="home__icon"/>
							}
                     handleClick={(e) => {handleClick(e, '/promotionsList')}}
						/>

						<HomeCard
							title="Puntos de venta"
							icon={
									<PointOfSaleIcon className="home__icon"/>
							}
                     handleClick={(e) => {handleClick(e, '/salesPointList')}}
						/>

						<HomeCard
							title="Redenciones"
							icon={
									<SellIcon className="home__icon"/>
							}
                     handleClick={(e) => {handleClick(e, '/redemptionsList')}}
						/>

						<HomeCard
							title="Registrar movimientos"
							icon={
									<DriveFileRenameOutlineIcon className="home__icon"/>
							}
                     handleClick={(e) => {handleClick(e, '/recordMovement')}}
						/>
					</Grid>
				</div>
			)}
		</>
	);
};
