import { getMovimientosSeq } from "../api/movementApi";

export const getMovements = async (size,page) => {
   const movements = await getMovimientosSeq(size, page);

   return movements;
}