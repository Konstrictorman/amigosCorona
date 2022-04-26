export const getSalesPointsColumns = () => {
	const columns = [
		/*{ field: "id", headerName: "ID", width: 60, headerClassName: 'headerCol',headerAlign: 'center', align: 'center' ,cellClassName: 'clickableCell'},*/
		{
			field: "puntoVenta",
			headerName: "Nombre",
			flex: 1.5,
			headerClassName: "headerCol",
			headerAlign: "center",
			cellClassName: "clickableCell",
         align: "center",
		},
		{
			field: "descripcion",
			headerName: "Descripción",
			flex: 6,
			headerClassName: "headerCol",
			headerAlign: "center",
		},
		{
			field: "estado",
			headerName: "Estado",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "center",
		},
	];
	return columns;
};
