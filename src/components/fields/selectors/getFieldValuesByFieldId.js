import { TIME_OUT } from "../../../config/config";
import { delay } from "../../../helpers/delay";
import { getValoresCampoByCampoId } from "../api/fieldApi";

export const getFieldValuesByFieldId = async (campoId) => {

   if (campoId) {
      const valores = await getValoresCampoByCampoId(campoId);
      const values = valores.data._embedded.valorCampoes;

      //await delay(TIME_OUT);
   
      values?.forEach((p) => {
         delete p._links;
      })
      return values;
   } else {
      return []
   }

};