import { getFacturas } from "../api/billsApi"

export const getBills = async (size, page) => {
   const facturas = await getFacturas(size, page);
   
   return facturas;
}