import { format } from "date-fns";
import parseISO from "date-fns/parseISO";

const dateFormatter = (date) => {
   let d = parseISO(date);
   const offSet = d.getTimezoneOffset();
   d = new Date(d.valueOf() + offSet * 60 * 1000);
   d = format(d, 'dd/MM/yyyy');
   return d;
}

export const getAuditColumns = () => {
   const columns = [
      {
         field: "usuarioCreacion",
         headerName: "Añadido por",
         flex: 1,
         headerClassName: "headerCol",
         headerAlign: "center",
         align: "left",  
         type: 'string',                      
      },
      {
         field: "fechaCreacion",
         headerName: "Fecha de creación",
         flex: 1,
         headerClassName: "headerCol",
         headerAlign: "center",
         align: "center",  
         type: 'dateTime',         
         valueFormatter: ({ value }) => dateFormatter(value),         
      },
      {
         field: "usuarioModificacion",
         headerName: "Modificado por",
         flex: 1,
         headerClassName: "headerCol",
         headerAlign: "center",
         align: "left",  
         type: 'string',                      
      },
      {
         field: "fechaModificacion",
         headerName: "Fecha de modificación",
         flex: 1,
         headerClassName: "headerCol",
         headerAlign: "center",
         align: "center",        
         type: 'dateTime',         
         valueFormatter: ({ value }) => dateFormatter(value),         

      },                  
   ];
   return columns;
}