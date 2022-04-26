import { getFieldById } from "./getFieldById";
import { getFieldValuesByFieldId } from "./getFieldValuesByFieldId";
import { getFieldValueById} from "./getFieldValueById";
import { TIME_OUT } from "../../../config/config";
import { delay } from "../../../helpers/delay";

const setPadres = async(hijos) => {

   hijos.forEach(async (h) => {
     const fv = await getFieldValueById(h.idValorPadre);
     //console.log("fv:",fv);
      h['valorPadre'] = fv?.valor;
      
   });

   return hijos;
}

export const getFieldByIdWithItems = async (id) => {
	if (id) {
		const field = await getFieldById(id);
		const hijos = await getFieldValuesByFieldId(id);
      //hijos.forEach((h)=> h.valorPadre = 'sin papá');
      const hijosConPadre = await setPadres(hijos);

      //console.log("hijos:", JSON.stringify(hijosConPadre));
		const campo = {
			...field,
			items: hijosConPadre,
		};
		return campo;
	} else {
		return null;
	}
};
