import { searchFacturas } from "../api/billsApi"

export const getBillsByParams = async (size, page, params) => {

   const res = await searchFacturas(size, page, params);


   return res;
}