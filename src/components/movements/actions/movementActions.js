import { dateFormatter3 } from "../../../helpers/dateFormatter";
import { getMovimientosResumen, saveRegistroMovimiento, saveRegistroMovimientoSeq } from "../api/movementApi";

export const getResume = async (fInit, fFinal) => {
   const resume = await getMovimientosResumen(fInit, fFinal);

   resume.forEach((m) => {
      delete m._links;
   })

   return resume;
}

export const addRecordMovement = async (rMovement) => {
   if (rMovement) {
      const result = await saveRegistroMovimiento(rMovement);
      return result;
   } else {
      throw new Error("No se puede guardar registro vacío");
   }   
}

export const addRecordMovementSeq = async(record) => {
   if (record) {
      record.estadoFactura = "A";
      record.fechaAsigna = dateFormatter3(new Date());
      record.idFactura=0;
      record.idFacturaAdj="";
      record.idProceso=0;
      record.motivo= "MAN";
      record.pedido="";
      record.premio="N";
      record.puntaje=0;
      record.sequencia=0;
      record.ultUsuario="PRUEBA";
      record.valorAcumulado= record.valor;
      const result = await saveRegistroMovimientoSeq(record);
      return result;
   } else {
      throw new Error("No se puede guardar registro vacío");
   }
}