import { referencePrograms } from "../../../data/referencePrograms";


export const getReferenceProgramById = (id) => {
   return referencePrograms.find(rp => rp.id === parseInt(id,10));
}