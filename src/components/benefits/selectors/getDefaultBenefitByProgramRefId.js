import { getNivelBeneficioDefaultByProgRefId } from "../api/benefitsApi";

export const getDefaultBenefitByProgramRefId = async(id) => {
   if (id) {
      const def = await getNivelBeneficioDefaultByProgRefId(id);
      console.log(JSON.stringify(def,null,2));
      const rta = def.data._embedded.nivelBeneficios[0];
      if (rta) {
         delete rta._links;
      }
      
      return rta;
   } else {
      throw new Error("id es requerido para realizar la operación");
   }
}