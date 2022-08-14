import { getFieldById } from "./getFieldById";
import { getFieldValuesByFieldId } from "./getFieldValuesByFieldId";


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
      //const array = await setPadres(hijos);

      const hijosConPadre = hijos.slice().sort((a,b) => a.descripcion.localeCompare(b.descripcion));
      hijosConPadre.forEach((i)=>{i.actionDisabled=true});
      
		const campo = {
			...field,
			items: hijosConPadre,
		};

      
		return campo;
	} else {
		return initialValues;
	}
};
