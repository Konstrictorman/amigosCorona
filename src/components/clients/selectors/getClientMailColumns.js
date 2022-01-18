export const getClientMailColumns = () => {
   const columns = [
      {
         field: "tipoMail",
         headerName: "Tipo",
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'left'         
      },
      {
         field: "mail",
         headerName: "E-mail",
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