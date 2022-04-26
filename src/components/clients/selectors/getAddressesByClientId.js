import { getDireccionesClienteByIdCliente } from "../api/clientApi"


export const getAddressesByClientId = async (id) => {
   if (id) {
      const res = await getDireccionesClienteByIdCliente(id);
      const addr = res.data._embedded.direccionClientes;

      addr.forEach((p) => {
         delete p._links;
      })

      return addr;
   } else {
      return [];
   }

}