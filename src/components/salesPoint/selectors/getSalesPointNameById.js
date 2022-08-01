import { getSalesPointById } from "./getSalesPointById";

export const getSalesPointNameById = async (id) => {
   const sp = await getSalesPointById(id);
   //console.log(sp);
   return sp?.descripcion;
}