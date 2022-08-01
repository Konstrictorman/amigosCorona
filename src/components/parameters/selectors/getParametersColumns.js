import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem } from "@mui/x-data-grid";

export const getParametersColumns = (handleDelete)=> {
   const columns = [
		{
			field: "parametro",
			headerName: "Nombre",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			//cellClassName: "clickableCell",
         align: "center",
		},
		{
			field: "valor",
			headerName: "Valor",
			flex: 1.5,
			headerClassName: "headerCol",
			headerAlign: "center",
		},
      {
         field: "actions", 
         type: 'actions',
         headerName: "Eliminar", 
         headerClassName: 'headerCol',         
         getActions: (params) => [
            <GridActionsCellItem icon={<DeleteIcon/>} label="Eliminar" 
            disabled={params.row.actionDisabled}
            onClick={() => {
               
               handleDelete(params.id);
            }}/>
         ]
      }, 
   ];

   return columns;
}