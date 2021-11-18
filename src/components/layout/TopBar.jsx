import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Corona_logo from "../../assets/images/Corona_W.png";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { withStyles } from "@mui/styles";
import { AppMenu } from "./AppMenu";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";

import "./styles/topBar.css";

export const TopBar = () => {
	const [auth, setAuth] = useState(true);
	const [anchorEl, setAnchorEl] = useState(null);

   /*
	const handleChange = (event) => {
		setAuth(event.target.checked);
	};
*/
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const MyMenutem = withStyles({
		root: {
			justifyContent: "flex-end",
			textAlign: "right",
		},
	})(MenuItem);

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static" className="topBar">
					<Toolbar>
						<AppMenu />
						<img
							src={Corona_logo}
							alt="Logo"
							width="5%"
							height="5%"
							className="ml-2 pl-2"
						/>
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1 }}
						/>

						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1 }}
							align="right"
						>
							{"UserName"}
						</Typography>
						{auth && (
							<div>
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleMenu}
									color="inherit"
								>
									<AccountCircle />
								</IconButton>
								<Menu
									id="menu-profile"
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									<MyMenutem onClick={handleClose}>
										<ListItemIcon>
											<AccountBoxIcon
												color="primary"
												fontSize="medium"
											/>
										</ListItemIcon>
										<ListItemText>Mi Perfil</ListItemText>
									</MyMenutem>

									<MyMenutem onClick={handleClose}>
										<ListItemIcon>
											<LogoutIcon
												color="primary"
												fontSize="medium"
											/>
										</ListItemIcon>
										<ListItemText>Salir </ListItemText>
									</MyMenutem>
								</Menu>
							</div>
						)}
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
};
