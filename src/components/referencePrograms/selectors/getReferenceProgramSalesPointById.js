import { getSalesPoints } from "../../salesPoint/selectors/getSalesPoints";
import { getPRSalesPointsById } from "../api/referenceProgramsApi";


export const getReferenceProgramSalesPointById = async (id) => {

   let pVentas = [];
   const salesPoints = await getSalesPoints();

   if (id) {
      const refProgramSps = await getPRSalesPointsById(id);
      const array = refProgramSps?.data._embedded.programaPuntoVentas;
      array.forEach((f) => {
         delete f._links;
      });
   
      pVentas = salesPoints.map((sp) => {
         const result = array.find((rp)=> rp.idPuntoVenta === sp.id);
         //console.log("result: ",result);
         return {
            id:result?result.id:0,
            idProgramaReferenciacion:id,
            idPuntoVenta: sp.id,
            name: sp.puntoVenta,
            description: sp.descripcion,
            flagActivo: result?result.flagActivo:false,
         }
      })   
   } else {
      pVentas = salesPoints.map((sp)=> {
         return {
            id:0,
            idProgramaReferenciacion:0,
            idPuntoVenta: sp.id,
            name: sp.puntoVenta,
            description: sp.descripcion,
            flagActivo: true,
         }         
      });
   }
   
   //console.log("pVentas:",pVentas);
	return pVentas;
};
