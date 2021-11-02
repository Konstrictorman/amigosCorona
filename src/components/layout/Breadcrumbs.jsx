import { Link } from "@mui/material";
import React from "react";

export const Breadcrumbs = (props) => {

   console.log(props);

   const numeros = [2,4,6,8,10];


	return (
		<>
			<Breadcrumbs separator=">" aria-label="breadcrumb">
				{numeros.map(item => (
					<Link underline="hover" color="inherit" href="/">
						item
					</Link>
				))}
			</Breadcrumbs>
		</>
	);
};
