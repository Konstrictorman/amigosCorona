import { format, parseISO } from 'date-fns';
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
         field: "tipoPromo", 
         headerName: "Nombre", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         cellClassName: 'clickableCell',
         type: 'string'
      },
      { 
         field: "idArticulo", 
         headerName: "Artículo", 
         flex:0.8,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         type: 'number'
      },

      {
          field: "fechaInicio", 
          headerName: "F. inicial vigencia", 
          flex:1,
          //width: 155, 
          headerClassName: 'headerCol',
          headerAlign: 'center',
          align: 'center',          
          type: 'dateTime',
          valueFormatter: ({ value }) => dateFormatter(value),
      },
      { 
         field: "fechaFin", 
         headerName: "F. final vigencia", 
         flex:1,
         //width: 155, 
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',         
         type: 'dateTime',         
         valueFormatter: ({ value }) => dateFormatter(value),          
      },

      {
         field: "pctPromo",
         headerName: "%",
         flex:0.4,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',
         type: 'number'
      },    

      {
         field: "flagExclusion",
         headerName: "Excluido",
         flex:0.8,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',
         type: 'boolean',
      },    
            
      {
         field: "flagTodos",
         headerName: "Todos",
         flex:0.7,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',
         type: 'boolean',
      },    

      {
         field: "idPuntoVenta",
         headerName: "Pto de venta",
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',
         type: 'string',
         //valueFormatter: ({ value }) => getSalesPointName(value),  
      },          
 
   ];   
   return columns;   
}