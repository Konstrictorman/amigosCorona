import { getEstadosReferenciadorByIdRef } from "../api/clientApi";

export const getStatusHistoryByReferrerId = async (id) => {
   if (id) {
      const res = await getEstadosReferenciadorByIdRef(id);
      const states = res.data._embedded.matriculaReferenciadorEstadoes;

      states.forEach((s) => {
         delete s._links;
      });
      return states;

   } else {
      return [];
   }
      
   
   }