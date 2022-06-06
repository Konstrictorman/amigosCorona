import { getNivelBeneficioById } from "../api/benefitsApi";

const initialState = {
   id: 0,
   nivelBeneficio: "",
   descripcion: "",
   estado: "I",
   flagEstado: false,
   flagDefecto: false,
   flagEnvEle: false,
   frecuenciaComp: 0,
   idProgramaReferenciacion: "",
   numMesesCom: 0,
   numMesesVigencia: 0,
   pctValInicial: 0,
   pctValNormal: 0,
   pctValPropio: 0,
   valMaxmo: 0,
   valMinRedencion: 0,
   valMinimo: 0,
};

export const getBenefitById = async (id) => {
   if (id) {
      const benefit = await getNivelBeneficioById(id);
      delete benefit.data._links;   
      return benefit.data;
   } else {
      return {
         ...initialState
      };
   }

}