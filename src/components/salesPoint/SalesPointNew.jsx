import React from 'react';
import { Button, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { useForm } from '../customHooks/useForm';
import "../../assets/styles/global.css";
import { useAnimatedStyle } from '../customHooks/useAnimatedStyle';


const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

export const SalesPointNew = ({history}) => {
   
   const [formValues, handleInputChange] = useForm(
      {
         name: '',
         description: '',
         state: '',
      }
   )

   const {name,description,state} = formValues;

	const handleSubmit = (e) => {
      e.preventDefault();
		console.log("submitting:" ,formValues);
		/*
      
      if (inputValue.trim().length > 2) {
         setCategories(cats => [inputValue, ...cats]);
         setInputValue('');
      } 
      */
	};   

   const [animatedStyle, handleClickOut] = useAnimatedStyle(
      {
         history,
         path: '/salesPointList'
      }
   )

	return (
		<div className={"text-center animate__animated " + animatedStyle} style={{'overflow': 'hidden'}}>
			<h4 className="title">Nuevo punto de venta</h4>
			<div>
				<form className="form border border-primary rounded" onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Item>
								<input
									type="text"
									className="form-control"
									placeholder="Punto de venta"
									aria-label="Punto de venta"
                           value={name}
                           name="name"
                           onChange={handleInputChange}
                           autoComplete="off"                           
								/>
							</Item>
						</Grid>

						<Grid item xs={12}>
							<Item>
								<input
									type="text"
									className="form-control"
									placeholder="Descripción"
									aria-label="Descripción"
                           value={description}
                           name="description"
                           onChange={handleInputChange}
                           autoComplete="off"
								/>
							</Item>
						</Grid>

						<Grid item xs={6}>
							<Item>
								<select
                           value={state}
                           name="state"
                           onChange={handleInputChange}
									className="form-select"
									aria-label="Default select example"
								>
									<option className="form-control">Estado</option>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
								</select>
							</Item>
						</Grid>
						<Grid item xs={6} className="text-start">
							<Button
								className="mt-2"
								color="warning"
								variant="contained"
								style={{ textTransform: "none" }}
								startIcon={<VisibilityIcon />}
							>
								Ver Exclusiones/Promociones
							</Button>
						</Grid>
						<Grid item xs={12} />
						<Grid item xs={12} />


						<Grid item xs={6} className="text-end">
							<Button
								color="error"
								variant="contained"
								startIcon={<ClearIcon />}
								style={{ textTransform: "none" }}
                        onClick={handleClickOut}
							>
								Cancelar
							</Button>
						</Grid>
						<Grid item xs={6} className="text-start">
							<Button
								color="primary"
								variant="contained"
								startIcon={<CheckIcon />}
								style={{ textTransform: "none" }}
                        onClick={handleSubmit}
							>
								Guardar
							</Button>
						</Grid>                  
					</Grid>
				</form>
			</div>
		</div>
	);
}
