import { promos } from "../../../data/promos";

export const getPromoById = (id) => {
   return promos.find(promo=> promo.id === parseInt(id,10));
}