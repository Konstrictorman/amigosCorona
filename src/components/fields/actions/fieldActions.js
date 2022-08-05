import {
   deleteCampo,
   saveCampo,
   updateCampo,
} from "../api/fieldApi";
import { types } from "../../../types/types";
import { delay } from "../../../helpers/delay";
import { getFieldValuesByFieldId } from "../selectors/getFieldValuesByFieldId";
import { ID_DOCUMENT_TYPES, ID_GENDERS, ID_LOAD_TYPES, ID_PERIODS, ID_PROCESS_STATES, ID_PROCESS_TYPES, ID_PROGRAMS, ID_REDEMPTION_TYPES, ID_REFERRED_STATUS, ID_SPECIALTIES, ID_STATES, TIME_OUT } from "../../../config/config";
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

export const loadGenders = () => {
   return async(dispatch) => {
      const genders = await getFieldValuesByFieldId(ID_GENDERS);
      dispatch(setGenders(genders));
   }
}

export const setGenders = (genders) => ({
   type: types.fieldsSetGenders,
   payload: genders
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

export const loadSpecialties = () => {
   return async(dispatch) => {
      const spec = await getFieldValuesByFieldId(ID_SPECIALTIES);
      dispatch(setSpecialties(spec));
   }
}

export const setSpecialties = (specs) => ({
   type: types.fieldsSetSpecialties,
   payload: specs
});

export const loadRedemptionTypes = () => {
   return async(dispatch) => {
      const rt = await getFieldValuesByFieldId(ID_REDEMPTION_TYPES);
      dispatch(setRedemptionTypes(rt));
   }
}

export const setRedemptionTypes = (rt) => ({
   type: types.fieldsSetRedemptionTypes,
   payload: rt
});

export const loadProcessTypes = ()=> {
   return async(dispatch) => {
      const pt = await getFieldValuesByFieldId(ID_PROCESS_TYPES);
      dispatch(setProcessTypes(pt));
   }   
}

export const setProcessTypes = (pt) => ({
   type: types.fieldsSetProcessTypes,
   payload: pt
});

export const loadLoadTypes = ()=> {
   return async(dispatch) => {
      const lt = await getFieldValuesByFieldId(ID_LOAD_TYPES);
      dispatch(setLoadTypes(lt));
   }   
}

export const setLoadTypes = (lt) => ({
   type: types.fieldsSetLoadTypes,
   payload: lt
});

export const loadProcessStates = ()=> {
   return async(dispatch) => {
      const lt = await getFieldValuesByFieldId(ID_PROCESS_STATES);
      dispatch(setProcessStates(lt));
   }   
}

export const setProcessStates = (lt) => ({
   type: types.fieldsSetProcessStates,
   payload: lt
});

export const loadDocumentTypes = ()=> {
   return async(dispatch) => {
      const dt = await getFieldValuesByFieldId(ID_DOCUMENT_TYPES);
      dispatch(setDocumentTypes(dt));
   }   
}

export const setDocumentTypes = (dt) => ({
   type: types.fieldsSetDocumentTypes,
   payload: dt
});


export const saveField = async (field) => {
   //console.log("field:",field);
   const res = await saveCampo(field);
   await delay(TIME_OUT);
   return res.data;
}

export const updateField = async (id, field) => {
   const res = await updateCampo(id, field);
   await delay(TIME_OUT);
   return res.data;
}

export const deleteField = async (id) => {
   const res = await deleteCampo(id);
   await delay(TIME_OUT);
   return res.data;
}