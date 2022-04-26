import axios from 'axios';
import { API_URL } from '../../../config/config';


export const getFacturas = () => {

   const config = {
      method: 'get',
      url: `${API_URL}/api/facturas`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}


export const getFacturaById = (id) => {
   const config = {
      method: 'get',
      url: `${API_URL}/api/facturas/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
   };
   return axios(config);
}


export const updateFactura = (id, bill) => {
   const config = {
      method: 'put',
      url: `${API_URL}/api/facturas/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: bill
   };
   return axios(config);
}

export const deleteFacturaById = (id) => {
   const config = {
      method: 'delete',
      url: `${API_URL}/api/facturas/${id}`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
   };
   return axios(config);
}

export const addFactura = (bill) => {
   const config = {
      method: 'post',
      url: `${API_URL}/api/facturas`,
      headers: { 
         'Content-Type': 'application/json',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: bill
   };
   return axios(config);
}