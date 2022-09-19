import axios from 'axios';
import { API_URL } from '../../../config/config';
import { processParams } from '../../../helpers/processParams';


export const getRedenciones = () => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/redenciones`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}


export const getRedencionById = (id) => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/redenciones/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);
}


export const updateRedencion = (id, redencion) => {
   const config = {
      method: 'put',
      url: `${API_URL}/api/redenciones/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: redencion
   };
   return axios(config);
}

export const deleteRedencionById = (id) => {
   const config = {
      method: 'delete',
      url: `${API_URL}/api/redenciones/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}

export const addRedencion = (redencion) => {
   const config = {
      method: 'post',
      url: `${API_URL}/api/redenciones`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: redencion
   };
   return axios(config);
}

export const searchRedenciones=(size,page,params) => {
   const pParams = processParams(params);

	const config = {
		method: "get",
		url:
			`${API_URL}/api/redenciones/search/findByParametros?size=${size}&page=${page}` +
			pParams,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
   
	return axios(config);    
}

export const descargarRedencionById = (id)=> {
   const config = {
		method: "get",
		url:
			`${API_URL}/obtenerBonoPdf/${id}`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
      responseType: 'blob',
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
   
	return axios(config);
}

export const procesarRedencionById = (id) => {
	const config = {
		method: "patch",
		url:
			`${API_URL}/ProcesarRedencion/${id}`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
   
	return axios(config);     
}

export const ejecutarReversionById = (id) => {
	const config = {
		method: "patch",
		url:
			`${API_URL}/ReversarRedencion/${id}`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
   
	return axios(config);     
}