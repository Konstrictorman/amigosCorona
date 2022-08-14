import { getValoresCampoByCampoId } from "../api/fieldApi";

export const getFieldValuesByFieldId = async (campoId) => {

   if (campoId) {
      const valores = await getValoresCampoByCampoId(campoId);
      const values = valores.data._embedded.valorCampoes;
  
      values?.forEach((p) => {
         delete p._links;
      });      
      return values;
   } else {
      return []
   }

};