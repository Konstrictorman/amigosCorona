export const getBoolFromChar = (char) => {
   return (char === 'Y'?true:false);
}

export const getCharFromBool = (bool) => {
   return (bool?'Y':'N');
}