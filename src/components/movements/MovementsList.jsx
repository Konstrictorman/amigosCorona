import React from 'react';
import { styled } from "@mui/material/styles";
import { Paper } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	paddingTop: theme.spacing(0.7),
	textAlign: "left",
	color: theme.palette.text.secondary,
}));

export const MovementsList = () => {

	//const columns = getBillColumns();
   //const [rows, setRows] = useState([])

   return (
      <div>
			<h4 className="title align-self-center" style={{ width: "100%" }}>
				Consulta de movimientos
			</h4>         
      </div>
   )
}
