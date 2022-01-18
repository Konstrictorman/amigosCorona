export const getClientColumns = () => {
	const columns = [
      {
			field: "codigoCliente",
			headerName: "Código Cliente",
			flex: 2,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "center",
			cellClassName: "clickableCell",         
		},
		{
			field: "tipoDocumento",
			headerName: "Tipo de documento",
			flex: 2,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "center",
		},          
		{
			field: "documento",
			headerName: "Documento",
			flex: 2,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "center",
		},
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
                                   
	];
	return columns;
};
