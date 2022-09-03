import React from "react";
import { Divider, IconButton, ListItemIcon, ListItemText,Menu, MenuItem} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { ReactComponent as ClientsIcon } from "../../assets/images/CLIENTES_Mesa de trabajo 1.svg";
import { ReactComponent as RedemptionsIcon } from "../../assets/images/REDENCIONES_Mesa de trabajo 1.svg";


export const AppCashierMenu = () => {
   
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
            disableScrollLock={true}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}

				keepMounted
            variant="menu"
                
			>
				
            <MenuItem onClick={() => {handleMenuClick('/home')}}>
               <ListItemIcon>
                  <HomeIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Inicio</ListItemText>
            </MenuItem>            
            <Divider />
{/*}
            <MenuItem onClick={() => {handleMenuClick('/amounts')}}>
               <ListItemIcon>
                  <AmountsIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Asignación de montos</ListItemText>
            </MenuItem>             

            <MenuItem onClick={() => {handleMenuClick('/fieldsList')}}>
               <ListItemIcon>
                  <FieldIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Campos</ListItemText>
            </MenuItem>  

            <MenuItem onClick={() => {handleMenuClick('/loadData')}}>
               <ListItemIcon>
                  <DataLoadIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Carga de datos</ListItemText>
            </MenuItem> 
         */}
            <MenuItem onClick={() => {handleMenuClick('/clientList')}}>
               <ListItemIcon>
                  <ClientsIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Clientes</ListItemText>
            </MenuItem>  
{/*
            <MenuItem onClick={() => {handleMenuClick('/billsList')}}>
               <ListItemIcon>
                  <BillsIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Facturas</ListItemText>
            </MenuItem>   

            <MenuItem onClick={() => {handleMenuClick('/processMonitor')}}>
               <ListItemIcon>
                  <ProcessMonitorIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Monitor de procesos</ListItemText>
            </MenuItem>              

            <MenuItem onClick={() => {handleMenuClick('/movementList')}}>
               <ListItemIcon>
                  <MovementsIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Movimientos</ListItemText>
            </MenuItem>  

            <MenuItem onClick={() => {handleMenuClick('/benefitsList')}}>
               <ListItemIcon>
                  <BenefitsIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Nivel de beneficios</ListItemText>
            </MenuItem>  

            <MenuItem onClick={() => {handleMenuClick('/parametersGroupList')}}>
               <ListItemIcon>
                  <ParametersIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Parámetros</ListItemText>
            </MenuItem>                                  

            <MenuItem onClick={() => {handleMenuClick('/referenceProgramList')}}>
               <ListItemIcon>
                  <ReferredIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Programas de referenciación </ListItemText>
            </MenuItem>              
            
            <MenuItem onClick={() => {handleMenuClick('/promotionsList')}}>
               <ListItemIcon>
                  <PromotionsIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Promociones / Exclusiones </ListItemText>
            </MenuItem>            

            <MenuItem onClick={() => {handleMenuClick('/salesPointList')}}>
               <ListItemIcon>
                  <SalesPointIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Puntos de venta</ListItemText>
            </MenuItem>    
      */}
            <MenuItem onClick={() => {handleMenuClick('/redemptionsList')}}>
               <ListItemIcon>
                  <RedemptionsIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Redenciones</ListItemText>
            </MenuItem>                
{/*          
            <MenuItem onClick={() => {handleMenuClick('/reports')}}>
               <ListItemIcon>
                  <RegisterMovementIcon color="primary" fontSize="medium"/>
               </ListItemIcon>          
               <ListItemText>Reportes & Procesos</ListItemText>
            </MenuItem>                
   */}       
            
			</Menu>
		</div>
	);
};
