import { dateFormatter3 } from "../../../helpers/dateFormatter";
import { addRedencion, updateRedencion } from "../api/redemptionsApi"

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

export const addRedemption = async(red)=> {
   await addRedencion(red);
}