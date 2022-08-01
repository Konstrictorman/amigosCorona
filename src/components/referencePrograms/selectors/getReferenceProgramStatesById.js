import moment from "moment";
import { getPRStatesById } from "../api/referenceProgramsApi";

export const getReferenceProgramStatesById = async (id) => {

   if (id) {
      const refProgStates = await getPRStatesById(id);

      const array = refProgStates?.data._embedded.programaEstadoes;
   
      array.forEach((f) => {
         delete f._links;
      });
      //Ordena de forma descendente
      array.sort((o1, o2) => {
         const m1 = moment(o1.fechaReferencia);
         const m2 = moment(o2.fechaReferencia);
         return m1.isBefore(m2) ? 1 : m1.isAfter(m2) ? -1:0;
      })
   
      return array;
   
   } else {
      return [];
   }
}