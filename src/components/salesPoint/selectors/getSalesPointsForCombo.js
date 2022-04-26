import { getSalesPoints } from "./getSalesPoints"

export const getSalesPointsForCombo = async () => {
   
   const list = await getSalesPoints();

   let salesPoints = [];
   const array = list
                  .slice()
                  .sort((a,b) => a.puntoVenta.localeCompare(b.puntoVenta));

   array.forEach((i) => {
      let obj = {};
      obj["id"] = i.id.toString();
      obj["label"] = i.puntoVenta + " - " + i.descripcion
      salesPoints.push(obj);
   });
   return salesPoints;
}