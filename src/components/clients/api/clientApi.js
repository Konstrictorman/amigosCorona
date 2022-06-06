import axios from "axios";
import { API_URL } from "../../../config/config";
import { processParams } from "../../../helpers/processParams";

export const getClientes = (size, page) => {
	const config = {
		method: "get",
		url: `${API_URL}/api/clientes?size=${size}&page=${page}`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};

	return axios(config);
};

export const searchClientes = (size, page, params) => {
   const pParams = processParams(params);

	const config = {
		method: "get",
		url:
			`${API_URL}/api/clientes/search/findByParametros?size=${size}&page=${page}` +
			pParams,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
   
	return axios(config);
};

export const getClienteById = (id) => {
	const config = {
		method: "get",
		url: `${API_URL}/api/clientes/${id}`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
	return axios(config);
};

export const getClienteByCodigo = (code) => {
	const config = {
		method: "get",
		url: `${API_URL}/api/clientes/search/findByCodigoCliente?codigoCliente=${code}`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
	return axios(config);
};

export const getDireccionesClienteByIdCliente = (id) => {
	const config = {
		method: "get",
		url: `${API_URL}/api/clientes/${id}/direccionesCliente`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
	return axios(config);
};

export const getTelefonosClienteByIdCliente = (id) => {
	const config = {
		method: "get",
		url: `${API_URL}/api/clientes/${id}/telefonosCliente`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
	return axios(config);
};

export const getFacturasClienteByIdCliente = (id) => {
	const config = {
		method: "get",
		url: `${API_URL}/api/clientes/${id}/Facturas`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
	return axios(config);
};

export const getCorreosClienteByIdCliente = (id) => {
	const config = {
		method: "get",
		url: `${API_URL}/api/clientes/${id}/emailsCliente`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
	return axios(config);
};

export const getReferenciadorByIdCliente = (id) => {
	const config = {
		method: "get",
		url: `${API_URL}/api/clientes/${id}/referenciadores`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
	return axios(config);
};

export const addCliente = (cliente) => {
	const config = {
		method: "post",
		url: `${API_URL}/api/clientes`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		data: cliente,
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
	return axios(config);
};

export const updateCliente = (id, cliente) => {
	const config = {
		method: "put",
		url: `${API_URL}/api/clientes/${id}`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		data: cliente,
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
	return axios(config);
};

export const deleteClienteById = (id) => {
	const config = {
		method: "delete",
		url: `${API_URL}/api/clientes/${id}`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
	return axios(config);
};

export const updateReferenciador = (id, referrer) => {
	const config = {
		method: "put",
		url: `${API_URL}/api/matriculaReferenciadores/${id}`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		data: referrer,
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
	return axios(config);
};

export const getEstadosReferenciadorByIdRef = (id) => {
	const config = {
		method: "get",
		url: `${API_URL}/api/matriculasReferenciadorEstados/search/findByReferenciador?idReferenciador=${id}`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
	return axios(config);
};

export const getNivelesReferenciadorByIdRef = (id) => {
	const config = {
		method: "get",
		url: `${API_URL}/api/matriculaReferenciadoresNiveles/search/findByIdReferenciador?idReferenciador=${id}`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
	return axios(config);
};
