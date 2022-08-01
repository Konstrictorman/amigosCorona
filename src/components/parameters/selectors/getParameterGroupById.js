import { getGrupoParametroById } from "../api/parametersApi"

export const getParameterGroupById = async(id) => {
   if (id) {
      const pg = await getGrupoParametroById(id);
      delete pg.data._links;
      return pg.data;
   } else {
      return null;
   }
}