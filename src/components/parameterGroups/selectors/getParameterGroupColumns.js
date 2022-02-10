export const getParameterGroupColumns = () => {
   const columns = [
      {
         field: "grupoParametros", 
         headerName: "Nombre", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string',
         cellClassName: 'clickableCell',         
      },
      {
         field: "requierePunto", 
         headerName: "Requiere punto de venta", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'boolean',
      },      
      {
         field: "descripcion", 
         headerName: "Descripción", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string',
      }      
   ];
   return columns;
}