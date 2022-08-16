import React from 'react';
import { IconButton, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from "@mui/icons-material/Close";
import { PagedClientDataTable } from '../clients/PagedClientDataTable';

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
   criteria,
   filter,
   columns,
   title
}) => {


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
							{title}

						</Typography>
						<IconButton aria-label="delete" className="right" onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					</div>
               <PagedClientDataTable
					   columns={columns}
					   handleClick={handleAction}
					   params={{[criteria]:filter}}
					   show={open}
                  pageSize={pageSize}
				   />
				</Box>
			</Modal>
    </div>
  )
}
