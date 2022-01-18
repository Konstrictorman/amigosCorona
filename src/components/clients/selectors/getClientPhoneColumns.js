export const getClientPhoneColumns = () => {
   const columns = [
      {
         field: "tipoTelefono",
         headerName: "Tipo",
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'left'         
      },       
      {
         field: "telefono",
         headerName: "Teléfono",
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'left'         
      },
 
      {
         field: "principal",
         headerName: "Principal",
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',
         type: 'boolean',
      },                  
   ];
   return columns;   
}