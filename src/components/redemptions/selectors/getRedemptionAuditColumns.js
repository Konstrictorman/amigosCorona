import { format, parseISO } from 'date-fns';

const dateFormatter = (date) => {
   let d = parseISO(date);
   const offSet = d.getTimezoneOffset();
   d = new Date(d.valueOf() + offSet * 60 * 1000);
   d = format(d, 'dd/MM/yyyy');
   return d;
}

export const getRedemptionAuditColumns = () => {
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
         field: "fechaCreacion", 
         headerName: "Fecha Creación", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'dateTime',
         valueFormatter: ({ value }) => dateFormatter(value),
      },   
      {
         field: "usariosCreacion", 
         headerName: "Creado por", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string'   
      },            

      {
         field: "fechaModificacion", 
         headerName: "Fecha Modificación", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'dateTime',
         valueFormatter: ({ value }) => dateFormatter(value),
      },   
      {
         field: "usariosModificacion", 
         headerName: "Modificado por", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string'   
      },       
      {
         field: "descrEstado", 
         headerName: "Descrición estado", 
         flex:2,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string'   
      },                   
   ];
   return columns;
}