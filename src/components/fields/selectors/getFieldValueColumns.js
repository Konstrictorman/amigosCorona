import { getFieldValueById } from "./getFieldValueById";

const getFieldFatherDesc = async ({value}) => {
   const p = await getFieldValueById(value);
   return p?p.descripcion:'';
}


export const getFieldValueColumns = () => {
   const columns = [
      {
         field: "descripcion", 
         headerName: "Nombre", 
         flex:2,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'left' ,
         type: 'string',
         editable: true
      },    
      {
         field: "valor", 
         headerName: "Valor", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'string',
         editable: true
      },   
      /*
      {
         field: "idValorPadre", 
         headerName: "Padre", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'string',
         //valueGetter: ({value}) => (getFieldFatherDesc(value).then((res)=>(res))),
         valueGetter: getFieldFatherDesc,
      },
      */    
         
      {
         field: "valorPadre", 
         headerName: "Padre", 
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center', 
         align: 'center' ,
         type: 'string',
      },        
      
   ];
   return columns;
}