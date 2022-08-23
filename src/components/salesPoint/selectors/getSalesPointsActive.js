import { getPuntosVentaByEstado } from "../api/salesPointApi";

export const getSalesPointsActive = async () => {
	const sps = await getPuntosVentaByEstado("A");

   sps.data._embedded.puntoVentas.forEach((sp)=> {
      delete sp._links;
   })

	const array = sps.data._embedded.puntoVentas
		.slice()
		.sort((a, b) => a.puntoVenta.localeCompare(b.puntoVenta));
	return array;
};
