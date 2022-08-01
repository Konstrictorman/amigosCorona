import { getValoresValidosByDefinicionParametroReporteId } from "../api/processApi";

export const getReportValidValuesForCombo =async (id) => {
   if (id) {
      const combo = await getValoresValidosByDefinicionParametroReporteId(id);
      const array = [];
      combo.data._embedded.valoresValidoses.forEach((vv) => {
         let obj = {}
         obj.id = vv.valor;
         obj.label = vv.descr;
         array.push(obj);
      })
      return array;
   } else {
      return null;
   }
}