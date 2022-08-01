import {getGruposParametros} from "../api/parametersApi";

export const getParametersGroup = async () => {
   const pg = await getGruposParametros();

   const array = pg.data._embedded.grupoParametroses
                  .slice()
                  .sort((a,b)=> a.grupoParametros.localeCompare(b.grupoParametros));   
   return array;
}