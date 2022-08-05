import {  dateFormatter3 } from "../../../helpers/dateFormatter"
import { ejecutarProceso, lanzarProceso } from "../api/processApi";

export const launchProcess = async (user, processType, idDefinition) => {
   if (user && processType && idDefinition) {
      const data = {
         id:0,
         estadoProceso: "INI",         
         fechaActualizacion: dateFormatter3(new Date()),
         fechaEjecucion: dateFormatter3(new Date()),
         idDefinicionReporte: idDefinition,
         tipoArchivoSalida: "",
         tipoProceso: processType,
         usuarioActualizacion: user,
         usuarioCreacion: user
      }
      //console.log(JSON.stringify(data,null,2));
      const res = await lanzarProceso(data);
      delete res._links;
      return res;
   } else {
      throw new Error("Faltan parámetros para lanzar el proceso");
   }
}


export const executeProcess = async (id) => {
   if (id) {
      const data = await ejecutarProceso(id);
      return data;
   } else {
      throw new Error("No se puede ejecutar proceso sin idProceso");
   }
}