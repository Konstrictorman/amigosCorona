import { lanzarCarga } from "../api/loadDataApi"

export const loadFile = async (id, data) => {
   if (id && data) {
      const res = await lanzarCarga(id, data);
      return res;
   } else {
      throw new Error("No hay información para lanzar el proceso");
   }
   
}