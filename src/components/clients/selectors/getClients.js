import { getClientes} from "../api/clientApi";

/*

export const getClients = () => {
   return clients;
}
*/

export const getClients = async (size, page) => {
   const clientes = await getClientes(size, page);
/*
   const array = clientes.data._embedded.clientes
                  .slice()
                  .sort((a,b) => a.codigoCliente.localeCompare(b.codigoCliente));
                  */
   return clientes;
}