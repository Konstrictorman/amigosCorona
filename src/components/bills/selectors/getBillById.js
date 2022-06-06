import { getFacturaById } from "../api/billsApi";

export const getBillById = async (id) => {
   if (id) {
      const {data} = await getFacturaById(id);
      delete data._links;
      return data;
   } else {
      return null;
   }
}