import { getSalesPointsActive } from "./getSalesPointsActive";

export const getSalesPointsForCombo = async () => {
   
   const list = await getSalesPointsActive();

   let salesPoints = [];
   const array = list
                  .slice()
                  .sort((a,b) => a.puntoVenta.localeCompare(b.puntoVenta));

   array.forEach((i) => {
      let obj = {};
      obj["id"] = i.id?.toString();
      obj["label"] = i.puntoVenta + " - " + i.descripcion
      salesPoints.push(obj);
   });
   /*
   const defaultObj = {
      id:"",
      label: ""
   }

   salesPoints.unshift(defaultObj);
   */
   return salesPoints;
}