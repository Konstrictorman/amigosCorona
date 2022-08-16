import { dateFormatter2 } from "../../../helpers/dateFormatter";
import { buscarProcesos, getProcesoById } from "../api/monitorApi";

export const getProcessByParams = async (size, page, params) => {
	if (params) {
		if (params["fechaDesde"]) {
			params["fechaDesde"] = dateFormatter2(params["fechaDesde"]);
		}

		if (params["fechaHasta"]) {
			params["fechaHasta"] = dateFormatter2(params["fechaHasta"]);
		}

		let res = {
			data: {
				_embedded: {
					procesoes: [],
				},
			},
		};

		if (params.idProceso) {
			const data = await getProcesoById(params.idProceso);
         //console.log(JSON.stringify(data.data._links,null,2));
         delete data.data._links;
			res.data._embedded.procesoes.push(data.data);
         //console.log(JSON.stringify(data,null,2));

		} else {
			res = await buscarProcesos(size, page, params);
			res.data._embedded.procesoes.forEach((p) => {
				delete p._links;
			});
		}
		

		return res;
	} else {
		throw new Error(
			"No se puede ejecutar la tarea sin criterios de búsqueda"
		);
	}
};
