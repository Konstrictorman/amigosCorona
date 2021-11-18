import { salesPoints } from "../../../data/salesPoints";



export const getSalesPointById = (id) => {
   return salesPoints.find(sp=> sp.id === parseInt(id,10));
}
