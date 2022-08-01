import { getClients } from "./getClients"

export const getReferrerForCombo = async () => {
   const list = await getClients(50,0);

   let clients = [];
   list.forEach((c)=> {
      let obj = {};
      obj["id"] = c.id?.toString();
      obj["label"]= c.codigoCliente;
      clients.push(obj);
   })

   return clients;
}