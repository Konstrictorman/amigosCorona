import { TIME_OUT } from "../../../config/config";
import { delay } from "../../../helpers/delay";
import { getCampoById } from "../api/fieldApi";
import {getBoolFromChar} from "../../../helpers/bool";

export const getFieldById = async (id) => {
   if (id) {
      const {data} = await getCampoById(id);
      delay(TIME_OUT);
   
      
         console.log("flag",data.permitePadre);
         data.permitePadre = getBoolFromChar(data.permitePadre);   
      

      delete data._links;
      
      return data;   
   } else {
      return null;
   }
}