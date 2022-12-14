import React from "react";
import { Stack, Typography } from "@mui/material";
import Corona_logo from "../../assets/images/centroCorona.png";
import { Footer } from "../layout/Footer";
import { SignInButton } from "../login/SignInButton";
import LoginIcon from "@mui/icons-material/Login";

export const LogoutView = () => {
/*
   const navigate = useNavigate();

   const handleClick = () => {
      navigate("/home");
   }
*/
	return (
		<>
			<div clasName="row ">
				<img
					src={Corona_logo}
					alt="Logo"
					width="40%"
					height="40%"
					className="mt-5 mb-5 ml-2 pl-2 center"
				/>
			</div>
			<div className="logOut_main">
				<Stack spacing={2} justifyContent="flex-start" alignItems="center">
					<Typography variant="h2" className="center mt-5">
						LOGGED OUT
					</Typography>
					<Typography variant="caption" className="center mt-0">
						Gracias por usar Programas de fidelización amigos Corona
					</Typography>
               <SignInButton
							caption="Ingresar de nuevo"
							className="btn-primary"
							startIcon={<LoginIcon />}
						/>               
				</Stack>
			</div>
         <div>
            <Footer/>
         </div>
		</>
	);
};
