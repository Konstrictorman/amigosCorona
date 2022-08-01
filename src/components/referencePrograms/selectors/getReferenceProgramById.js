import {getProgramaReferenciacionById} from "../api/referenceProgramsApi";

export const getReferenceProgramById =async (id) => {
   if (id) {
      const {data} = await getProgramaReferenciacionById(id);
      delete data._links;
      return data;
   } else {
      return null;
   }
}