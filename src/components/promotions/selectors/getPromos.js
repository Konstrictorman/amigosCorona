import { getPromociones } from "../api/promotionsApi";


export const getPromos = async () => {
   const {data} = await getPromociones();
   data._embedded.exclusionPromocions.forEach((d)=> {
      delete d._links;
   })  

	return data._embedded.exclusionPromocions;
};
