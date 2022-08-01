import { TIME_OUT } from "../../../config/config";
import { delay } from "../../../helpers/delay";
import { getSalesPoints } from "../../salesPoint/selectors/getSalesPoints";
import { addProgramaReferenciacion, addProgramaReferenciacionEstado, addProgramaReferenciacionPuntoVenta, deleteProgramaReferenciacion, deleteProgramaReferenciacionPuntoVenta, updateProgramaReferenciacion } from "../api/referenceProgramsApi";


export const addReferenceProgram = async(refProgram, puntosVenta) => {
   const newRefProgram = addProgramaReferenciacion(refProgram)
      .then((response) => {
         //console.log("response:",JSON.stringify(response,null,2));
         puntosVenta.forEach((pv) => {
            const newRefProgSp = {
               id: 0,
               idProgramaReferenciacion: response.data.id,
               flagActivo: pv.flagActivo,
               idPuntoVenta: pv.idPuntoVenta,
            }
            //console.log("newRefProgSp:", JSON.stringify(newRefProgSp,null,2));
            addReferenceProgramSalesPoint(newRefProgSp);
         });
         return response.data;
      })


   await delay(TIME_OUT);
   return newRefProgram;
   
}

export const updateReferenceProgram = async(id, refProgram, puntosVenta) => {
   if (id && refProgram) {
      await updateProgramaReferenciacion(id, refProgram);
      puntosVenta.forEach((pv) => {
         if (pv.id === 0 && pv.flagActivo) {
            addReferenceProgramSalesPoint(pv);
         } else if (pv.id !== 0 && !pv.flagActivo) {
            removeReferenceProgramSalesPoint(pv);
            
         }
      });
      await delay(TIME_OUT);           
   } else {
      throw new Error("id/refProgram es requerido para realizar la operación");
   }
}

export const removeReferencePrograms = async(selectedIds) => {
   if (selectedIds) {
      selectedIds.forEach(async (id)=> {
         await removeReferenceProgram(id);         
      });
      await delay(TIME_OUT);
   } else {
      throw new Error("selectedIds es requerido para realizar la operación");
   }
}

export const removeReferenceProgram = async(id) => {
   if (id) {
      await deleteProgramaReferenciacion(id);
   } else {
      throw new Error("id/refProgram es requerido para realizar la operación");
   }
}

export const addReferenceProgramSalesPoint = async(rpsp) => {
   await addProgramaReferenciacionPuntoVenta(rpsp);
}

export const removeReferenceProgramSalesPoint = async(rpsp) => {
   await deleteProgramaReferenciacionPuntoVenta(rpsp.id);
}

export const addReferenceProgramState = async(state) => {
   await addProgramaReferenciacionEstado(state);
}