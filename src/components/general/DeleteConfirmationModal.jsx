import { Button, IconButton, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "30%",
	bgcolor: "white",
	border: "2px solid whiteSmoke",
	borderRadius: "8px",
	boxShadow: 24,
};

export const DeleteConfirmationModal = ({
	open,
	handleAction,
	handleClose,
	items,
   recordDesc,
}) => {

   let msg = "";
   if (items.length===1) {
      if (recordDesc) {
         msg = `Está seguro de eliminar el registro seleccionado <${recordDesc}> ?`;
      } else {
         msg = "Está seguro de eliminar el registro seleccionado?";
      }      
   }else {
      msg="¿Está seguro de eliminar los registros seleccionados?";
   }


	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div className="headerModal">
                  <div className="right"></div>
						<Typography
							id="modal-modal-header"
							variant="h6"
							component="h2"
                     style={{alignSelf:"center", justifyContent:"center", marginLeft:"25px"}}
                     align="center"
						>
							Advertencia !!

						</Typography>
						<IconButton aria-label="delete" className="right" onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					</div>
					<div style={{ padding: "24px" }}>
						<Typography
							id="modal-modal-title"
							variant="h6"
							component="h2"
                     align="center"
						>
                     <WarningAmberIcon color="warning" fontSize="large"/>
                     {msg}  
                     
						</Typography>
                  
					</div>
					<div className="footerModal" >
						<Button
							color="primary"
							variant="outlined"
							className="mx-2  right"
							startIcon={<ClearIcon />}
							style={{ textTransform: "none" }}
							onClick={handleClose}
						>
							Cancelar
						</Button>
						<Button
							color="error"
							variant="outlined"
							className="mx-2 "
							startIcon={<DeleteForeverIcon />}
							style={{ textTransform: "none" }}
							type="submit"
							onClick={handleAction}
						>
							Eliminar
						</Button>
					</div>
				</Box>
			</Modal>
		</div>
	);
};
