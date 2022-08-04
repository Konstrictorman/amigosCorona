import { getPuntosVenta } from "../api/salesPointApi";

/**
export const getSalesPoints = () => {
   return salesPoints;
}
*/
export const getSalesPoints = async () => {
	const sps = await getPuntosVenta();

   const array = sps.data._embedded.puntoVentas
                  .slice()
                  .sort((a,b)=> a.puntoVenta.localeCompare(b.puntoVenta));
   return array;
	//console.log("sps:", sps.data._embedded.puntoVentas);
};
