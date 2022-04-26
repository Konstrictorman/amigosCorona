import { getTelefonosClienteByIdCliente } from "../api/clientApi";

export const getPhonesByClientId = async (id) => {

   if (id) {
      const res = await getTelefonosClienteByIdCliente(id);
      const phones = res.data._embedded.telefonoClientes;

      phones.forEach((p) => {
         delete p._links;
      });
      return phones;

   } else {
      return [];
   }

}