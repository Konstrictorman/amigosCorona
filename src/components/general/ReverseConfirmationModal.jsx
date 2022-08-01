import { Button, IconButton, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import FastRewindIcon from '@mui/icons-material/FastRewind';
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

export const ReverseConfirmationModal = ({
	open,
	handleAction,
	handleClose,
	items,
   recordDesc,
}) => {

   let msg = `Está seguro de reversar el registro seleccionado <${recordDesc}> ?`;

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
							startIcon={<FastRewindIcon />}
							style={{ textTransform: "none" }}
							type="submit"
							onClick={handleAction}
						>
							Reversar
						</Button>
					</div>
				</Box>
			</Modal>
		</div>
	);
};
