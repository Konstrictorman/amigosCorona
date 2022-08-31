import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Corona_logo from "../../assets/images/centro_corona.png";
import {
	Avatar,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { AppMenu } from "./AppMenu";
import LogoutIcon from "@mui/icons-material/Logout";

import { stringAvatar } from "../../helpers/stringAvatar";
import { useMsal } from "@azure/msal-react";
import { AppCashierMenu } from "./AppCashierMenu";

export const TopBar = ({ usr, role}) => {
	const [anchorEl, setAnchorEl] = useState(null);
   const { instance } = useMsal();

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

   const handleLogout = (instance) => {
      handleClose();
      instance.logoutRedirect().catch((e) => {
         console.error(e);
      });
   };
   
	const handleClose = () => {
		setAnchorEl(null);
	};

	const MyMenuItem = withStyles({
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
                  {(role === "admin") && (<AppMenu />)}
                  {(role === "cashier") && (<AppCashierMenu />)}
						

						<img
							src={Corona_logo}
							alt="Logo"
							width="15%"
							height="15%"
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
							{usr}
						</Typography>

						<div className="mr-5">                     
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
							>
								<Avatar {...stringAvatar(usr?usr:"")} />
							</IconButton>
   
                     
							<Menu
								id="menu-profile"
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={handleClose}
                        disableScrollLock={true}
                        anchorOrigin={{
                           vertical: 'bottom',
                           horizontal: 'right',
                         }}
                         transformOrigin={{
                           vertical: 'top',
                           horizontal: 'right',
                         }}
                         PaperProps={{
                           elevation: 0,
                           sx: {
                             overflow: 'visible',
                             filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                             mt: 1.5,
                             '& .MuiSvgIcon-root': {
                               width: 32,
                               height: 32,
                               ml: -0.5,
                               mr: 1,
                             },
                             '&:before': {
                               content: '""',
                               display: 'block',
                               position: 'absolute',
                               top: 0,
                               right: 14,
                               width: 10,
                               height: 10,
                               bgcolor: 'background.paper',
                               transform: 'translateY(-50%) rotate(45deg)',
                               zIndex: 0,
                             },
                           },
                         }}
							>
								<MyMenuItem onClick={()=> handleLogout(instance)}>
									<ListItemIcon>
										<LogoutIcon color="primary"/>
									</ListItemIcon>
									<ListItemText>Salir </ListItemText>
								</MyMenuItem>

							</Menu>
                     
						</div>
						
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
};
