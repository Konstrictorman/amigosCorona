import { delay } from "../../../helpers/delay";
import { getPuntoVentaById } from "../api/salesPointApi";

export const getSalesPointById = async (id) => {
	if (id) {
		const sp = await getPuntoVentaById(id);
		
		//console.log("sps:", sp.data);
		return sp.data;
	} else {
		return {
			id: 0,
			puntoVenta: "",
			descripcion: "",
			estado: "",
		};
	}
};
