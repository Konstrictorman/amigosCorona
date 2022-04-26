import { delay } from "../../../helpers/delay";
import { getCampos } from "../api/fieldApi";


/**
export const getSalesPoints = () => {
   return salesPoints;
}
*/
export const getFields = async () => {
   
	   const data = await getCampos();   


      const array = data.data._embedded.campoes
                  .slice()
                  .sort((a,b)=> a.campo.localeCompare(b.campo));

      array.forEach((f) => {
         delete f._links;
      })                  
      return array;
   //console.log("sps:", sps.data._embedded.puntoVentas);
};
