import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Corona_logo from "../../assets/images/centroCorona.png";
import LoginIcon from "@mui/icons-material/Login";

export const LoginView = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/home");
	};

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
							<img
								src={Corona_logo}
								alt="Logo"
								className="login_logo"
							/>
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
						<Button
							onClick={handleClick}
							variant="contained"
							className="btn-warning login_button"
							startIcon={<LoginIcon />}
						>
							Ingresar
						</Button>
					</Stack>
				</div>
			</div>
		</div>
	);
};
