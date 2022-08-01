import { TIME_OUT } from "../../../config/config";
import { delay } from "../../../helpers/delay";
import { getValoresCampoByCampoId } from "../api/fieldApi";
import {getFieldValueById} from "./getFieldValueById";

export const getFieldValuesByFieldId = async (campoId) => {

   if (campoId) {
      const valores = await getValoresCampoByCampoId(campoId);
      const values = valores.data._embedded.valorCampoes;
  
      values?.forEach(async (p) => {
         delete p._links;
         p.actionDisabled = true;
         if (p.idValorPadre) {
            //const vc = await getFieldValueById(p.idValorPadre);
            getFieldValueById(p.idValorPadre)
               .then((response) => {
                  p.valorPadre = response.descripcion;      
               })
            //p.valorPadre = vc?.descripcion;
         }
      });      
      delay(TIME_OUT);
      return values;
   } else {
      return []
   }

};