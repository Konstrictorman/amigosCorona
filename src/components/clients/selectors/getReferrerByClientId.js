import { getReferenciadorByIdCliente } from "../api/clientApi";

export const getReferrerByClientId = async (id) => {

   if (id) {
      const res = await getReferenciadorByIdCliente(id);
      const referrer = res.data._embedded.matriculaReferenciadors;

      referrer.forEach((p) => {
         delete p._links;
      });
      return referrer;      
   } else {
      return [];
   }
}