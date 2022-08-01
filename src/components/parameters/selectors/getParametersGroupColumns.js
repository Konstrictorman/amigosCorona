export const getParametersGroupColumns = () => {
   const columns = [
		{
			field: "grupoParametros",
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
   ];

   return columns;
}