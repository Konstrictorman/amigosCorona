import { getValoresCamposById } from "../api/fieldValuesApi";

export const getFieldValueById = async (id) => {
   if (id) {
      const fv = await getValoresCamposById(id);
      delete fv.data._links;      
      return fv.data;
   } else {
      return null;
   }
}