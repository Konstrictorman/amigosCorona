import { TIME_OUT } from "../../../config/config";
import { delay } from "../../../helpers/delay";
import { addGrupoParametro, addParametro, deleteGrupoParametroById, deleteParametroById, updateGrupoParametro, updateParametro } from "../api/parametersApi"

export const deleteParameterGroup = async (id) => {
   await deleteGrupoParametroById(id);
   //await delay(TIME_OUT);
}

export const updateParameterGroup = async (id, pg) => {
   await updateGrupoParametro(id, pg);
   //await delay(TIME_OUT);
}

export const addParameterGroup = async (pg) => {
   const res = await addGrupoParametro(pg);
   //await delay(TIME_OUT);
   delete res.data._links;
   return res.data;
}

export const deleteParameter = async (id) => {
   await deleteParametroById(id);
   //await delay(TIME_OUT);
}

export const updateParameter = async(id, par) => {
   //await updateParametro(id, par);
   await delay(TIME_OUT);
}

export const addParameter = async(par)=> {
   const res = await addParametro(par);
   //await delay(TIME_OUT);
   delete res.data._links;
   return res.data;
}