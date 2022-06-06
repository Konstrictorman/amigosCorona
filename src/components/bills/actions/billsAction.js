import { TIME_OUT } from "../../../config/config";
import { delay } from "../../../helpers/delay";
import { addPuntoVenta, deletePuntoVentaById, updatePuntoVenta } from "../../salesPoint/api/salesPointApi";


export const updateBill = async (id, bill) => {
   await updatePuntoVenta(id, bill);
   await delay(TIME_OUT);
}

export const deleteBill = async (id) => {
   await deletePuntoVentaById(id);
   await delay(TIME_OUT);
}

export const addBill = async (bill) => {
   await addPuntoVenta(bill);
   await delay(TIME_OUT);
}