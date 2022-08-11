import axios from 'axios';
import { API_URL } from '../../../config/config';


export const getDefinicionesReporte = () => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/definicionesReporte`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}

export const getDefinicionReportesByTipoProceso = (tp) => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/definicionesReporte/search/findByTipoProceso?tipoProceso=${tp}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}

export const getDefinicionParametrosReportesById = (id) => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/definicionParametrosReporte/search/findByIdDefinicionReporte?idDefinicionReporte=${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}

export const getValoresValidosByDefinicionParametroReporteId = (id) => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/valoresValidos/search/ObtenerValoresValidos?idDefinicionParametroReporte=${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);      
}

export const lanzarProceso = (data) => {
   const config = {
      method: 'post',
      url: `${API_URL}/api/procesos`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: data
   };
   return axios(config);
}


export const ejecutarProceso = (id) => {
   const config = {
      method: 'patch',
      url: `${API_URL}/EjecutarProceso/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}

export const saveParametroProceso = (param) => {
   const config = {
		method: "post",
		url: `${API_URL}/api/parametrosReporte`,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
		},
		data: param,
		"Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
	};
	return axios(config);
}