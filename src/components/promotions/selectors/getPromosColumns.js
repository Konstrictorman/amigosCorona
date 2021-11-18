import dateFormat from "dateformat";
import { format, compareAsc, parseISO } from 'date-fns';
import {utcToZonedTime, zonedTimeToUtc} from 'date-fns-tz';
import esLocale from 'date-fns/locale/es';
import { getSalesPointById } from "../../salesPoint/selectors/getSalesPointById";

const dateFormatter = (date) => {
   let d = parseISO(date);
   const offSet = d.getTimezoneOffset();
   d = new Date(d.valueOf() + offSet * 60 * 1000);
   d = format(d, 'dd/MM/yyyy');
   //console.log(d);
   return d;
   //return dateFormat(date, "dd/mm/yyyy HH:mm:ss");   
}

const getSalesPointName = (id) => {
   const sp = getSalesPointById(id);
   return sp?.name? sp.name : '';
}

export const getPromosColumns = () => {
   const columns = [
      /*{ field: "id", headerName: "ID", width: 50, headerClassName: 'headerCol',headerAlign: 'center', align: 'center' ,cellClassName: 'clickableCell'},*/
      { 
         field: "name", 
         headerName: "Nombre", 
         width: 110, 
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         cellClassName: 'clickableCell',
         type: 'string'
      },
      { 
         field: "idArticulo", 
         headerName: "Artículo", 
         width: 100, 
         headerClassName: 'headerCol',
         headerAlign: 'center',
         type: 'number'
      },
      {
          field: "fechaInicio", 
          headerName: "F. inicial vigencia", 
          width: 130, 
          headerClassName: 'headerCol',
          headerAlign: 'center',
          align: 'center',          
          type: 'dateTime',
          valueFormatter: ({ value }) => dateFormatter(value),
      },
      { 
         field: "fechaFin", 
         headerName: "F. final vigencia", 
         width: 130, 
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',         
         type: 'dateTime',         
         valueFormatter: ({ value }) => dateFormatter(value),          
      },
      {
         field: "tipoPromo",
         headerName: "Tipo prom.",
         width: 120,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',
         type: 'string'
      },
      {
         field: "pctPromo",
         headerName: "%",
         width: 50,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',
         type: 'number'
      },      
      {
         field: "flagExclusion",
         headerName: "Excluido",
         width: 90,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',
         type: 'boolean',
      },    
      {
         field: "flagTodos",
         headerName: "Todos",
         width: 70,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',
         type: 'boolean',
      },    
      {
         field: "idPuntoVenta",
         headerName: "Pto de venta",
         width: 120,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',
         type: 'string',
         valueFormatter: ({ value }) => getSalesPointName(value),  
      },              
   ];   
   return columns;   
}