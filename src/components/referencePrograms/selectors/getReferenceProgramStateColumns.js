import { format, parseISO } from 'date-fns';

const dateFormatter = (date) => {
   let d = parseISO(date);
   const offSet = d.getTimezoneOffset();
   d = new Date(d.valueOf() + offSet * 60 * 1000);
   d = format(d, 'dd/MM/yyyy');
   return d;
}


export const getReferenceProgramStateColumns = () => {
   const columns = [
      {
         field: "estado",
         headerName: "Estado",
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',
      },
      {
         field: "fechaReferencia",
         headerName: "Fecha de referencia",
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',
         type: 'dateTime',    
         valueFormatter: ({ value }) => dateFormatter(value),        
      },
   ];
   return columns;
}