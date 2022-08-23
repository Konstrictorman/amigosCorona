import { addNivelBeneficio,updateNivelBeneficio,deleteNivelBeneficioById } from "../api/benefitsApi";


export const addBenefit = async(benefit) => {
   await addNivelBeneficio(benefit);
}

export const updateBenefit = async(id, benefit) =>{
   if (id && benefit) {
      await updateNivelBeneficio(id, benefit);
   } else {
      throw new Error("id/beneficio es requerido para realizar la operación");
   }
}

export const deleteBenefit = async(id) => {
   if (id) {
      await deleteNivelBeneficioById(id);
   } else {
      throw new Error("id es requerido para realizar la operación");
   }
}
