import { delay } from "../../../helpers/delay";
import { addPuntoVenta, deletePuntoVentaById, updatePuntoVenta } from "../../salesPoint/api/salesPointApi";


export const updateBill = async (id, bill) => {
   await updatePuntoVenta(id, bill);
   await delay(2000);
}

export const deleteBill = async (id) => {
   await deletePuntoVentaById(id);
   await delay(2000);
}

export const addBill = async (bill) => {
   await addPuntoVenta(bill);
   await delay(2000);
}