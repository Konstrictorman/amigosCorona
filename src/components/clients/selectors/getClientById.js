import { clients } from "../../../data/clients"

export const getClientById = (id) => {
   return clients.find(c => c.id === parseInt(id, 10));
}