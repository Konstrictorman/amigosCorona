import axios from 'axios';
import { API_URL } from '../../../config/config';

export const getValoresCampos = () => {

   const config = {
      method: 'get',
      url: `${API_URL}/api/valoresCampos`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}


export const getValoresCamposById = (id) => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/valoresCampos/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);
}


export const updateValorCampo = (id, valorCampo) => {
   const config = {
      method: 'put',
      url: `${API_URL}/api/valoresCampos/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: valorCampo
   };
   return axios(config);
}

export const deleteValorCampoById = (id) => {
   const config = {
      method: 'delete',
      url: `${API_URL}/api/valoresCampos/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}

export const addValorCampo = (valorCampo) => {
   const config = {
      method: 'post',
      url: `${API_URL}/api/valoresCampos`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: valorCampo
   };
   return axios(config);
}