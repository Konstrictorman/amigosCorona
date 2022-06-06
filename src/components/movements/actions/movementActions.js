import { getMovimientosResumen } from "../api/movementApi";

export const getResume = async (fInit, fFinal) => {
   const resume = await getMovimientosResumen(fInit, fFinal);

   resume.forEach((m) => {
      delete m._links;
   })

   return resume;
}