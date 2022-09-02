import { getNoDomainUserName } from "../../../helpers/getNoDomainUserName";
import { saveRegistroMovimiento, saveRegistroMovimientoSeq } from "../api/movementApi";


export const addRecordMovement = async (rMovement) => {
   if (rMovement) {
      const result = await saveRegistroMovimiento(rMovement);
      return result;
   } else {
      throw new Error("No se puede guardar registro vacío");
   }   
}

export const addRecordMovementSeq = async(record, userName) => {
   if (record) {
      const usr = getNoDomainUserName(userName);
      record.estadoFactura = "A";
      //record.fechaAsigna = dateFormatter3(record.fechaAsigna);
      //record.idFactura=null;
      record.idFacturaAdj="";
      record.idProceso=0;
      record.motivo= "MAN";
      record.pedido="";
      record.premio="N";
      record.puntaje=0;
      record.sequencia=0;
      record.ultUsuario=usr;
      record.valorAcumulado= record.valor;
      //console.log(JSON.stringify(record,null,2));
      const result = await saveRegistroMovimientoSeq(record);
      return result;
   } else {
      throw new Error("No se puede guardar registro vacío");
   }
}