import { addValorCampo, deleteValorCampoById, getValoresCampos, updateValorCampo } from "../api/fieldValuesApi"
import { types } from "../../../types/types";

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

export const getFieldValues = async() => {
   const res = await getValoresCampos();
   res.data._embedded.valorCampoes.forEach((vc)=> {
      delete vc._links;
   })
   return res?.data?._embedded.valorCampoes;
}

export const setFieldValues = (fv) => ({
   type: types.fieldValuesSetFieldValues,
   payload: fv,
});

export const loadFieldValues = () => {
   return async(dispatch) => {
      const genders = await getFieldValues();
      dispatch(setFieldValues(genders));
   }
}