import { getMensajesByProcesoId } from "../api/monitorApi"

export const getMessagesByProcessId = async (id) => {
   if (id) {
      const res = await getMensajesByProcesoId(id);
      res.data._embedded.mensajeProcesoes.forEach((m)=> {
         delete m._links;
      })

      return res.data._embedded.mensajeProcesoes;
   }
}