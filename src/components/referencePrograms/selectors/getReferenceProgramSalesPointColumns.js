export const getReferenceProgramSalesPointColumns = () => {
   const columns = [
      {
         field: "name",
         headerName: "Punto de venta",
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center'
      },
      {
         field: "description",
         headerName: "Descripción",
         flex:4,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'left'
      },
      {
         field: "flagActivo",
         headerName: "Habilitado para programa",
         flex:2,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',
         type: 'boolean',
         editable: true,
      }            
   ];
   return columns;
}