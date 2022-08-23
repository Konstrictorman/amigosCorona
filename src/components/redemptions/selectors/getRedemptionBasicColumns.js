import FastRewindIcon from '@mui/icons-material/FastRewind';
import { GridActionsCellItem } from "@mui/x-data-grid";
import { dateFormatter2 } from '../../../helpers/dateFormatter';
import DownloadIcon from '@mui/icons-material/Download';


export const getRedemptionBasicColumns = (salesPoints, statusList, handleRevert, handleDownload) => {

   const getSalesPointName = (val) => {
      if (salesPoints) {
         const sp = salesPoints.find(e=> e.id === val);
         if (sp) {
            return sp.descripcion;
         } else {
            return val;
         }
         
      } else {
         return val;
      }
   }

   const getStatusDesc = (val) => {
      if (statusList) {
         const sp = statusList.find(e=> e.valor === val);
         if (sp) {
            return sp.descripcion;
         } else {
            return val;
         }
         
      } else {
         return val;
      }
   }   

   const columns = [
      {
         field: "referencia", 
         headerName: "Id Ref", 
         flex:0.5,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string'   
      },      
      {
         field: "codigoCliente", 
         headerName: "Cod. cliente", 
         flex:0.5,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string'         
      },
      {
         field: "idPuntoVenta", 
         headerName: "Pto de venta", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'string',
         valueFormatter: ({ value }) => getSalesPointName(value),           
      },      
      {
         field: "fecha", 
         headerName: "Fecha", 
         flex:0.5,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'dateTime',
         valueFormatter: ({ value }) => dateFormatter2(value),
      },      
      {
         field: "estadoRedencion", 
         headerName: "Estado", 
         flex:0.4,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string',
         valueFormatter: ({ value }) => getStatusDesc(value),            
      },    
      {
         field: "tipoRedencion", 
         headerName: "Tipo", 
         flex:0.4,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string'   
      },        
      {
         field: "transId", 
         headerName: "Bono/Transacción", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string'   
      },              
      {
         field: "revertir", 
         headerName: "Revertir", 
         flex:0.6,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'actions',
         getActions: (params) => [
            <GridActionsCellItem icon={<FastRewindIcon/>} label="Revertir" 
            disabled={params.row.actionDisabled}
            onClick={() => {               
               handleRevert(params.row);
            }}/>
         ]         
      },    
      {
         field: "download", 
         headerName: "Descargar", 
         flex:0.6,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'actions',
         getActions: (params) => [
            <GridActionsCellItem icon={<DownloadIcon/>} label="Descargar" 
            disabled={!params.row.downloadable}
            onClick={() => {               
               handleDownload(params.row);
            }}/>
         ]         
      },     
   ];
   return columns;
}