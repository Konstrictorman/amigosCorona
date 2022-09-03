import { dateFormatter2 } from "../../../helpers/dateFormatter";
import { getClientByDocument } from "../../clients/selectors/geClientByDocument";
import { searchRegistroMovimientosSeq } from "../api/movementApi"


export const getMovementsByParams = async (size, page, params) => {


   if (params['fechaDesde']) {
      params['fechaDesde'] = dateFormatter2(params['fechaDesde']);
   }

   if (params['fechaHasta']) {
      params['fechaHasta'] = dateFormatter2(params['fechaHasta']);
   }

   if (!params.idCliente) {
      const cliente = await getClientByDocument(params.documento);
      params.idCliente = cliente?.id;
   }

   //delete params.documento;
   delete params.codigoCliente;
  
   const movements = await searchRegistroMovimientosSeq(size, page, params);

   return movements;
}