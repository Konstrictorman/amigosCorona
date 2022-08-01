import { getSaldoReferenciadoByCodigo } from "../api/clientApi";

export const getReferrerBalanceByCode = async (code) => {
   if (code) {
      const res = await getSaldoReferenciadoByCodigo(code);
      delete res.data.p._links;
      return res.data;
   } else {
      return null;
   }
}