import { format, parseISO } from 'date-fns';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import { GridActionsCellItem } from "@mui/x-data-grid";

const dateFormatter = (date) => {
   let d = parseISO(date);
   const offSet = d.getTimezoneOffset();
   d = new Date(d.valueOf() + offSet * 60 * 1000);
   d = format(d, 'dd/MM/yyyy');
   return d;
}
/*
const getSalesPointName = async (id) => {
   const sp = await getSalesPointById(id);
   console.log(id, sp);
   return sp.descripcion;
}
*/
export const getRedemptionBasicColumns = (handleRevert) => {
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
         field: "idCliente", 
         headerName: "Id Cliente", 
         flex:0.6,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string'         
      },
      {
         field: "puntoVenta", 
         headerName: "Pto de venta", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'string',
         //valueFormatter: ({ value }) => getSalesPointName(value),           
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
         field: "estadoRedencion", 
         headerName: "Estado", 
         flex:0.4,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string'   
      },    
      {
         field: "tipoRedencion", 
         headerName: "Tipo", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string'   
      },        
      {
         field: "transId", 
         headerName: "Bono/Transacción", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string'   
      },              
      {
         field: "revertir", 
         headerName: "Revertir", 
         flex:0.6,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'actions',
         /*
         valueGetter: ()=>("Revertir"),
         cellClassName: (params) => {
            let css = "";
            if (params.getValue(params.id, 'estadoRedencion') === 'Ok') {
               css = "btn btn-primary btn-sm";
            } else {
               css = "btn btn-primary btn-sm disabled";
            }
            return css;
         },*/
         getActions: (params) => [
            <GridActionsCellItem icon={<FastRewindIcon/>} label="Eliminar" 
            disabled={params.row.actionDisabled}
            onClick={() => {               
               handleRevert(params.row);
            }}/>
         ]         
      },        
   ];
   return columns;
}