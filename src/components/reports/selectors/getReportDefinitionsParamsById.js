import { getDefinicionParametrosReportesById } from "../api/processApi";

export const getReportDefinitionsParamsById = async (id) => {
   if (id) {
      const params = await getDefinicionParametrosReportesById(id);
      const array = params.data._embedded.definicionParametroReportes;
      array.forEach((p)=>{
         delete p._links;
      })
      return array;
   } else {
      return null;
   }
   
}