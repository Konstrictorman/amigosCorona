import { getDefinicionReportesByTipoProceso } from "../api/processApi";

export const getReportDefinitionsByProcessType = async (tp) => {
	const rd = await getDefinicionReportesByTipoProceso(tp);

	const array = rd.data._embedded.definicionReportes
		.slice()
		.sort((a, b) => a.descripcion.localeCompare(b.descripcion));

	array.forEach((item) => {
		delete item._links;
	});

	return array;
};
