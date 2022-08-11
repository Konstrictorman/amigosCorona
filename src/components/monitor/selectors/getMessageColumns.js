export const getMessageColumns = () => {

   const columns = [
      
		{
			field: "id",
			headerName: "id de mensaje",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "center",
			type: "string",
         hide:true,
		},
		{
			field: "idProceso",
			headerName: "id de proceso",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "center",
			type: "string",
		},
		{
			field: "tipoMensaje",
			headerName: "Tipo de mensaje",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			type: "string",
			align: "center",
		},
		{
			field: "mensaje",
			headerName: "Mensaje",
			flex: 3,
			headerClassName: "headerCol",
			headerAlign: "center",
			type: "string",
			align: "center",
			
		},
   ];

   return columns;
}