import { types } from "../../../types/types";

/*
{
   lists :      
      {
         estados:[
            {
               valueId: '#',
               name: 'xxx',
               value: 'xxx'     
            },
            {
               valueId: '#',
               name: 'yyy',
               value: 'yyy'     
            }            
         ],
      }   
}
*/

const initialState = {
	especialidades: [],
	estados: [],
	estadosProceso: [],
	estadosReferido: [],
	valoresCampo: [],
	generos: [],
	periodos: [],
	programas: [],
	tiposArchivoSalida: [],
	tiposCarga: [],
	tiposDocumento: [],
	tiposProceso: [],
	tiposRedencion: [],
};

export const fieldReducer = (state = { initialState }, action) => {
	switch (action.type) {
		case types.fieldsSetGenders:
			return {
				...state,
				generos: action.payload,
			};

		case types.fieldsSetStates:
			return {
				...state,
				estados: action.payload,
			};


		case types.fieldsSetPeriods:
			return {
				...state,
				periodos: action.payload,
			};


		case types.fieldsSetReferredStatus:
			return {
				...state,
				estadosReferido: action.payload,
			};


		case types.fieldsSetPrograms:
			return {
				...state,
				programas: action.payload,
			};


		case types.fieldsSetSpecialties:
			return {
				...state,
				especialidades: action.payload,
			};


		case types.fieldsSetRedemptionTypes:
			return {
				...state,
				tiposRedencion: action.payload,
			};


		case types.fieldsSetProcessTypes:
			return {
				...state,
				tiposProceso: action.payload,
			};


		case types.fieldsSetLoadTypes:
			return {
				...state,
				tiposCarga: action.payload,
			};


		case types.fieldsSetProcessStates:
			return {
				...state,
				estadosProceso: action.payload,
			};


		case types.fieldValuesSetFieldValues:
			return {
				...state,
				valoresCampo: action.payload,
			};

		case types.fieldsSetDocumentTypes:
			return {
				...state,
				tiposDocumento: action.payload,
			};

		case types.fieldsSetOutputFiletypes:
			return {
				...state,
				tiposArchivoSalida: action.payload,
			};

		default:
			return state;
	}
};
