import axios from 'axios';
import { API_URL } from '../../../config/config';

export const lanzarCarga = (id,form) => {
   const config = {
      method: 'put',
      url: `${API_URL}/cargaArchivo/${id}`,
      headers: { 
         'Content-Type': 'multipart/form-data',
         'Accept': '*/*',
         'Access-Control-Allow-Origin': '*',
       },
       data: form
   };
   return axios(config);
}