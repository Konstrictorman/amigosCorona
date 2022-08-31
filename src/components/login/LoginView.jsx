import React from "react";
import { Stack, Typography } from "@mui/material";
import Corona_logo from "../../assets/images/centroCorona.png";
import LoginIcon from "@mui/icons-material/Login";
import { SignInButton } from "./SignInButton";


export const LoginView = (props) => {
	return (
		<div>
			<div className="login_container">
				<div className="login_box">
					<Stack
						spacing={2}
						justifyContent="flex-start"
						alignItems="center"
					>
						{" "}
						<div className="login_logo_container">
							<img src={Corona_logo} alt="Logo" className="login_logo" />
						</div>
						<Typography variant="h2" className="center mt-5">
							CC FIDELIZACIÓN
						</Typography>
						<Typography
							variant="subtitle1"
							className="center mt-0"
							sx={{ color: "whitesmoke" }}
						>
							Bienvenido al programa de fidelización amigos Corona
						</Typography>
						<SignInButton
							caption="Ingresar"
							className="btn-warning login_button"
							startIcon={<LoginIcon />}
						/>
					</Stack>
				</div>
			</div>
		</div>
	);
};
