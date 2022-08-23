import { currencyFormatter } from "../../../helpers/currencyFormatter";
import { dateFormatter } from "../../../helpers/dateFormatter";

export const getMovementsColumns = (motives) => {

   const getDescMotivo = (val) => {
      if (motives) {
         const desc = motives.find(e=> e.valor === val);
         if (desc) {
            return desc.descripcion;
         } else {
            return val;
         }
         
      } else {
         return val;
      }
   }

   const columns = [
      { 
         field: "fechaAsigna", 
         headerName: "Fecha", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'date',
         valueFormatter: ({ value }) => dateFormatter(value),
      },         
      { 
         field: "idProceso", 
         headerName: "ID proceso", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'string'
      }, 
      { 
         field: "motivo", 
         headerName: "Motivo", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'string',
         valueGetter: ({value})=> getDescMotivo(value),            
      },       
      { 
         field: "puntaje", 
         headerName: "Puntaje", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'number'
      },     
      { 
         field: "idFactura", 
         headerName: "Factura", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'string'
      },    
      { 
         field: "valorAcumulado", 
         headerName: "Monto", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'number',
         
         valueFormatter: ({ value }) => currencyFormatter(value),
      },           
  
   ]

   return columns;
}