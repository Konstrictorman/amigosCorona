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
};

export const fieldReducer = (state = { initialState }, action) => {
	switch (action.type) {
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
         }

		default:
			return state;
	}
};
