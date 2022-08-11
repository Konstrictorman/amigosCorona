import axios from 'axios';
import { API_URL } from '../../../config/config';
import { processParams } from '../../../helpers/processParams';

export const buscarProcesos = (size, page, params) => {
   const pParams = processParams(params);

	const config = {
		method: "get",
		url:
			`${API_URL}/api/procesos/search/findByParametros?size=${size}&page=${page}` +
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

export const getMensajesByProcesoId = (id) => {
   
	const config = {
		method: "get",
		url:
			`${API_URL}/api/procesos/${id}/mensajesProceso`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
   
	return axios(config);
};

export const descargarArchivoByIdProceso = (id) => {
   
	const config = {
		method: "get",
		url:
			`${API_URL}/obtenerArchivoReporte/${id}`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
      responseType: 'blob',
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
   
	return axios(config);
};