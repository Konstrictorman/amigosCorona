import { getParametrosByGrupoParametroId } from "../api/parametersApi";

export const getParametersByParameterGroupId = async (id) => {
	if (id) {
		const params = await getParametrosByGrupoParametroId(id);

		const array = params.data._embedded.parametroes
			.slice()
			.sort((a, b) => a.parametro.localeCompare(b.parametro));

		return array.map(obj => ({...obj,actionDisabled:true}));
	} else {
      return null;
   }
};
