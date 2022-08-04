import { getValoresCampoByCampoId } from "../api/fieldApi";

export const getFieldValuesByFieldId = async (campoId) => {

   if (campoId) {
      const valores = await getValoresCampoByCampoId(campoId);
      const values = valores.data._embedded.valorCampoes;
  
      values?.forEach(async (p) => {
         delete p._links;
         p.actionDisabled = true;
      });      
      return values;
   } else {
      return []
   }

};