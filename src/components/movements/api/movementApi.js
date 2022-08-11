import axios from 'axios';
import { API_URL } from '../../../config/config';
import { processParams } from '../../../helpers/processParams';



export const getRegistroMovimientosSeq = (size, page) => {

   const config = {
      method: 'get',
      url: `${API_URL}/api/registroMovimientosSeqs?size=${size}&page=${page}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}

export const getRegistroMovimientoSeqById = (id) => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/registroMovimientosSeqs/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);
}

export const searchRegistroMovimientosSeq = (size, page, params) => {
   const pParams = processParams(params);

	const config = {
		method: "get",
		url:
			`${API_URL}/api/registroMovimientosSeqs/search/findByParametros?size=${size}&page=${page}` +
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


export const getMovimientosResumen = (fInit, fFinal) => {   

	const config = {
		method: "get",
		url:`${API_URL}/api/resumenMovimientos/search/findByParametrosResumen?fechaDesde=${fInit}&fechaHasta=${fFinal}`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
   
	return axios(config);      
}


export const getRegistroMovimientos = ()=> {
	const config = {
		method: "get",
		url: `${API_URL}/api/registroMovimientos`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
	return axios(config);   
}

export const saveRegistroMovimiento = (rMovement)=> {
	const config = {
		method: "post",
		url: `${API_URL}/api/registroMovimientos`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		data: rMovement,
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
	return axios(config);   
}

export const saveRegistroMovimientoSeq = (rMovement)=> {
	const config = {
		method: "post",
		url: `${API_URL}/api/registroMovimientosSeqs`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		data: rMovement,
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
	return axios(config);   
}