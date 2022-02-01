export const bills = [
   {
      id:1,      
      clienteVta:"PLDOCS3X",
      estadoFactura:"Pagado",
      fechaFactura:"2022-01-18T00:22:14.769Z",
      flagEsPremium:true,
      idClienteRef:2,
      idFacturaOriginal:10,
      idPuntoVenta:5,
      numeroFactura:"2302541201445",
      pedido:"PO235",
      tipoFactura:"Contado",
      valor:15000000,
      valorAntesImpuesto:12000000,
      links:{
         empty:true
      },
      articulosFactura:[
         {
            articulo:"Tapa para olla express",
            cantidad:100,
            id:150,
            idFactura:1,
            linea:1,
            movReg:"Salida",
            pctDescuento:0,
            valorDescuento:0,
            valorTotal:15000000,
            valorUnitario:150000
         }
      ],      
   },
   {
      id:2,      
      clienteVta:"PLDOCS3X",
      estadoFactura:"Pagado",
      fechaFactura:"2022-01-20T00:22:14.769Z",
      flagEsPremium:false,
      idClienteRef:1,
      idFacturaOriginal:20,
      idPuntoVenta:2,
      numeroFactura:"2302541201448",
      pedido:"PO238",
      tipoFactura:"Contado",
      valor:3000000,
      valorAntesImpuesto:300000,
      links:{
         empty:true
      },
      articulosFactura:[
         {
            articulo:"Olla express",
            cantidad:10,
            id:170,
            idFactura:2,
            linea:1,
            movReg:"Salida",
            pctDescuento:0,
            valorDescuento:0,
            valorTotal:2500000,
            valorUnitario:250000
         },
         {
            articulo:"Válvula para olla express 3 1/2",
            cantidad:10,
            id:187,
            idFactura:2,
            linea:2,
            movReg:"Salida",
            pctDescuento:0,
            valorDescuento:0,
            valorTotal:500000,
            valorUnitario:50000
         }

      ],      
   }   
]