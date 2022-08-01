import { getMovimientosResumen, saveRegistroMovimiento } from "../api/movementApi";

export const getResume = async (fInit, fFinal) => {
   const resume = await getMovimientosResumen(fInit, fFinal);

   resume.forEach((m) => {
      delete m._links;
   })

   return resume;
}

export const addRecordMovement = async (rMovement) => {
   if (rMovement) {
      const result = await saveRegistroMovimiento(rMovement);
      return result;
   } else {
      throw new Error("No se puede guardar registro vacío");
   }
   
}