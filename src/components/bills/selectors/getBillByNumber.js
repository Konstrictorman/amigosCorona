import { bills } from "../../../data/bills"

export const getBillByNumber = (number) => {
   return bills.find(b => b.numeroFactura === (number));
}