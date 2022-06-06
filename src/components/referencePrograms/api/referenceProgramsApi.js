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

export const saveProgramaReferenciacion = (programa) => {
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