import React from 'react';
import { Button, IconButton, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { PagedClientDataTable } from '../clients/PagedClientDataTable';
import { getClientColumns } from '../clients/selectors/getClientColumns';

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "50%",
	bgcolor: "white",
	border: "2px solid whiteSmoke",
	borderRadius: "8px",
	boxShadow: 24,
};

export const SearchTableModal = ({
   open,
	handleAction,
	handleClose,
	pageSize,
   filter,
}) => {

   const columns = getClientColumns();

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
							Referenciadores

						</Typography>
						<IconButton aria-label="delete" className="right" onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					</div>
               <PagedClientDataTable
					   columns={columns}
					   handleClick={handleAction}
					   params={{codigoCliente: filter}}
					   show={open}
                  pageSize={pageSize}
				   />
				</Box>
			</Modal>
    </div>
  )
}
