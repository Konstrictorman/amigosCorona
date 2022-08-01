import { dateFormatter2 } from "../../../helpers/dateFormatter";
import { searchMovimientosSeq } from "../api/movementApi"


export const getMovementsByParams = async (size, page, params) => {

   params['fechaInicial'] = dateFormatter2(params['fechaInicial']);
   params['fechaFinal'] = dateFormatter2(params['fechaFinal']);
   const movements = await searchMovimientosSeq(size, page, params);

   return movements;
}