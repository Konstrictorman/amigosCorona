import { bills } from "../../../data/bills"

export const getBillById = (id) => {
   return bills.find(b => b.id === parseInt(id, 10));
}