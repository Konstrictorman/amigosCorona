import { styled } from "@mui/material/styles";
import {
	Autocomplete,
	Button,
	FormHelperText,
	Grid,
	MenuItem,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { useCustomForm } from "../customHooks/useCustomForm";
import { getClientByCode } from "../clients/selectors/getClientByCode";
import UploadIcon from "@mui/icons-material/Upload";
import { useMemo } from "react";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SellIcon from "@mui/icons-material/Sell";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { getSalesPoints } from "../salesPoint/selectors/getSalesPoints";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

export const Redemption = () => {
	const navigate = useNavigate();
	const salesPoints = getSalesPoints();
	const [idRef, setIdRef] = useState(null);

	const sortedSalesPoints = useMemo(() => {
		const array = salesPoints
			.slice()
			.sort((a, b) => a.name.localeCompare(b.name));

		let options = [];
		array.map((i) => {
			let obj = {};
			obj["id"] = i.id;
			obj["label"] = i.name;
			options.push(obj);
         return '';
		});
		return options;
	}, [salesPoints]);

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/redemptionsList",
	});

	const redemptionTypesList = [
		{ id: 1, label: "Nequi" },
		{ id: 2, label: "Bono" },
	];

	const [formValues, handleInputChange] =
		useCustomForm({
			codReferrer: "",
			redemptionType: "",
			amount: "",
			salesPoint: "",
			ref: "",
			newBalance: "",
		});

	const { codReferrer, redemptionType, amount, salesPoint, ref, newBalance } =
		formValues;

	//const referrer = useMemo(() => getClientByCode(codReferrer), [codReferrer]);
	const [referrer, setReferrer] = useState(null);

	const name = useMemo(() => {
		if (referrer) {
			return (
				referrer?.primerNombre +
				" " +
				referrer?.segundoNombre +
				" " +
				referrer?.primerApellido +
				" " +
				referrer?.segundoApellido
			);
		} else {
			return "";
		}
	}, [referrer]);

	const getIdReference = () => {
		let n = Math.floor(100000 + Math.random() * 900000);
		return "BON" + n;
	};

	const handleClick = (e) => {
		setReferrer(getClientByCode(codReferrer));
		setIdRef(getIdReference());
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formValues);
	};

	return (
		<div
			className={" d-flex flex-column   animate__animated " + animatedStyle}
		>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Redención nueva
			</h4>

			<div
				className="align-self-center"
				style={{
					width: "100%",
				}}
			>
				<form
					className="container__form"
					onSubmit={handleSubmit}
				>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Item className="half-quarter-width right">
								<TextField
									label="Código referenciador"
									error={false}
									id="codReferrer"
									type="text"
									name="codReferrer"
									autoComplete="off"
									size="small"
									required
									value={codReferrer}
									onChange={handleInputChange}
									className="form-control"
								/>
							</Item>
							<FormHelperText className="helperText"> </FormHelperText>
						</Grid>

						<Grid item xs={6}>
							<Button
								color="primary"
								variant="contained"
								className="mt-1"
								startIcon={<UploadIcon />}
								style={{ textTransform: "none" }}
								type="button"
								onClick={handleClick}
							>
								Cargar información
							</Button>
						</Grid>

						<Grid item xs={12} />

						{referrer && (
							<Grid container spacing={2} className="container__grid">
								<Grid item xs={12}>
									<AssignmentIndIcon color="primary" />
									<Typography variant="caption" className="left-align">
										Información acumulada referenciador
									</Typography>
								</Grid>

								<Grid item xs={8} className="grid-item">
									<Item className="">
										<TextField
											label="Nombre"
											error={false}
											id="name"
											type="text"
											name="name"
											autoComplete="off"
											size="small"
											value={name}
											onChange={handleInputChange}
											className="form-control"
											disabled={true}
										/>
									</Item>
								</Grid>

								<Grid item xs={4} className="grid-item">
									<Item className="half-quarter-width">
										<TextField
											label="N° Celular Nequi"
											error={false}
											id="nequi"
											type="text"
											name="nequi"
											autoComplete="off"
											size="small"
											value={0}
											onChange={handleInputChange}
											className="form-control"
											disabled={true}
										/>
									</Item>
								</Grid>

								<Grid item xs={4} className="">
									<Item className="half-quarter-width">
										<TextField
											label="Saldo disponible"
											error={false}
											id="newBalance"
											type="text"
											name="newBalance"
											autoComplete="off"
											size="small"
											value={0}
											onChange={handleInputChange}
											className="form-control"
											disabled={true}
										/>
									</Item>
								</Grid>
							</Grid>
						)}

						{referrer && (
							<Grid container spacing={2} className="container__grid">
								<Grid item xs={12}>
									<SellIcon color="primary" />
									<Typography variant="caption" className="left-align">
										Información redención
									</Typography>
								</Grid>

								<Grid item xs={4}>
									<Item>
										<TextField
											label="Tipo redención"
											error={false}
											id="redemptionType"
											select
											name="redemptionType"
											size="small"
											value={redemptionType}
											onChange={handleInputChange}
											className="form-control"
											required
										>
											<MenuItem value="">...</MenuItem>
											{redemptionTypesList.map((type) => (
												<MenuItem key={type.name} value={type.name}>
													{type.label}
												</MenuItem>
											))}
										</TextField>
									</Item>
									<FormHelperText className="helperText">
										{" "}
									</FormHelperText>
								</Grid>

								<Grid item xs={4} className="">
									<Item className="">
										<TextField
											label="Id bono / transferencia Nequi"
											error={false}
											id="redemptionId"
											type="text"
											name="redemptionId"
											autoComplete="off"
											size="small"
											value={idRef}
											//onChange={handleInputChange}
											className="form-control"
											disabled={true}
											required
										/>
									</Item>
									<FormHelperText className="helperText">
										{" "}
									</FormHelperText>
								</Grid>

								<Grid item xs={4} className="">
									<Item className="half-quarter-width">
										<TextField
											label="Monto redención"
											error={false}
											id="amount"
											type="number"
											name="amount"
											autoComplete="off"
											size="small"
											value={amount}
											onChange={handleInputChange}
											className="form-control"
											disabled={false}
											required
										/>
									</Item>
									<FormHelperText className="helperText">
										{" "}
									</FormHelperText>
								</Grid>

								<Grid item xs={4} className="">
									<Item className="">
										<Autocomplete
											disablePortal
											id="salesPoint"
											options={sortedSalesPoints}
											renderInput={(params) => (
												<TextField
													{...params}
													className="form-control"
													size="small"
													label="Punto de venta"
													onChange={handleInputChange}
													value={salesPoint}
													required
												/>
											)}
										/>
									</Item>
									<FormHelperText className="helperText">
										{" "}
									</FormHelperText>
								</Grid>

								<Grid item xs={4} className="">
									<Item className="">
										<TextField
											label="Referencia"
											error={false}
											id="ref"
											type="text"
											name="ref"
											autoComplete="off"
											size="small"
											value={ref}
											onChange={handleInputChange}
											className="form-control"
											disabled={false}
											required
										/>
									</Item>
									<FormHelperText className="helperText">
										{" "}
									</FormHelperText>
								</Grid>

								<Grid item xs={4} className="">
									<Item className="half-quarter-width">
										<TextField
											label="Nuevo saldo"
											error={false}
											id="newBalance"
											type="number"
											name="newBalance"
											autoComplete="off"
											size="small"
											value={newBalance}
											onChange={handleInputChange}
											className="form-control"
											disabled={false}
											required
										/>
									</Item>
									<FormHelperText className="helperText">
										{" "}
									</FormHelperText>
								</Grid>
							</Grid>
						)}
					</Grid>
				</form>

				<div>
					<Button
						color="error"
						variant="contained"
						className="mt-3 mx-2"
						startIcon={<ClearIcon />}
						style={{ textTransform: "none" }}
						onClick={handleClickOut}
					>
						Cancelar
					</Button>
					<Button
						color="primary"
						variant="contained"
						className="mt-3 mx-2"
						startIcon={<CheckIcon />}
						style={{ textTransform: "none" }}
						type="submit"
						onClick={handleSubmit}
					>
						Guardar
					</Button>
				</div>
			</div>
		</div>
	);
};
