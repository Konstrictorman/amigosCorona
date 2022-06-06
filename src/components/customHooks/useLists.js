import { useSelector } from "react-redux";

export const useLists = () => {
   const estados = useSelector((state) => state.lists.estados);
   const periodos = useSelector((state) => state.lists.estados);
   const programas = useSelector((state) => state.lists.estados);
   const estadosReferido = useSelector((state) => state.lists.estados);



   const getEstadosList = ()=> {
      return estados;
   }

   const getPeriodosList = ()=> {
      return periodos;
   }

   const getProgramasList = ()=> {
      return programas;
   }

   const getEstadosRefList = () => {
      return estadosReferido;
   }

   return [getEstadosList, getPeriodosList, getProgramasList, getEstadosRefList];

}