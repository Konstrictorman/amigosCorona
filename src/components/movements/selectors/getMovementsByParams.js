import { searchMovimientosSeq } from "../api/movementApi"


export const getMovementsByParams = async (size, page, params) => {
   const movements = await searchMovimientosSeq(size, page, params);

   return movements;
}