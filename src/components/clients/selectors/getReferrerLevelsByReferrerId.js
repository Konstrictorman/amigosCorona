import { getNivelesReferenciadorByIdRef } from "../api/clientApi";

export const getReferrerLevelsByReferrerId = async (id) => {
   if (id) {
      const res = await getNivelesReferenciadorByIdRef(id);
      const levels = res.data._embedded.matriculaReferenciadorNivels;

      levels.forEach((l) => {
         delete l._links;
      });
      return levels;
   } else {
      return [];
   }
}