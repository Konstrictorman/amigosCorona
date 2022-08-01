import axios from 'axios';
import { API_URL } from '../../../config/config';

export const getGruposParametros = () => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/gruposParametros`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}

export const getGrupoParametroById = (id) => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/gruposParametros/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);
}


export const updateGrupoParametro = (id, grupoParametro) => {
   const config = {
      method: 'put',
      url: `${API_URL}/api/gruposParametros/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: grupoParametro
   };
   return axios(config);
}

export const deleteGrupoParametroById = (id) => {
   const config = {
      method: 'delete',
      url: `${API_URL}/api/gruposParametros/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}

export const addGrupoParametro = (grupoParametro) => {
   const config = {
      method: 'post',
      url: `${API_URL}/api/gruposParametros`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: grupoParametro
   };
   return axios(config);
}


export const getParametros = () => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/parametros`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}

export const getParametroById = (id) => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/parametros/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);
}

export const getParametrosByGrupoParametroId = (id) => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/gruposParametros/${id}/parametros`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);   
}


export const updateParametro = (id, parametro) => {
   const config = {
      method: 'put',
      url: `${API_URL}/api/parametros/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: parametro
   };
   return axios(config);
}

export const deleteParametroById = (id) => {
   const config = {
      method: 'delete',
      url: `${API_URL}/api/parametros/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}

export const addParametro = (parametro) => {
   const config = {
      method: 'post',
      url: `${API_URL}/api/parametros`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: parametro
   };
   return axios(config);
}

