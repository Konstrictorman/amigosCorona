import { getClienteByCodigo } from "../api/clientApi";

export const getClientByCode = async (code) => {
	if (code) {
		const client = await getClienteByCodigo(code);
		//console.log(sps:, sp.data);
		return client.data._embedded.clientes[0];
	} else {
		return {
			id: 0,
         codigoCliente: '',
         tipoDocumento: '',
         documento: '',
         nombreCompleto: '',
         facturas: [],
         telefonosclientes: [],
         referenciadores: [],
         direccionesCliente:[],
         emailsCliente:[],
		};
	}
};