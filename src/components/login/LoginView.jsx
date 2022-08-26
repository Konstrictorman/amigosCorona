import React from "react";
import {
	Box,
	Button,
	Grid,
	Paper,
	Stack,
	styled,
	Typography,
} from "@mui/material";
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
						<img
							src={Corona_logo}
							alt="Logo"
							className="mt-5 mb-5 ml-2 pl-2 center login_logo"
						/>

						<Typography variant="h2" className="center mt-5" >
							CC FIDELIZACIÓN
						</Typography>
						<Typography variant="caption" className="center mt-0" sx={{color:"whitesmoke"}}>
							Bienvenido al programa de fidelización amigos Corona
						</Typography>

						<Button
							onClick={handleClick}
							variant="contained"
							className="btn-warning"
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
