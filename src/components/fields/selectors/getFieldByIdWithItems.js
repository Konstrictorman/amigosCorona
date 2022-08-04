import { getFieldById } from "./getFieldById";
import { getFieldValuesByFieldId } from "./getFieldValuesByFieldId";
import { getFieldValueById} from "./getFieldValueById";

const setPadres = async(hijos) => {

   hijos.forEach(async (h) => {
     const fv = await getFieldValueById(h.idValorPadre);
     //console.log("fv:",fv);
      h['valorPadre'] = fv?.valor;
      h['actionDisabled'] = true;
   });

   return hijos;
}

const initialValues = {
   id: 0,
   campo: "",
   descripcion: "",
   //items: [],
   permitePadre: false,
   idCampoPadre: 0,
};


export const getFieldByIdWithItems = async (id) => {
	if (id) {
		const field = await getFieldById(id);
		const hijos = await getFieldValuesByFieldId(id);
      //hijos.forEach((h)=> h.valorPadre = 'sin papá');
      const hijosConPadre = await setPadres(hijos);

      //console.log("hijos:", hijosConPadre);
		const campo = {
			...field,
			items: hijosConPadre,
		};
		return campo;
	} else {
		return initialValues;
	}
};
