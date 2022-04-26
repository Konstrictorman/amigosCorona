import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import queryString from "query-string";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Button, FormHelperText, Grid, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { Spinner } from "../general/Spinner";
import { getSalesPointById } from "./selectors/getSalesPointById";
import Swal from "sweetalert2";
import { FieldsComboBox } from "../fields/FieldsComboBox";
import { useSelector } from "react-redux";
import { updateSalesPoint, addSalesPoint } from "./actions/salesPointActions";
import { ERROR_MSG } from "../../config/config";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

export const SalesPoint = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);
	const componentMounted = useRef(true);
	const items = useSelector((state) => state.lists.estados);
	const [loading, setLoading] = useState(false);
	const [disabledBtn, setDisabledBtn] = useState(true);
	const [formState, setFormState] = useState({
		id: 0,
		puntoVenta: "",
		descripcion: "",
		estado: "",
	});

	const { puntoVenta, descripcion, estado } = formState;

	useEffect(() => {
		const salesPoint = async (id) => {
			setLoading(true);
			try {
				const data = await getSalesPointById(id);

				if (componentMounted.current) {
					setFormState(data);
				}
			} catch (e) {
				console.log(e);
				setDisabledBtn(true);
				Swal.fire("Error", e.message + ` - ${ERROR_MSG}`, "error");
			}

			setLoading(false);
		};

		salesPoint(id);
		return () => {
			componentMounted.current = false;
			setLoading(null);
			setDisabledBtn(true);
		};
	}, [id]);

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		navigate,
		path: "/salesPointList",
	});

	//Desestructura del event, el objeto target en el argumento
	const handleInputChange = ({ target }) => {
		setFormState({
			...formState,
			[target.name]: target.value,
		});
		setDisabledBtn(false);
		console.log("sp?:", formState);
	};

	const handleSave = () => {
		setLoading(true);
		if (id) {
			updateSalesPoint(formState.id, formState)
				.then((response) => {
					setLoading(false);
					Swal.fire(
						"Cambio exitoso",
						"El registro se modificó con éxito",
						"success"
					);
				})
				.catch((e) => {
					setLoading(false);
					setDisabledBtn(true);
					Swal.fire("Error", e.message, "error");
				});
		} else {
			addSalesPoint(formState)
				.then((response) => {
					setLoading(false);
					Swal.fire(
						"Registro exitoso",
						"El registro se agregó con éxito",
						"success"
					);
				})
				.catch((e) => {
					setLoading(false);
					setDisabledBtn(true);
					Swal.fire("Error", e.message, "error");
				});
		}
	};

	if (loading) {
		return <Spinner />;
	}

	return (
		<div
			className={
				"d-flex flex-column container animate__animated " + animatedStyle
			}
		>
			{formState && (
				<h4 className="title align-self-center" style={{ width: "100%" }}>
					Punto de venta{" "}
					{formState?.descripcion ? formState.descripcion : "nuevo"}
				</h4>
			)}
			<div
				className="align-self-center"
				style={{
					width: "100%",
				}}
			>
				{formState && (
					<form className="container__form">
						<Grid container spacing={2}>
							<Grid item xs={8}>
								<Item>
									<TextField
										label="Nombre"
										error={false}
										id="puntoVenta"
										type="text"
										name="puntoVenta"
										autoComplete="off"
										size="small"
										required
										value={puntoVenta}
										onChange={handleInputChange}
										className="form-control"
									/>
								</Item>
								<FormHelperText className="helperText">
									{" "}
								</FormHelperText>
							</Grid>

							<Grid item xs={4}>
								<Item>
									<FieldsComboBox
										id="estado"
										index="2"
										label="Estado"
										value={estado}
										items={items}
										handleChange={handleInputChange}
									/>
								</Item>
							</Grid>

							<Grid item xs={12}>
								<Item>
									<TextField
										label="Descripción"
										error={false}
										id="descripcion"
										type="text"
										name="descripcion"
										autoComplete="off"
										size="small"
										required
										value={descripcion}
										onChange={handleInputChange}
										className="form-control"
										minRows={2}
										maxRows={2}
										multiline={true}
									/>
								</Item>
								<FormHelperText className="helperText">
									{" "}
								</FormHelperText>
							</Grid>

							<Grid></Grid>

							<Grid item xs={12} />
							<Grid item xs={12} />
						</Grid>
					</form>
				)}
				<Button
					variant="contained"
					className="mt-3 mx-2 btn-error"
					startIcon={<ClearIcon />}
					style={{ textTransform: "none" }}
					onClick={handleClickOut}
				>
					Cancelar
				</Button>
				<Button
					variant="contained"
					className="mt-3 mx-2 btn-primary"
					startIcon={<CheckIcon />}
					style={{ textTransform: "none" }}
					type="submit"
					onClick={handleSave}
					disabled={disabledBtn}
				>
					Guardar
				</Button>
			</div>
		</div>
	);
};
