import axios from 'axios';
import { API_URL } from '../../../config/config';


export const getPuntosVenta = () => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/puntosVenta`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}


export const getPuntoVentaById = (id) => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/puntosVenta/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);
}


export const updatePuntoVenta = (id, salesPoint) => {
   const config = {
      method: 'put',
      url: `${API_URL}/api/puntosVenta/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: salesPoint
   };
   return axios(config);
}

export const deletePuntoVentaById = (id) => {
   const config = {
      method: 'delete',
      url: `${API_URL}/api/puntosVenta/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}

export const addPuntoVenta = (salesPoint) => {
   const config = {
      method: 'post',
      url: `${API_URL}/api/puntosVenta`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: salesPoint
   };
   return axios(config);
}