import axios from 'axios';
import { API_URL } from '../../../config/config';

export const getPromociones = () => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/exclusionesPromociones`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}

export const getPromocionesById = (id) => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/exclusionesPromociones/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}

export const deletePromocionById = (id) => {
   const config = {
      method: 'delete',
      url: `${API_URL}/api/exclusionesPromociones/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}

export const addPromocion = (promocion) => {
   const config = {
      method: 'post',
      url: `${API_URL}/api/exclusionesPromociones`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: promocion
   };
   return axios(config);
}

export const updatePromocion = (id, promocion) => {
   const config = {
      method: 'put',
      url: `${API_URL}/api/exclusionesPromociones/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: promocion
   };
   return axios(config);
}

