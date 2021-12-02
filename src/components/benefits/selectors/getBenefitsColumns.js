import { getReferenceProgramById } from "../../referencePrograms/selectors/getReferenceProgramById";

const getReferenceProgramName = (id) => {
   const rp = getReferenceProgramById(id);
   return rp?.programa? rp.programa:'';
}

export const getBenefitsColumns = () => {
   const columns = [
      { 
         field: "nivelBeneficio", 
         headerName: "Nombre", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         cellClassName: 'clickableCell',
         type: 'string'
      },
      { 
         field: "descripcion", 
         headerName: "Descripción", 
         flex:3,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string'
      },  
      { 
         field: "idProgramaReferenciacion", 
         headerName: "P. de ref", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'string',
         valueFormatter: ({value}) => getReferenceProgramName(value),
      },        
      {
         field: "estado",
         headerName: "Estado",
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center'
      },            
   ];
    
   return columns;
}