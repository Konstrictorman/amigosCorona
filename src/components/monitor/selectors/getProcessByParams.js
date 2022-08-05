import { dateFormatter2 } from "../../../helpers/dateFormatter";
import { buscarProcesos } from "../api/monitorApi";

export const getProcessByParams = async (size, page, params) => {
   if (params) {
      params['fechaDesde'] = dateFormatter2(params['fechaDesde']);
      params['fechaHasta'] = dateFormatter2(params['fechaHasta']);

      const res = await buscarProcesos(size, page, params);
      res.data._embedded.procesoes.forEach((p) => {
         delete p._links;
      })
      
      return res;
   } else {
      throw new Error("No se puede ejecutar la tarea sin criterios de búsqueda");
   }
} 