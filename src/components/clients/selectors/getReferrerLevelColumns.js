import { dateFormatter2 } from "../../../helpers/dateFormatter";

export const getReferrerLevelColumns = (benefits) => {

   const getBenefitName = (val) => {
      if (benefits) {
         const ben = benefits.find((b)=> b.id === val);
         if (ben) {
            return ben.nivelBeneficio;
         } else {
            return val;
         }
      } else {
         return val;
      }
   }

   const getBenefitDesc = (val) => {
      
      if (benefits) {
         const ben = benefits.find((b)=> b.id === val.idNivelBeneficio);
         if (ben) {
            return ben.descripcion;
         } else {
            return val;
         }
      } else {
         return val;
      }
   }

   const columns = [
      {
         field: "estado",
         headerName: "Estado",
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',
      },
      {
         field: "fechaReferencia",
         headerName: "Fecha de referencia",
         flex:1.5,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',
         type: 'dateTime',    
         valueFormatter: ({ value }) => dateFormatter2(value),        
      },
      {
         field: "idNivelBeneficio",
         headerName: "Nivel",
         flex:1,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'center',
         type: 'string',         
         valueFormatter: ({ value }) => getBenefitName(value),  
      },     
      {
         field: "descripcion",
         headerName: "Descripción",
         flex:3,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'left',
         type: 'string',         
         valueGetter: ({row}) => getBenefitDesc(row),  
      },       
   ];
   return columns;
}