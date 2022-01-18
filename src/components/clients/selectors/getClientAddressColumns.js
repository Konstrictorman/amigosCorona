export const getClientAddressColumns = () => {
	const columns = [
		{
			field: "tipoDireccion",
			headerName: "Tipo",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "left",
		},
		{
			field: "address",
			headerName: "Dirección",
			flex: 6,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "left",
/*
			renderCell: (params) => (
				<div>
					<Tooltip title={params.value}>
						<IconButton>
							<LocationOnIcon />
						</IconButton>
					</Tooltip>
					{params.value}
				</div>
			),
*/
         valueGetter: (params)=>
            `${params.getValue(params.id, 'direccion')  || ''},
            ${params.getValue(params.id, 'barrio') || ''} -
            ${params.getValue(params.id, 'ciudad') || ''} 
            (${params.getValue(params.id, 'departamento') || ''})
         `,         

         
		},
      /*
		{
			field: "ciudad",
			headerName: "Ciudad",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "left",
		},
		{
			field: "departamento",
			headerName: "Departamento",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "left",
		},

		{
			field: "barrio",
			headerName: "Barrio",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "left",
		},
      */
		{
			field: "principal",
			headerName: "Principal",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "center",
			type: "boolean",
		},
	];
	return columns;
};
