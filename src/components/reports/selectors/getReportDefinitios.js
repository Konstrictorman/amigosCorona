import { getDefinicionesReporte } from "../api/processApi";

export const getReportDefinitions = async () => {
	const rd = await getDefinicionesReporte();

	const array = rd.data._embedded.definicionReportes
		.slice()
		.sort((a, b) => a.nombreReporte.localeCompare(b.nombreReporte));

   array.forEach((item) => {
      delete item._links;
   })

	return array;
};
