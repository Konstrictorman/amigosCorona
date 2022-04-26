import { delay } from "../../../helpers/delay";
import { addPuntoVenta, deletePuntoVentaById, updatePuntoVenta } from "../api/salesPointApi";
import { TIME_OUT } from '../../../config/config';

export const updateSalesPoint = async (id, salesPoint) => {
   await updatePuntoVenta(id, salesPoint);
   await delay(TIME_OUT);
}

export const deleteSalesPoint = async (id) => {
   await deletePuntoVentaById(id);
   await delay(TIME_OUT);
}

export const addSalesPoint = async (salesPoint) => {
   const res = await addPuntoVenta(salesPoint);
   await delay(TIME_OUT);
   return res;
}

