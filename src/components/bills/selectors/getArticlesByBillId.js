import { getArticulosFacturaByFacturaId } from "../api/billsApi"

export const getArticlesByBillId = async (id) => {
   if (id) {
      const {data} = await getArticulosFacturaByFacturaId(id);
      delete data._links;
      return data._embedded.articuloFacturas;
   } else {
      return [];
   }
}