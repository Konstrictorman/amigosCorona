import { dateFormatter } from "../../../helpers/dateFormatter";
import CommentIcon from '@mui/icons-material/Comment';
import { GridActionsCellItem } from "@mui/x-data-grid";
import DownloadIcon from '@mui/icons-material/Download';

export const getProcessColumns = (handleViewMessages, handleDownload, estadosProceso) => {


   const getDescEstado = (val) => {
      if (estadosProceso) {
         const desc = estadosProceso.find(e=> e.valor === val);
         if (desc) {
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
			field: "id",
			headerName: "id",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "center",
			type: "string",
		},
		{
			field: "tipoProceso",
			headerName: "Tipo proceso",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			type: "string",
			align: "center",
		},
		{
			field: "usuarioCreacion",
			headerName: "Usuario creación",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			type: "string",
			align: "center",
			
		},
		{
			field: "fechaEjecucion",
			headerName: "Fecha ejecución",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "center",
			type: "dateTime",
			valueFormatter: ({ value }) => dateFormatter(value),
		},
		{
			field: "estadoProceso",
			headerName: "Estado proceso",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			type: "string",
			align: "center",
         valueGetter: ({value})=> getDescEstado(value),           
		},
		{
			field: "mensajes",
         type: "actions",
			headerName: "Mensajes",			
			headerClassName: "headerCol",
         getActions: (params) => [
            <GridActionsCellItem icon={<CommentIcon/>} label="Ver mensajes" 
            //disabled={params.row.actionDisabled}
            onClick={() => {               
               handleViewMessages(params.id);
            }}/>
         ]

		},
		{
			field: "descargar",
         type: "actions",
			headerName: "Descargar archivo",			
			headerClassName: "headerCol",
         getActions: (params) => [
            <GridActionsCellItem icon={<DownloadIcon/>} label="Descargar" 
            disabled={!(params.row.estadoProceso ==="FINA" && params.row.tipoProceso ==="REPOR")}
            onClick={() => {               
               handleDownload(params.row);
            }}/>
         ]
		},
	];
	return columns;
}