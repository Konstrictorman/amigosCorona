import { dateFormatter2 } from "../../../helpers/dateFormatter";
import { searchFacturas } from "../api/billsApi"

export const getBillsByParams = async (size, page, params) => {

   if (params.fechaDesde) {
      params['fechaDesde'] = dateFormatter2(params['fechaDesde']);
   }
   
   if (params.fechaHasta) {
      params['fechaHasta'] = dateFormatter2(params['fechaHasta']);
   }
   

   //console.log("new params: ",params);
   const res = await searchFacturas(size, page, params);


   return res;
}