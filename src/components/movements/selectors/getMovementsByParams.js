import { dateFormatter2 } from "../../../helpers/dateFormatter";
import { getClientByCode } from "../../clients/selectors/getClientByCode";
import { searchRegistroMovimientosSeq } from "../api/movementApi"


export const getMovementsByParams = async (size, page, params) => {

   if (params['fechaDesde']) {
      params['fechaDesde'] = dateFormatter2(params['fechaDesde']);
   }

   if (params['fechaHasta']) {
      params['fechaHasta'] = dateFormatter2(params['fechaHasta']);
   }

   if (!params.idCliente) {
      const cliente = await getClientByCode(params.codigoCliente);
      params.idCliente = cliente.id;
   }
      
   const movements = await searchRegistroMovimientosSeq(size, page, params);

   return movements;
}