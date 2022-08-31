import { Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";
import { Footer } from "./Footer";
import { TopBar } from "./TopBar";
import { useDispatch, useSelector } from "react-redux";
import { removeError,removeMessage } from "../general/actions/uiActions";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Layout = ({ children, name, role }) => {
	const [open, setOpen] = useState(false);
   const [openMsg, setOpenMsg] = useState(false);
   const { error,message } = useSelector((state) => state.ui);
   const dispatch = useDispatch();
   //const { accounts } = useMsal();

   //const name = accounts[0] && accounts[0].name;

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
      dispatch(removeError());
      dispatch(removeMessage());
	};

   useEffect(() => {
      setOpen(error?true:false);
   
     return () => {
       setOpen(false);
     }
   }, [error]);

   useEffect(() => {
      setOpenMsg(message?true:false);
   
     return () => {
      setOpenMsg(false);
     }
   }, [message]);
   

	return (
		<>
			<div className="row">
            <TopBar usr={name} role={role}/>            
			</div>
			<div className="row">
				<div className="container">
					<div className="row mb-4">
						<div id="left" className="col-1 "></div>
						<div id="center" className="col-10  text-center container">
							{children}
						</div>
						<div id="right" className="col-1 "></div>
					</div>
				</div>
			</div>

			<Snackbar
				open={open}
				//autoHideDuration={6000}
				onClose={handleClose}
				message="Note archived"
				//action={action}
			>
				<Alert
					severity="error"
					onClose={handleClose}
					sx={{ width: "100%" }}
				>
					{error?.message}
				</Alert>
			</Snackbar>

			<Snackbar
				open={openMsg}
				autoHideDuration={6000}            
				onClose={handleClose}
				message="Note archived"
			>
				<Alert
					severity={message?.severity?message.severity:"info"}
					onClose={handleClose}
					sx={{ width: "100%" }}
				>
					{message?.msg}
				</Alert>
			</Snackbar>

			<div className="row">
				<Footer />
			</div>
		</>
	);
};
