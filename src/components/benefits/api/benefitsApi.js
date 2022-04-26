import axios from 'axios';
import { API_URL } from '../../../config/config';


export const getNivelesBeneficios = () => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/nivelesBeneficios`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}


export const getNivelBeneficioById = (id) => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/nivelesBeneficios/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);
}


export const updateNivelBeneficio = (id, nivelBeneficio) => {
   const config = {
      method: 'put',
      url: `${API_URL}/api/nivelesBeneficios/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: nivelBeneficio
   };
   return axios(config);
}

export const deleteNivelBeneficioById = (id) => {
   const config = {
      method: 'delete',
      url: `${API_URL}/api/nivelesBeneficios/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}

export const addNivelBeneficio = (nivelBeneficio) => {
   const config = {
      method: 'post',
      url: `${API_URL}/api/nivelesBeneficios`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: nivelBeneficio
   };
   return axios(config);
}