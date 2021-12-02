import { benefits } from "../../../data/benefits";


export const getBenefitById = (id) => {
   return benefits.find(b => b.id === parseInt(id,10));
}