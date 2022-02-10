import { format, parseISO } from 'date-fns';
import { getSalesPointById } from '../../salesPoint/selectors/getSalesPointById';

const dateFormatter = (date) => {
   let d = parseISO(date);
   const offSet = d.getTimezoneOffset();
   d = new Date(d.valueOf() + offSet * 60 * 1000);
   d = format(d, 'dd/MM/yyyy');
   return d;
}

const getSalesPointName = (id) => {
   const sp = getSalesPointById(id);
   return sp?.name? sp.name : '';
}

export const getRedemptionBasicColumns = () => {
   const columns = [
      {
         field: "referencia", 
         headerName: "Id Ref", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string'   
      },      
      {
         field: "clienteRef", 
         headerName: "Id Cliente", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string'         
      },
      {
         field: "idPuntoVenta", 
         headerName: "Pto de venta", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'string',
         valueFormatter: ({ value }) => getSalesPointName(value),           
      },      
      {
         field: "fecha", 
         headerName: "Fecha", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'dateTime',
         valueFormatter: ({ value }) => dateFormatter(value),
      },      
      {
         field: "estado", 
         headerName: "Estado", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string'   
      },    
      {
         field: "redencion", 
         headerName: "Bono/Transacción", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string'   
      },              
      {
         field: "revertir", 
         headerName: "Acción", 
         flex:0.6,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         valueGetter: ()=>("Revertir"),
         cellClassName: (params) => {
            let css = "";
            if (params.getValue(params.id, 'estado') === 'Activo') {
               css = "btn btn-primary btn-sm";
            } else {
               css = "btn btn-primary btn-sm disabled";
            }
            return css;
         },
      },        
   ];
   return columns;
}