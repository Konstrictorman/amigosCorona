import { descargarArchivoByIdProceso } from "../api/monitorApi"


export const downloadFileByProcessId = async (processId) => {
   if (processId) {
      const data = await descargarArchivoByIdProceso(processId);
      console.log(JSON.stringify(data,null,2));
      return data;
   } else {
      return null;
   }
}