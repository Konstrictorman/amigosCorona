import { getRedenciones } from "../api/redemptionsApi";


export const getRedemptions = async () => {
   const redemptions = await getRedenciones();
   const array = redemptions.data._embedded.redencions
      .slice()
      .sort((a,b) => a.referencia.localeCompare(b.referencia));

   array.forEach(async (f) => {
      //console.log(f);
      f.actionDisabled = (f.estadoRedencion !== "OK" || f.tipoRedencion === "BONO");
      f.downloadable = (f.estadoRedencion === "OK"  && f.tipoRedencion === "BONO");
		delete f._links;
	});
   //delay(10000, console.log("waiting"));
   return array;
}