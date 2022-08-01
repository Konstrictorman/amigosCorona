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
	estados: [],
	periodos: [],
	estadosReferido: [],
	programas: [],
	genders: [],
	especialidades: [],
	tiposRedencion: [],
	tiposProceso: [],
   tiposCarga: [],
};

export const fieldReducer = (state = { initialState }, action) => {
	switch (action.type) {
		case types.fieldsSetGenders:
			return {
				...state,
				genders: action.payload,
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

		default:
			return state;
	}
};
