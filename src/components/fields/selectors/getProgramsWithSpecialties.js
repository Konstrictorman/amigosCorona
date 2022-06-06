import { getFieldValuesByFieldId } from "./getFieldValuesByFieldId";

import {ID_PROGRAMS, ID_SPECIALTIES} from "../../../config/config";
import { getReferencePrograms } from "../../referencePrograms/selectors/getReferencePrograms";

export const getProgramsWithSpecialties = async () => {

   const programs = await getFieldValuesByFieldId(ID_PROGRAMS);
   const specialties = await getFieldValuesByFieldId(ID_SPECIALTIES);

   const refPrograms = await getReferencePrograms();


   programs?.forEach(element => {
      const spec = specialties?.filter((s) => s.idValorPadre === element.id);
      element['specs'] = spec;      

      const twin = refPrograms?.find((rp) => rp.programa === element.valor);
      element['twinId'] = twin?.id;
   });

   return programs;
}