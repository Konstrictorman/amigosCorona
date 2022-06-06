import { TIME_OUT } from "../../../config/config";
import { delay } from "../../../helpers/delay";
import { addNivelBeneficio,updateNivelBeneficio,deleteNivelBeneficioById } from "../api/benefitsApi";


export const addBenefit = async(benefit) => {
   await addNivelBeneficio(benefit);
   await delay(TIME_OUT);
}

export const updateBenefit = async(id, benefit) =>{
   if (id && benefit) {
      await updateNivelBeneficio(id, benefit);
      await delay(TIME_OUT);   
   } else {
      throw new Error("id/beneficio es requerido para realizar la operación");
   }
}

export const deleteBenefit = async(id) => {
   if (id) {
      await deleteNivelBeneficioById(id);
      await delay(TIME_OUT);
   } else {
      throw new Error("id es requerido para realizar la operación");
   }
}