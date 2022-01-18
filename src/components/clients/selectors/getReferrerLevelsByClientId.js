import { referrerLevels } from "../../../data/referrerLevels";

export const getReferrerLevelsByClientId = (clientId) => {
   return referrerLevels.filter(r => r.idCliente === parseInt(clientId, 10));
}