export const getClientColumns2 = (tiposDoc) => {

   const getDocumentTypeName = (val) => {
      if(tiposDoc) {
         const desc = tiposDoc.find((td)=> td.valor === val);
         if ( desc) {
            return desc.descripcion;
         } else {
            return val;
         }
      } else {
         return val;
      }
      
   }

	const columns = [
		{
			field: "documento",
			headerName: "Nro de documento",
			flex: 2,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "center",
			cellClassName: "clickableCell",                  
		},       
      {
			field: "codigoCliente",
			headerName: "Código Cliente",
			flex: 2,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "center",
		},
		{
			field: "tipoDocumento",
			headerName: "Tipo de documento",
			flex: 2,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "center",
         valueGetter: ({value})=> getDocumentTypeName(value),     
		},          
      {
			field: "nombreCompleto",
			headerName: "Nombre completo",
			flex: 3,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "center",
		},
      /*
		{
			field: "nombreCompleto",
			headerName: "Nombre completo",
			flex: 4,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "left",
         valueGetter: (params)=>
            `${params.getValue(params.id, 'primerNombre') || ''}
            ${params.getValue(params.id, 'segundoNombre') || ''}
            ${params.getValue(params.id, 'primerApellido') || ''}
            ${params.getValue(params.id, 'segundoApellido') || ''}
         `,
		},         
        */                           
	];
	return columns;
};
