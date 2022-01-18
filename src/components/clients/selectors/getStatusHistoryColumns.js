import { format, parseISO } from 'date-fns';

const dateFormatter = (date) => {
   let d = parseISO(date);
   const offSet = d.getTimezoneOffset();
   d = new Date(d.valueOf() + offSet * 60 * 1000);
   d = format(d, 'dd/MM/yyyy');
   return d;
}



export const getStatusHistoryColumns = () => {
   const columns = [
      {
         field: "fechaReferencia",
         headerName: "Fecha de referencia",
         flex:1.5,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',
         type: 'dateTime',    
         valueFormatter: ({ value }) => dateFormatter(value),        
      },      
      {
         field: "estado",
         headerName: "Estado",
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',
      }
   ];
   return columns;
}