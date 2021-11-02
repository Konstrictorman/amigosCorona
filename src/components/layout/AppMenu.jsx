import React from "react";
import { Divider, IconButton, ListItemIcon, ListItemText,Menu, MenuItem} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useHistory } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';


export const AppMenu = () => {
   
   const [anchorEl, setAnchorEl] = React.useState(null);

   const history = useHistory();
 
   const handleMenu = (event) => {
     setAnchorEl(event.currentTarget);
   };
 
   const handleClose = () => {
     setAnchorEl(null);
   };

   const handleMenuClick = (page) => {
      history.replace(page);
      setAnchorEl(null);
   }


	return (
		<div>
			<IconButton
				size="large"
				edge="start"
				color="inherit"
				aria-label="menu"
				sx={{ mr: 2 }}
				onClick={handleMenu}
			>
				<MenuIcon />
			</IconButton>
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}

				keepMounted

			>
				
            <MenuItem onClick={() => {handleMenuClick('/')}}>
               <ListItemIcon>
                  <HomeIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Inicio</ListItemText>
            </MenuItem>            
            <Divider />
            <MenuItem onClick={() => {handleMenuClick('/clients')}}>
               <ListItemIcon>
                  <GroupsIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Clientes</ListItemText>
            </MenuItem>  

            <MenuItem onClick={() => {handleMenuClick('/bills')}}>
               <ListItemIcon>
                  <ReceiptIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Facturas</ListItemText>
            </MenuItem>   
            
            <MenuItem onClick={() => {handleMenuClick('/promotions')}}>
               <ListItemIcon>
                  <PriceCheckIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Promociones / Exclusiones </ListItemText>
            </MenuItem>            

            <MenuItem onClick={() => {handleMenuClick('/salesPointList')}}>
               <ListItemIcon>
                  <PointOfSaleIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Puntos de venta</ListItemText>
            </MenuItem>    
          
			</Menu>
		</div>
	);
};
