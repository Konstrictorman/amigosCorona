import React, { useEffect, useRef, useState } from 'react';
import { ClickAwayListener, Divider, Grow, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from 'react-router-dom';
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


export const PoperMenu = () => {
   const navigate = useNavigate();
   const [open, setOpen] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);
   const anchorRef = useRef(null);
   const prevOpen = useRef(open);

   useEffect(() => {
      if (prevOpen.current === true && open === false) {
         anchorRef.current.focus();
       }
   
       prevOpen.current = open;
   }, [open])
   

   const handleToggle = (event) => {
      setAnchorEl(event.currentTarget);
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };

    const handleMenuClick = (event, page) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
         return;
       }
   
       setOpen(false);       
      navigate(page);
      //setAnchorEl(null);
   }    

  return (
    <div>

        <IconButton
            ref={anchorRef}
				size="large"
				edge="start"
				color="inherit"
				aria-label="menu"
				sx={{ mr: 2 }}
            onClick={handleToggle}
			>
				<MenuIcon />
			</IconButton>        
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                  
                  >
				
            <MenuItem onClick={(e) => {handleMenuClick(e,'/home')}}>
               <ListItemIcon>
                  <HomeIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Inicio</ListItemText>
            </MenuItem>            
            <Divider />
            <MenuItem onClick={(e) => {handleMenuClick(e,'/loadData')}}>
               <ListItemIcon>
                  <UploadFileIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Carga de datos</ListItemText>
            </MenuItem> 

            <MenuItem onClick={(e) => {handleMenuClick(e,'/clientList')}}>
               <ListItemIcon>
                  <GroupsIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Clientes</ListItemText>
            </MenuItem>  

            <MenuItem onClick={(e) => {handleMenuClick(e,'/billsList')}}>
               <ListItemIcon>
                  <ReceiptIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Facturas</ListItemText>
            </MenuItem>   

            <MenuItem onClick={(e) => {handleMenuClick(e,'/parameterGroupsList')}}>
               <ListItemIcon>
                  <Inventory2Icon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Grupos de parámetros</ListItemText>
            </MenuItem>              

            <MenuItem onClick={(e) => {handleMenuClick(e,'/movementList')}}>
               <ListItemIcon>
                  <DirectionsRunIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Movimientos</ListItemText>
            </MenuItem>  

            <MenuItem onClick={(e) => {handleMenuClick(e,'/benefitsList')}}>
               <ListItemIcon>
                  <EmojiEventsIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Nivel de beneficios</ListItemText>
            </MenuItem>               

            <MenuItem onClick={(e) => {handleMenuClick(e,'/referenceProgramList')}}>
               <ListItemIcon>
                  <LocalPlayIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Programas de referenciación </ListItemText>
            </MenuItem>              
            
            <MenuItem onClick={(e) => {handleMenuClick(e,'/promotionsList')}}>
               <ListItemIcon>
                  <PriceCheckIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Promociones / Exclusiones </ListItemText>
            </MenuItem>            

            <MenuItem onClick={(e) => {handleMenuClick(e,'/salesPointList')}}>
               <ListItemIcon>
                  <PointOfSaleIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Puntos de venta</ListItemText>
            </MenuItem>    

            <MenuItem onClick={(e) => {handleMenuClick(e,'/redemptionsList')}}>
               <ListItemIcon>
                  <SellIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Redenciones</ListItemText>
            </MenuItem>                
          
            <MenuItem onClick={(e) => {handleMenuClick(e,'/recordMovement')}}>
               <ListItemIcon>
                  <DriveFileRenameOutlineIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Registrar movimientos</ListItemText>
            </MenuItem>   
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </div>
  )
}
