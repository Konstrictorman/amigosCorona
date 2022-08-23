import { dateFormatter2 } from "../../../helpers/dateFormatter";


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
         valueFormatter: ({ value }) => dateFormatter2(value),
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
         valueFormatter: ({ value }) => dateFormatter2(value),
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
         headerName: "Descripción estado", 
         flex:2,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string'   
      },                   
   ];
   return columns;
}