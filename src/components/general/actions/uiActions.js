import { types } from "../../../types/types";

//cuando las acciones son síncronas, no necesitan llevar el return
export const setError = (err) => ({
   type: types.uiSetError,
   payload: err
});

export const removeError = () => {
   return {
      type: types.uiRemoveError,
   }
}

export const startLoading = () => {
   return {
      type: types.uiStartLoading,
   }
}

export const finishLoading = () => {
   return {
      type: types.uiFinishLoading,
   }
}

export const setMessage = (msg) => ({
   type: types.uiSetMessage,
   payload: msg
});

export const removeMessage = () => {
   return {
      type: types.uiRemoveMessage,
   }
}


