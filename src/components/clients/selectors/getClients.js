import { getClientes} from "../api/clientApi";

/*

export const getClients = () => {
   return clients;
}
*/

export const getClientsPaginated = async (size, page) => {
   const clientes = await getClientes(size, page);

   const array = clientes.data._embedded.clientes
                  .slice()
                  .sort((a,b) => a.codigoCliente.localeCompare(b.codigoCliente));
   console.log("clientes:",array)                  ;
   return array;
}

export const getClients = async () => {
   const clientes = await getClientes(100,0);

   const array = clientes.data._embedded.clientes
                  .slice()
                  .sort((a,b) => a.codigoCliente.localeCompare(b.codigoCliente));
   console.log("clientes:",array)                  ;
   return array;
}