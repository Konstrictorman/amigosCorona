export const getFieldColumns = () => {
   const columns = [
      {
         field: "campo", 
         headerName: "Nombre", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string',
         cellClassName: 'clickableCell',         
      },
      {
         field: "descripcion", 
         headerName: "Descripción", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string',
      },
    
   ];
   return columns;
}