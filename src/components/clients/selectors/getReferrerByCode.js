import { getClientByCode } from "./getClientByCode";
import { getReferrerByClientId } from "./getReferrerByClientId";

export const getReferrerByCode = async (code) => {
   if (code) {
      const client = await getClientByCode(code);
      console.log(JSON.stringify(client,null,2));
      const referrer = await getReferrerByClientId(client.id);
      referrer.nombre = client.nombreCompleto;
//      console.log(JSON.stringify(referrer,null,2));


      return referrer;
   } else {
      return null;
   }
}

