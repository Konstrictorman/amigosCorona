import { getReferrerBalanceByCode } from "./getReferrerBalanceByCode";

export const getReferrerByCode = async (code) => {
   if (code) {
      const referrer = await getReferrerBalanceByCode(code);
      return referrer;
   } else {
      return null;
   }
}