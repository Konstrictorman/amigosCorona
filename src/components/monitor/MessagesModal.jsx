import { IconButton, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { getMessageColumns } from "./selectors/getMessageColumns";
import CloseIcon from "@mui/icons-material/Close";
import { DataTable } from "../general/DataTable";
import { Spinner } from "../general/Spinner";

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

export const MessagesModal = ({ idProceso, open, handleClose, rows, loading }) => {
	const columns = getMessageColumns();

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
							style={{
								alignSelf: "center",
								justifyContent: "center",
								marginLeft: "25px",
							}}
							align="center"
						>
							Mensajes
						</Typography>
						<IconButton
							aria-label="delete"
							className="right"
							onClick={handleClose}
						>
							<CloseIcon />
						</IconButton>
					</div>
               
               
               {loading && (<Spinner css="text-center"/>)}
               {!loading && (
					<DataTable
						//getRowId={(r) => r.idProceso}
						columns={columns}
						rows={rows}
						//handleClick={handleAction}
						loading={loading}
						show={open}
						pageSize={10}
					/>
               )}
               
				</Box>
			</Modal>
		</div>
	);
};
