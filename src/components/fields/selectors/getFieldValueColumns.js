import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem } from '@mui/x-data-grid';

export const getFieldValueColumns = (handleDelete) => {



   const columns = [
      {
         field: "descripcion", 
         headerName: "Nombre", 
         flex:2,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string',
      },    
      {
         field: "valor", 
         headerName: "Valor", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'string',
      },    
         
      {
         field: "valorPadre", 
         headerName: "Padre", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'string',
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