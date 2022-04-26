import axios from 'axios';
import { API_URL } from '../../../config/config';


export const getValoresCampoByCampoId = (campoId) => {

   const config = {
      method: 'get',
      url: `${API_URL}/api/campos/${campoId}/valores`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };

   return axios(config);
}

export const getCampos = () => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/campos`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };

   return axios(config);
}

export const getCampoById = (id) => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/campos/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);
}

export const saveCampo = (campo) => {
   const config = {
      method: 'post',
      url: `${API_URL}/api/campos`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: campo,
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);
}
 
export const updateCampo = (id, campo) => {
   const config = {
      method: 'put',
      url: `${API_URL}/api/campos/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: campo,
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);   
}

export const deleteCampo = (id) => {
   const config = {
      method: 'delete',
      url: `${API_URL}/api/campos/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);   
}