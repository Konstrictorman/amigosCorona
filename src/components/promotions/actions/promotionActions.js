import { TIME_OUT } from "../../../config/config";
import { delay } from "../../../helpers/delay";
import { addPromocion, deletePromocionById, updatePromocion } from "../api/promotionsApi"

export const updatePromotion = async (id, promotion) => {
   await updatePromocion(id, promotion);
   await delay(TIME_OUT);
}

export const createPromotion = async (promotion) => {
   await addPromocion(promotion);
   await delay(TIME_OUT);
}

export const deletePromotion = async (id) => {
   await deletePromocionById(id);
   await delay(TIME_OUT);
}