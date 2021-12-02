export const getSalesPointsColumns = () => {
	const columns = [
		/*{ field: "id", headerName: "ID", width: 60, headerClassName: 'headerCol',headerAlign: 'center', align: 'center' ,cellClassName: 'clickableCell'},*/
		{
			field: "name",
			headerName: "Nombre",
			flex: 1.5,
			headerClassName: "headerCol",
			headerAlign: "center",
			cellClassName: "clickableCell",
         align: "center",
		},
		{
			field: "description",
			headerName: "Descripción",
			flex: 6,
			headerClassName: "headerCol",
			headerAlign: "center",
		},
		{
			field: "status",
			headerName: "Estado",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "center",
		},
	];
	return columns;
};
