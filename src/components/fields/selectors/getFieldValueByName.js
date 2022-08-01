import { ID_PROGRAMS } from "../../../config/config"
import { searchValoresCampo } from "../api/fieldValuesApi"

export const getFieldValueByName = async (name) => {
   if (name) {
      const params = {
         valor: name,
         idCampo: ID_PROGRAMS,
      }
      const fv = await searchValoresCampo(params);

      return fv.data._embedded.valorCampoes[0];
   } else {
      return new Error("El nombre del campo valor es requerido");
   }
}