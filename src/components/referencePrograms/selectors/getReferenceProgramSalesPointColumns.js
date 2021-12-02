export const getReferenceProgramSalesPointColumns = () => {
   const columns = [
      {
         field: "name",
         headerName: "Punto de venta",
         flex:2,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'left'
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
         headerName: "Activo",
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',
         type: 'boolean',
         editable: true,
      }            
   ];
   return columns;
}