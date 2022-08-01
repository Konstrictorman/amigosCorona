import axios from 'axios';
import { API_URL } from '../../../config/config';

export const getProgramasReferenciacion = () => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/programasReferenciacion`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };

   return axios(config);
}

export const getProgramaReferenciacionById = (id) => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/programasReferenciacion/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };

   return axios(config);
}

export const addProgramaReferenciacion = (programa) => {
   const config = {
      method: 'post',
      url: `${API_URL}/api/programasReferenciacion`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: programa,
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);
}

 
export const updateProgramaReferenciacion = (id, programa) => {
   const config = {
      method: 'put',
      url: `${API_URL}/api/programasReferenciacion/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: programa,
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);   
}

export const deleteProgramaReferenciacion = (id) => {
   const config = {
      method: 'delete',
      url: `${API_URL}/api/programasReferenciacion/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);   
}

export const getPRSalesPointsById = (id) => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/programasReferenciacion/${id}/programaPuntoVentas`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);
}


export const getPRStatesById = (id) => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/programasReferenciacion/${id}/programaEstados`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);
}

export const getProgramaReferenciacionPuntoVentaById = (id) => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/programasPuntosVenta/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);
}

export const addProgramaReferenciacionPuntoVenta = (refPrgoramState) => {
   const config = {
      method: 'post',
      url: `${API_URL}/api/programasPuntosVenta`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data:refPrgoramState,
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);
}

export const deleteProgramaReferenciacionPuntoVenta = (id) => {
   const config = {
      method: 'delete',
      url: `${API_URL}/api/programasPuntosVenta/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);   
}

export const addProgramaReferenciacionEstado = (refProgramState) => {
   const config = {
      method: 'post',
      url: `${API_URL}/api/programaEstados`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data:refProgramState,
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);
}