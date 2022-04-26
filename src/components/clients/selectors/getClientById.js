import { getClienteById } from "../api/clientApi";

export const getClientById = async (id) => {
	if (id) {
		const client = await getClienteById(id);
		//console.log("xps:", client.data._links.telefonosCliente.href);
		return client.data;
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
