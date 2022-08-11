import { dateFormatter2 } from "../../../helpers/dateFormatter";
import { searchRegistroMovimientosSeq } from "../api/movementApi"


export const getMovementsByParams = async (size, page, params) => {

   if (params['fechaInicial']) {
      params['fechaInicial'] = dateFormatter2(params['fechaInicial']);
   }

   if (params['fechaFinal']) {
      params['fechaFinal'] = dateFormatter2(params['fechaFinal']);
   }
      
   const movements = await searchRegistroMovimientosSeq(size, page, params);

   return movements;
}