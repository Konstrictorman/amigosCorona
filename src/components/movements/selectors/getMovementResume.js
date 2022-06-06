import { getMovimientosResumen } from "../api/movementApi";

export const getMovementResume = async (fInit, fFinal) => {
   const resume = await getMovimientosResumen(fInit, fFinal);


   return resume.data._embedded.resumenMovimientoses;
}