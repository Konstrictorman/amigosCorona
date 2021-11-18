
export const getSalesPointsColumns = () => {
   const columns = [
      /*{ field: "id", headerName: "ID", width: 60, headerClassName: 'headerCol',headerAlign: 'center', align: 'center' ,cellClassName: 'clickableCell'},*/
      { field: "name", headerName: "Nombre", width: 200, headerClassName: 'headerCol',headerAlign: 'center',cellClassName: 'clickableCell'},
      { field: "description", headerName: "Descripción", width: 400, headerClassName: 'headerCol',headerAlign: 'center' },
      {
         field: "status",
         headerName: "Estado",
         width: 120,
         headerClassName: 'headerCol',headerAlign: 'center',align: 'center'
      },
   ];   
   return columns;
}