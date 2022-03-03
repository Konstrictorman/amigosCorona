import React, { useState } from "react";
import { Spinner } from "./Spinner";
import GroupsIcon from "@mui/icons-material/Groups";
import { Grid, Link, Typography } from "@mui/material";
import Title from "../../assets/images/Title.png";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import LocalPlayIcon from "@mui/icons-material/LocalPlay";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SellIcon from "@mui/icons-material/Sell";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

export const Home = () => {
	const [loading, setLoading] = useState(false);

	return (
		<>
			{loading && <Spinner />}
			{!loading && (
				<div>
					<Grid container spacing={2}>
						<Grid className="" item xs={12} sx={{paddingBottom:"32px"}}>
							<img src={Title} alt="Title" width="50%" />
						</Grid>

						<Grid
							className="noPadding"
							item
							xs={2}
							sx={{
								width: "",
								height: 160,
								borderRadius: "150px",
								border: 5,
								borderColor: "primary.main",
								backgroundColor: "white",
								margin: 2,
							}}
						>
							<Link href="loadData">
								<UploadFileIcon
									className="topMargin"
									sx={{ fontSize: "64px" }}
								/>

								<Typography
									variant="subtitle2"
									component="div"
									gutterBottom
								>
									Carga de datos
								</Typography>
							</Link>
						</Grid>

						<Grid
							className="noPadding"
							item
							xs={2}
							sx={{
								width: "",
								height: 160,
								borderRadius: "150px",
								border: 5,
								borderColor: "primary.main",
								backgroundColor: "white",
								margin: 2,
							}}
						>
							<Link href="clientList">
								<GroupsIcon
									className="topMargin"
									sx={{ fontSize: "64px" }}
								/>

								<Typography
									variant="subtitle2"
									component="div"
									gutterBottom
								>
									Clientes
								</Typography>
							</Link>
						</Grid>
						<Grid
							className="noPadding"
							item
							xs={2}
							sx={{
								width: "100%",
								height: 160,
								borderRadius: "150px",
								border: 5,
								borderColor: "primary.main",
								backgroundColor: "white",
								margin: 2,
							}}
						>
							<Link href="billsList">
								<ReceiptIcon
									className="topMargin"
									sx={{ fontSize: "64px" }}
								/>

								<Typography
									variant="subtitle2"
									component="div"
									gutterBottom
								>
									Facturas
								</Typography>
							</Link>
						</Grid>
						<Grid
							className="noPadding"
							item
							xs={2}
							sx={{
								width: "100%",
								height: 160,
								borderRadius: "150px",
								border: 5,
								borderColor: "primary.main",
								backgroundColor: "white",
								margin: 2,
							}}
						>
							<Link href="parameterGroupsList">
								<Inventory2Icon
									className="topMargin"
									sx={{ fontSize: "64px" }}
								/>

								<Typography
									variant="subtitle2"
									component="div"
									gutterBottom
								>
									Grupos de parámetros
								</Typography>
							</Link>
						</Grid>
						<Grid
							className="noPadding"
							item
							xs={2}
							sx={{
								width: "100%",
								height: 160,
								borderRadius: "150px",
								border: 5,
								borderColor: "primary.main",
								backgroundColor: "white",
								margin: 2,
							}}
						>
							<Link href="movementList">
								<DirectionsRunIcon
									className="topMargin"
									sx={{ fontSize: "64px" }}
								/>

								<Typography
									variant="subtitle2"
									component="div"
									gutterBottom
								>
									Movimientos
								</Typography>
							</Link>
						</Grid>
						<Grid
							className="noPadding"
							item
							xs={2}
							sx={{
								width: "100%",
								height: 160,
								borderRadius: "150px",
								border: 5,
								borderColor: "primary.main",
								backgroundColor: "white",
								margin: 2,
							}}
						>
							<Link href="benefitsList">
								<EmojiEventsIcon
									className="topMargin"
									sx={{ fontSize: "64px" }}
								/>

								<Typography
									variant="subtitle2"
									component="div"
									gutterBottom
								>
									Nivel de beneficios
								</Typography>
							</Link>
						</Grid>
						<Grid
							className="noPadding"
							item
							xs={2}
							sx={{
								width: "100%",
								height: 160,
								borderRadius: "150px",
								border: 5,
								borderColor: "primary.main",
								backgroundColor: "white",
								margin: 2,
							}}
						>
							<Link href="referenceProgramList">
								<LocalPlayIcon
									className="topMargin"
									sx={{ fontSize: "64px" }}
								/>

								<Typography
									variant="subtitle2"
									component="div"
									gutterBottom
								>
									Programas de referenciación
								</Typography>
							</Link>
						</Grid>
						<Grid
							className="noPadding"
							item
							xs={2}
							sx={{
								width: "100%",
								height: 160,
								borderRadius: "150px",
								border: 5,
								borderColor: "primary.main",
								backgroundColor: "white",
								margin: 2,
							}}
						>
							<Link href="promotionsList">
								<PriceCheckIcon
									className="topMargin"
									sx={{ fontSize: "64px" }}
								/>

								<Typography
									variant="subtitle2"
									component="div"
									gutterBottom
								>
									Promociones / Exclusiones
								</Typography>
							</Link>
						</Grid>
						<Grid
							className="noPadding"
							item
							xs={2}
							sx={{
								width: "100%",
								height: 160,
								borderRadius: "150px",
								border: 5,
								borderColor: "primary.main",
								backgroundColor: "white",
								margin: 2,
							}}
						>
							<Link href="salesPointList">
								<PointOfSaleIcon
									className="topMargin"
									sx={{ fontSize: "64px" }}
								/>

								<Typography
									variant="subtitle2"
									component="div"
									gutterBottom
								>
									Puntos de venta
								</Typography>
							</Link>
						</Grid>

						<Grid
							className="noPadding"
							item
							xs={2}
							sx={{
								width: "100%",
								height: 160,
								borderRadius: "150px",
								border: 5,
								borderColor: "primary.main",
								backgroundColor: "white",
								margin: 2,
							}}
						>
							<Link href="redemptionsList">
								<SellIcon
									className="topMargin"
									sx={{ fontSize: "64px" }}
								/>

								<Typography
									variant="subtitle2"
									component="div"
									gutterBottom
								>
									Redenciones
								</Typography>
							</Link>
						</Grid>

						<Grid
							className="noPadding"
							item
							xs={2}
							sx={{
								width: "100%",
								height: 160,
								borderRadius: "150px",
								border: 5,
								borderColor: "primary.main",
								backgroundColor: "white",
								margin: 2,
							}}
						>
							<Link href="recordMovement">
								<DriveFileRenameOutlineIcon
									className="topMargin"
									sx={{ fontSize: "64px" }}
								/>

								<Typography
									variant="subtitle2"
									component="div"
									gutterBottom
								>
									Registrar movimientos
								</Typography>
							</Link>
						</Grid>

					</Grid>
				</div>
			)}
		</>
	);
};
