import { dateFormatter2 } from "../../../helpers/dateFormatter";
import { getMovimientosResumen } from "../api/movementApi";

export const getMovementResume = async (fInit, fFinal) => {
   const fDesde = dateFormatter2(fInit);
   const fHasta = dateFormatter2(fFinal);
   const resume = await getMovimientosResumen(fDesde, fHasta);


   return resume.data._embedded.resumenMovimientoses;
}