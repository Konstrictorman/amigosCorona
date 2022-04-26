
import { types } from "../../../types/types";

/*
{
   salesPoints: [],
   active: {
      id: #,
      puntoVenta: 'XXXXX',
      descripcion: 'XXXXX',
      estado: 'A'
   }
}
*/

const initialState = {
   salesPoints: [],
   active: null,
};

export const salesPointReducer = (state = initialState, action) => {
   switch (action.type) {

      case types.salesPointListSet:
         return {
            ...state,
            salesPoints: [...action.payload],
         }
      
      case types.salesPointActiveSet:
         return {
            ...state,
            active: {
               ...action.payload
            }
         }
   
      default:
         return state;
   }
}