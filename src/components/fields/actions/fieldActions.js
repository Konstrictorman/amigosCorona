import {
   deleteCampo,
   saveCampo,
   updateCampo,
} from "../api/fieldApi";
import { types } from "../../../types/types";
import { delay } from "../../../helpers/delay";
import { getFieldValuesByFieldId } from "../selectors/getFieldValuesByFieldId";
import { ID_PERIODS, ID_PROGRAMS, ID_REFERRED_STATUS, ID_STATES, TIME_OUT } from "../../../config/config";
import { getReferencePrograms } from "../../referencePrograms/selectors/getReferencePrograms";


export const loadPrograms = () => {
   return async(dispatch) => {
      const programs = await getFieldValuesByFieldId(ID_PROGRAMS);
      const programsRef = await getReferencePrograms();
      programs?.forEach((p)=> {
         const prog = programsRef?.find((pr) => pr.programa ===  p.valor);

         p.idProgramaReferenciacion = prog.id;
         p.tipoPeriodo = prog.tipoPeriodo;
         p.mesesVigencia = prog.mesesVigencia;
      });
      dispatch(setPrograms(programs));
   }
}

export const setPrograms = (programs) => ({
   type: types.fieldsSetPrograms,
   payload: programs,
});

export const loadStates = () => {
   return async(dispatch) => {
      const states = await getFieldValuesByFieldId(ID_STATES);
      dispatch(setStates(states));
   }
}

export const setStates = (fields) => ({
   type: types.fieldsSetStates,
   payload: fields
});

export const loadPeriods = () => {
   return async(dispatch) => {
      const periods = await getFieldValuesByFieldId(ID_PERIODS);
      dispatch(setPeriods(periods));
   }
}

export const setPeriods = (fields) => ({
   type: types.fieldsSetPeriods,
   payload: fields
});

export const loadReferredStatus = () => {
   return async(dispatch) => {
      const rStatus = await getFieldValuesByFieldId(ID_REFERRED_STATUS);
      dispatch(setReferredStatus(rStatus));
   }
}

export const setReferredStatus = (status) => ({
   type: types.fieldsSetReferredStatus,
   payload: status
});



export const saveField = async (field) => {
   const res = await saveCampo(field);
   await delay(TIME_OUT);
   return res;
}

export const updateField = async (id, field) => {
   const res = await updateCampo(id, field);
   await delay(TIME_OUT);
   return res;
}

export const deleteField = async (id) => {
   const res = await deleteCampo(id);
   await delay(TIME_OUT);
   return res;
}