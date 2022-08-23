import moment from "moment";
import { dateFormatter3, dateFormatter4 } from "../../../helpers/dateFormatter";
import { addRedencion, descargarRedencionById, procesarRedencionById, updateRedencion } from "../api/redemptionsApi"

export const reverseRedemption = async(red) => {
   red.estadoRedencion = "DE";
   red.amount =0;
   red.fechaModificacion = dateFormatter3(new Date());
   red.actionDisabled=true;
   const pv = red.puntoVenta;
   delete red.puntoVenta;
   await updateRedencion(red.id, red);
   red.puntoVenta = pv;
}

export const createRedemption = async(red)=> {
   if (red) {
      const date = moment.now();
      const fecha = dateFormatter4(date);
      red.fecha = fecha;
      red.fechaCreacion = fecha;
      red.fechaModificacion = fecha;
      red.estadoRedencion="IN";
      red.usariosCreacion="PRUEBA";
      red.usariosModificacion="PRUEBA";
      
      const redemp = await addRedencion(red);
      return redemp.data;   
   } else {
      throw new Error("NO es posible crear una redención con datos vacíos");
   }
}

export const processRedemptionById = async (id) => {
   if (id) {
      await procesarRedencionById(id);
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