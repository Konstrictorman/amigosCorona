import { TIME_OUT } from "../../../config/config";
import { getPromocionesById } from "../api/promotionsApi";
import { delay } from "../../../helpers/delay";

export const getPromoById = async (id) => {
   if (id) {
      const {data} = await getPromocionesById(id);
      delay(TIME_OUT);

      delete data._links;

      return data;
   } else {
      return null;
   }
}