import { getClienteByDocumento } from "../api/clientApi";

export const getClientByDocument = async (document)=> {
	if (document) {
		const client = await getClienteByDocumento(document);
		//console.log(sps:, sp.data);
      const res = client.data._embedded.clientes[0];
      delete res?._links;
		return res;
	} else {
		return new Error("No se puede hacer la búsqueda sin documento");
	}   
}