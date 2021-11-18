import React, { useMemo } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { getSalesPoints } from "../salesPoint/selectors/getSalesPoints";
import { getPromoById } from "./selectors/getPromoById";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import { useForm } from "react-hook-form";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";
import { Button,Grid, Input, TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import esLocale from "date-fns/locale/es";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "../../assets/styles/global.css";
import { createStyles, withStyles } from "@mui/styles";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));


const CssTextField = withStyles({
   root: {
      
      '& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
         padding: '0px 5px 0px 10px' ,
         margin: 0,  
         height: '26px',       
      },
     '& .css-i4bv87-MuiSvgIcon-root' : {
        fontSize: '24px',
     },
     '& .MuiOutlinedInput-root': {
       '& fieldset': {
         borderColor: 'rgba(255,255,255,0)',
       },
       '&:hover fieldset': {
         borderColor: 'rgba(255,255,255,0)',
       },
       '&.Mui-focused fieldset': {
         borderColor: 'rgba(255,255,255,0)',
       },     
     },
   },
 })(TextField);

export const Promotion = () => {
	const history = useHistory();
	const location = useLocation();
	const { id = "" } = queryString.parse(location.search);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const promo = useMemo(() => getPromoById(id), [id]);

	const salePoints = getSalesPoints();

	const sortSalesPoints = () => {
		const array = salePoints.sort((a, b) => a.name.localeCompare(b.name));
		console.log(JSON.stringify(array));
		return array;
	};

	const sortedSalePoints = useMemo(() => sortSalesPoints(), [salePoints]);

	const onSubmit = (data) => {
		console.log("submitting:", data);
	};

	const [animatedStyle, handleClickOut] = useAnimatedStyle({
		history,
		path: "/promotionsList",
	});

   const [value, setValue] = React.useState(null);

	return (
		<div
			className={"container animate__animated " + animatedStyle}
			style={{ overflow: "hidden" }}
		>
			<h4 className="title">
				Promoción / Exclusión {promo?.id ? promo.name : "nueva"}
			</h4>
			<div>
				<form
					className="form border border-primary rounded"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Item>
								<label for="name">Nombre</label>
								<Input
									id="name"
									type="text"
									className="form__control inputBox"
									name="name"
									autoComplete="off"
                           disableUnderline={true}
									defaultValue={promo?.name}
									{...register("name", {
										required: true,
										maxLength: 50,
										minLength: 5,
										pattern: /^[A-Za-z]+$/i,
									})}
								/>

								{errors?.name?.type === "required" && (
									<p className="error">Dato obligatorio</p>
								)}
								{errors?.name?.type === "maxLength" && (
									<p className="error">
										La longitud máxima es de 50 caracteres
									</p>
								)}
								{errors?.name?.type === "minLength" && (
									<p className="error">
										la longitud mínima es de 5 caracteres
									</p>
								)}
								{errors?.name?.type === "pattern" && (
									<p className="error">
										Solamente se permiten caracteres alfabéticos
									</p>
								)}
							</Item>
						</Grid>

						<Grid item xs={6}>
							<Item>
								<label for="startDate">Fecha inicio vigencia</label>
								<LocalizationProvider
									dateAdapter={AdapterDateFns}
									locale={esLocale}
								>
									<DatePicker
										name="startDate"
                              value={value}
                              onChange={(newValue) => {
                                 setValue(newValue);
                              }}										
										renderInput={(params) => (
											<CssTextField 
                                    name="startDate" 
                                    {...params} 
                                    className="form__control calendar" 
                                    margin="dense"
                                    variant="outlined"
                                    
                                 />
										)}
                              sx={{'padding':'0px !important'}}
									/>
								</LocalizationProvider>
							</Item>
						</Grid>
						<Grid item xs={6}>
							<Item>
								<label for="description">Artículo</label>
								<Input
									id="article"
									type="text"
									className="form__control inputBox"
									name="article"
									autoComplete="off"
                           disableUnderline={true}
									defaultValue={promo?.idArticulo}
									{...register("article", {
										required: true,
										maxLength: 100,
										minLength: 5,
									})}
								/>
								{errors?.description?.type === "required" && (
									<p className="error">Dato obligatorio</p>
								)}
								{errors?.description?.type === "maxLength" && (
									<p className="error">
										La longitud máxima es de 100 caracteres
									</p>
								)}
								{errors?.description?.type === "minLength" && (
									<p className="error">
										la longitud mínima es de 5 caracteres
									</p>
								)}
							</Item>
						</Grid>

						<Grid item xs={6}>
							<Item>
								<label for="state">Punto de venta</label>
								<select
									id="salesPoint"
									name="salesPoint"
									className="form__select inputBox"
									value={promo?.idPuntoVenta}
									{...register("salesPoint")}
								>
									<option value="">...</option>
									{sortedSalePoints.map((sp) => (
										<option key={sp.id} value={sp.id}>
											{sp.name}
										</option>
									))}
								</select>
							</Item>
						</Grid>
						<Grid></Grid>

						<Grid item xs={12} />
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
					>
						Guardar
					</Button>
				</div>
			</div>
		</div>
	);
};
