import { dateFormatter2 } from "../../../helpers/dateFormatter";
import { getClientByCode } from "../../clients/selectors/getClientByCode";
import { searchRedenciones } from "../api/redemptionsApi";

export const getRedemptionsByParams = async(size,page,params) =>{
   if (params['fechaDesde']) {
      params['fechaDesde'] = dateFormatter2(params['fechaDesde']);
   }

   if (params['fechaHasta']) {
      params['fechaHasta'] = dateFormatter2(params['fechaHasta']);
   }

   if (params.codeCliente && !params.idCliente) {
      const cliente = await getClientByCode(params.codigoCliente);
      params.idCliente = cliente.id;
   }

   const redemptions = await searchRedenciones(size,page,params);

   redemptions.data._embedded.redencions.forEach((f)=> {
      f.actionDisabled = (f.estadoRedencion !== "OK" || f.tipoRedencion === "BONO");
      f.downloadable = (f.estadoRedencion === "OK"  && f.tipoRedencion === "BONO");
   })
   
   return redemptions;
}