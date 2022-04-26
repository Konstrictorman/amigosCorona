import { getCorreosClienteByIdCliente } from "../api/clientApi";

export const getEmailsByClientId = async (id) => {

   if (id) {
      const res = await getCorreosClienteByIdCliente(id);
      const mails = res.data._embedded.emailClientes;

      mails.forEach((p) => {
         delete p._links;
      });
      return mails;
   } else {
      return [];
   }
}