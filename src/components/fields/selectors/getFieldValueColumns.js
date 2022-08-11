import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem } from "@mui/x-data-grid";


export const getFieldValueColumns = (handleDelete, valoresCampo) => {


   const getFatherName = (val) => {

      
      if (valoresCampo) {
         const desc = valoresCampo.filter(vc => vc.id===val);
         if (desc[0]) {
            return desc[0].descripcion;
         } else {
            return val;
         }
      } else {
         return val;
      }
   }

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
         //flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'string',
      },    
         
      {
         field: "idValorPadre", 
         headerName: "Padre", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'string',
         valueGetter: ({value})=> getFatherName(value),     
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