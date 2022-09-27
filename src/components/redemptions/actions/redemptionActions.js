import moment from "moment";
import { dateFormatter4 } from "../../../helpers/dateFormatter";
import { getNoDomainUserName } from "../../../helpers/getNoDomainUserName";
import { addRedencion, descargarRedencionById, ejecutarReversionById, procesarRedencionById } from "../api/redemptionsApi"


export const reverseRedemption = async(red) => {
   /*
   red.estadoRedencion = "DE";
   red.amount =0;
   red.fechaModificacion = dateFormatter3(new Date());
   
   const pv = red.puntoVenta;
   delete red.puntoVenta;
   red.puntoVenta = pv;
   */
   await ejecutarReversionById(red.id);
   red.actionDisabled=true;   
}

export const createRedemption = async(red,userName)=> {
   if (red) {
      const usr = getNoDomainUserName(userName);
      const date = moment.now();
      const fecha = dateFormatter4(date);
      red.fecha = fecha;
      red.fechaCreacion = fecha;
      red.fechaModificacion = fecha;
      red.estadoRedencion="IN";
      red.usariosCreacion=usr;
      red.usariosModificacion=usr;
      
      const redemp = await addRedencion(red);
      return redemp.data;   
   } else {
      throw new Error("NO es posible crear una redención con datos vacíos");
   }
}

export const processRedemptionById = async (id) => {
   if (id) {
      const resp = await procesarRedencionById(id);
      return resp;
   } else {
      throw new Error("Se requiere el id de la redención a procesar");
   }
}

export const downloadRedemptionById = async(id) => {
   if(id) {
      const data = await descargarRedencionById(id);
      return data;
   } else {
      return null;
   }
}