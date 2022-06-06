export const getBillDetailColumns = () => {
   const columns = [
      { 
         field: "linea", 
         headerName: "Línea", 
         flex:0.7,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'number'
      },    
      { 
         field: "id", 
         headerName: "ID Artículo", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'number'
      },          
      { 
         field: "idArticulo", 
         headerName: "Artículo", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'string'
      },
      { 
         field: "cantidad", 
         headerName: "Cant", 
         flex:0.7,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'number'
      },    
      { 
         field: "valorUnitario", 
         headerName: "Vr unit", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'number'
      },        
      { 
         field: "valorTotal", 
         headerName: "Vr total", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'number'
      },  
      { 
         field: "valorDescuento", 
         headerName: "Vr dcto", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'number'
      }        
   ];
   return columns;
}