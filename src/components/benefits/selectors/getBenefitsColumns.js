import { getReferenceProgramById } from "../../referencePrograms/selectors/getReferenceProgramById";

const getReferenceProgramName = (id) => {
   const rp = getReferenceProgramById(id);
   return rp?.programa? rp.programa:'';
}

export const getBenefitsColumns = () => {
   const columns = [
      { 
         field: "nivelBeneficio", 
         headerName: "Nivel de beneficio", 
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
         flex:2.5,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string'
      },  
      { 
         field: "programa", 
         headerName: "P. de ref", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'string',
         //valueFormatter: ({value}) => getReferenceProgramName(value),
      },        
      {
         field: "estadoDesc",
         headerName: "Estado",
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center'
      },            
   ];
    
   return columns;
}