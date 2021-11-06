import React, { useState } from "react";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { DataTable } from "../general/DataTable";
import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useAnimatedStyle } from "../customHooks/useAnimatedStyle";


const columns = [
	{ field: "id", headerName: "ID", width: 120 },
	{ field: "firstName", headerName: "First name", width: 200 },
	{ field: "lastName", headerName: "Last name", width: 200 },
	{
		field: "age",
		headerName: "Age",
		type: "number",
		width: 120,
	},
	{
		field: "fullName",
		headerName: "Full name",
		description: "This column has a value getter and is not sortable.",
		sortable: false,
		width: 160,
		valueGetter: (params) =>
			`${params.getValue(params.id, "firstName") || ""} ${
				params.getValue(params.id, "lastName") || ""
			}`,
	},
];

const rows = [
	{ id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
	{ id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
	{ id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
	{ id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
	{ id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
	{ id: 6, lastName: "Melisandre", firstName: null, age: 150 },
	{ id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
	{ id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
	{ id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export const SalesPointList = ({history}) => {
   
   const [selectedIds, setSelectedIds] = useState([]);

  
   const handleRowChange = (ids) => {
      console.log('Ids:',ids);
      setSelectedIds(ids);
   }

   const [animatedStyle, handleClick] = useAnimatedStyle(
      {
         history,
         path: '/salesPointNew'
      }
   )


	return (
		<div className={"text-center animate__animated " + animatedStyle} style={{'overflow': 'hidden'}}>
			<h4 className="title">Puntos de venta</h4>
			<div>
				<div
					style={{ height: 600, width: "100%", backgroundColor:"whitesmoke"}}
				>
               {
					<DataTable
               
						rows={rows}
						columns={columns}
						pageSize={5}
                  onSelectionModelChange={(ids) => handleRowChange(ids)}
					/>
               }

				</div>
			</div>

			<Button
				className="mt-3 mx-2"
				color="error"
				variant="contained"
				style={{ textTransform: "none" }}
				startIcon={<DeleteForeverIcon />}
				disabled={!selectedIds.length > 0}
			>
				Eliminar punto(s) de venta seleccionado(s)
			</Button>
			<Button
				className="mt-3 mx-2"
				color="primary"
				variant="contained"
				style={{ textTransform: "none" }}
				startIcon={<PointOfSaleIcon />}
            onClick={handleClick}
			>
				Crear nuevo punto de venta
			</Button>
		</div>
	);
};
