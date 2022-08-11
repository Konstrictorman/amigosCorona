import { getSaldoReferenciadorByDocumento } from "../api/clientApi";

export const getReferrerBalanceByDocument = async (doc) => {
   if (doc) {
      const res = await getSaldoReferenciadorByDocumento(doc);
      delete res.data._links;
      return res.data;
   } else {
      return null;
   }
}