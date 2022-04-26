import { delay } from "../../../helpers/delay";
import { addValorCampo, deleteValorCampoById, updateValorCampo } from "../api/fieldValuesApi"
import { TIME_OUT } from '../../../config/config';

export const addFieldValue = async (fieldValue)=> {
   const res = await addValorCampo(fieldValue);
   //await delay(TIME_OUT);
   return res;
}

export const deleteFieldValue = async(id) => {
   const res = await deleteValorCampoById(id);
   //await delay(TIME_OUT);   
   return res;
}

export const updateFieldValue = async(id, fieldValue) => {
   const res = await updateValorCampo(id, fieldValue);
   //await delay (TIME_OUT);
   return res;
}