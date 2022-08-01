import { TIME_OUT } from "../../../config/config";
import { delay } from "../../../helpers/delay";
import { getSalesPointNameById } from "../../salesPoint/selectors/getSalesPointNameById";
import { getRedenciones } from "../api/redemptionsApi";


export const getRedemptions = async () => {
   const redemptions = await getRedenciones();
   const array = redemptions.data._embedded.redencions
      .slice()
      .sort((a,b) => a.referencia.localeCompare(b.referencia));

   array.forEach(async (f) => {
      const name = await getSalesPointNameById(f.idPuntoVenta);
      console.log(f);
      f.puntoVenta = name;
      f.actionDisabled = (f.estadoRedencion === "OK" && f.tipoRedencion === "NEQUI")?false:true ;
		delete f._links;
	});
   //delay(10000, console.log("waiting"));
   return array;
}