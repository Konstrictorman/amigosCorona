import { format, parseISO } from 'date-fns';
import { getBenefitById } from '../../benefits/selectors/getBenefitById';

const dateFormatter = (date) => {
   let d = parseISO(date);
   const offSet = d.getTimezoneOffset();
   d = new Date(d.valueOf() + offSet * 60 * 1000);
   d = format(d, 'dd/MM/yyyy');
   return d;
}

const getBenefitName = (id) => {
   const b = getBenefitById(id);
   return b?.nivelBeneficio? b.nivelBeneficio: '';
}

const getBenefitDesc = (id) => {
   const b = getBenefitById(id);
   return b?.descripcion? b.descripcion: '';
}

export const getReferrerLevelColumns = () => {
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
         valueFormatter: ({ value }) => dateFormatter(value),        
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
         field: "desc",
         headerName: "Descripción",
         flex:3,
         headerClassName: 'headerCol',
         headerAlign: 'center',
         align: 'left',
         type: 'string',         
         valueGetter: (params) => (getBenefitDesc(`${params.getValue(params.id, 'idNivelBeneficio')}`)),
      },       
   ];
   return columns;
}