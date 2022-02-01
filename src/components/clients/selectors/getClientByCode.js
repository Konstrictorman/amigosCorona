import { clients } from "../../../data/clients"

export const getClientByCode = (code) => {
   return clients.find(c => c.codigoCliente === code);
}