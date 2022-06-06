import { currencyFormatter } from "../../../helpers/currencyFormatter";
import { dateFormatter } from "../../../helpers/dateFormatter";

export const getMovementsColumns = () => {
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
         field: "idRegistroMovimiento", 
         headerName: "ID proceso", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'number'
      }, 
      { 
         field: "motivo", 
         headerName: "Motivo", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'string'
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
         field: "valor", 
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