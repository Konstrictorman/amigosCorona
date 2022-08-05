import { buscarClientes } from "../api/clientApi";

export const getClientsByParams = async (size, page, params) => {
	const res = await buscarClientes(size, page, params);
   /* Se necesita toda la respuesta para poder paginar
	const clientes = res.data._embedded.clientes;

	clientes.forEach((c) => {
		delete c._links;
	});
	return clientes;
   */
  return res;
};
