import { getSalesPointById } from "../../salesPoint/selectors/getSalesPointById";

const getSalesPointName = (id) => {
   const sp = getSalesPointById(id);
   return sp?.name? sp.name : '';
}

export const getParameterColumns = () => {
   const columns = [
      {
         field: "parametro", 
         headerName: "Nombre", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string',
      },    
      {
         field: "valor", 
         headerName: "Valor", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string',
      },   
      {
         field: "idPuntoVenta", 
         headerName: "Punto de venta", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string',
         valueFormatter: ({ value }) => getSalesPointName(value),  
      },     
      /*
      {
         field: "eliminar", 
         headerName: "Acción", 
         flex:0.4,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         valueGetter: ()=>("Eliminar"),
         cellClassName: "btn btn-danger btn-sm",
         disableClickEventBubbling: true,
      },
      */                  
   ];
   return columns;
}