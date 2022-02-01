import { redemptions } from "../../../data/redemptions"

export const getRedemptionById = (id) => {
   return redemptions.find(r => r.id === parseInt(id, 10));
}