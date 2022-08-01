import { getPuntoVentaById } from "../api/salesPointApi";

export const getSalesPointById = async (id) => {
	if (id) {
		const sp = await getPuntoVentaById(id);
		delete sp.data._links;
		
		return sp.data;
	} else {
		return null;
	}
};
