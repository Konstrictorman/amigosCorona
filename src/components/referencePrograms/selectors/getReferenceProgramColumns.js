export const getReferenceProgramColumns = () => {
   const columns = [
      {
         field: "programa",
         headerName: "Programa",
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',
         cellClassName: 'clickableCell half-width'
      },
      {
         field: "descripcion",
         headerName: "Descripción",
         flex:2.5,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'left'
      },
      {
         field: "tipoPeriodo",
         headerName: "Periodo",
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center'
      },      
      {
         field: "estado",
         headerName: "Estado",
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center'
      },        
   ];
   return columns;
}
