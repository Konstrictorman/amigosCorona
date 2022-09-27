import { dateFormatter2 } from "../../../helpers/dateFormatter";
import { getClientByDocument } from "../../clients/selectors/geClientByDocument";
import { searchRedenciones } from "../api/redemptionsApi";

export const getRedemptionsByParams = async(size,page,params) =>{
   console.log(JSON.stringify(params,null,2));   

   if (params['fechaDesde']) {
      params['fechaDesde'] = dateFormatter2(params['fechaDesde']);
   }

   if (params['fechaHasta']) {
      params['fechaHasta'] = dateFormatter2(params['fechaHasta']);
   }

   if (params.documento && !params.idCliente) {
      const cliente = await getClientByDocument(params.documento);
      params.idCliente = cliente.id;
   }

   const redemptions = await searchRedenciones(size,page,params);

   redemptions.data._embedded.redencions.forEach((f)=> {
      f.actionDisabled = (f.estadoRedencion !== "OK" || f.tipoRedencion === "BONO");
      f.downloadable = (f.estadoRedencion === "OK");
   })
   
   return redemptions;
}