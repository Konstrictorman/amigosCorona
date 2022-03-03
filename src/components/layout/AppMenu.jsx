import React from "react";
import { Divider, IconButton, ListItemIcon, ListItemText,Menu, MenuItem} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import LocalPlayIcon from '@mui/icons-material/LocalPlay';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import SellIcon from '@mui/icons-material/Sell';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

export const AppMenu = () => {
   
   const [anchorEl, setAnchorEl] = React.useState(null);

   const navigate = useNavigate();
 
   const handleMenu = (event) => {
     setAnchorEl(event.currentTarget);
   };
 
   const handleClose = () => {
     setAnchorEl(null);
   };

   const handleMenuClick = (page) => {
      navigate(page);
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
				
            <MenuItem onClick={() => {handleMenuClick('/home')}}>
               <ListItemIcon>
                  <HomeIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Inicio</ListItemText>
            </MenuItem>            
            <Divider />
            <MenuItem onClick={() => {handleMenuClick('/loadData')}}>
               <ListItemIcon>
                  <UploadFileIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Carga de datos</ListItemText>
            </MenuItem> 

            <MenuItem onClick={() => {handleMenuClick('/clientList')}}>
               <ListItemIcon>
                  <GroupsIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Clientes</ListItemText>
            </MenuItem>  

            <MenuItem onClick={() => {handleMenuClick('/billsList')}}>
               <ListItemIcon>
                  <ReceiptIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Facturas</ListItemText>
            </MenuItem>   

            <MenuItem onClick={() => {handleMenuClick('/parameterGroupsList')}}>
               <ListItemIcon>
                  <Inventory2Icon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Grupos de parámetros</ListItemText>
            </MenuItem>              

            <MenuItem onClick={() => {handleMenuClick('/movementList')}}>
               <ListItemIcon>
                  <DirectionsRunIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Movimientos</ListItemText>
            </MenuItem>  

            <MenuItem onClick={() => {handleMenuClick('/benefitsList')}}>
               <ListItemIcon>
                  <EmojiEventsIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Nivel de beneficios</ListItemText>
            </MenuItem>               

            <MenuItem onClick={() => {handleMenuClick('/referenceProgramList')}}>
               <ListItemIcon>
                  <LocalPlayIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Programas de referenciación </ListItemText>
            </MenuItem>              
            
            <MenuItem onClick={() => {handleMenuClick('/promotionsList')}}>
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

            <MenuItem onClick={() => {handleMenuClick('/redemptionsList')}}>
               <ListItemIcon>
                  <SellIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Redenciones</ListItemText>
            </MenuItem>                
          
            <MenuItem onClick={() => {handleMenuClick('/recordMovement')}}>
               <ListItemIcon>
                  <DriveFileRenameOutlineIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Registrar movimientos</ListItemText>
            </MenuItem>                
          
            
			</Menu>
		</div>
	);
};
