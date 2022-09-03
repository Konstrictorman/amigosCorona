import { dateFormatter2 } from "../../../helpers/dateFormatter";
import { getClientByDocument } from "../../clients/selectors/geClientByDocument";
import { getMovimientosResumen } from "../api/movementApi";

export const getMovementResume = async (params) => {
   console.log(JSON.stringify(params,null,2));

   if (params) {
      if (params['fechaDesde']) {
         params['fechaDesde'] = dateFormatter2(params['fechaDesde']);
      }
   
      if (params['fechaHasta']) {
         params['fechaHasta'] = dateFormatter2(params['fechaHasta']);
      }
      
      if (!params.codigoCliente) {
         const cliente = await getClientByDocument(params.documento);         
         if (cliente) {
            console.log(JSON.stringify(cliente,null,2));
            params.codigoCliente = cliente.codigoCliente;   
         } else {
            return [];
         }
      }

      const resume = await getMovimientosResumen(params.codigoCliente, params.fechaDesde, params.fechaHasta);

      resume.data?._embedded?.resumenMovimientoses?.forEach((m) => {
         delete m._links;
      })

      return resume.data?._embedded?.resumenMovimientoses;
   } else {
      throw new Error("No se puede obtener resumen con filtros incompletos");
   }



}