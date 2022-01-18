export const referencePrograms = [
	{
		id: 1,
		descripcion: "Programa de referenciación maestro",
		programa: "MAESTRO",
		tipoPeriodo: "Anual",
      estado: "activo",
      programaEstados: [
         {
           estado: "activo",
           fechaReferencia: "2021-11-24T00:59:03.590Z",
           idProgramaEstado: 1,
           idProgramaReferenciacion: 1
         },
         {
            estado: "inactivo",
            fechaReferencia: "2021-11-02T14:59:03.590Z",
            idProgramaEstado: 2,
            idProgramaReferenciacion: 1
          },         
          {
            estado: "activo",
            fechaReferencia: "2021-10-12T16:09:03.590Z",
            idProgramaEstado: 3,
            idProgramaReferenciacion: 1
          },     
          {
            estado: "inactivo",
            fechaReferencia: "2021-09-20T16:09:03.590Z",
            idProgramaEstado: 4,
            idProgramaReferenciacion: 1
          },        
          {
            estado: "inactivo",
            fechaReferencia: "2021-02-15T05:00:00.000Z",
            idProgramaEstado: 5,
            idProgramaReferenciacion: 1
          },                              
       ],
      programaPuntoVentas: [
         {
           flagActivo: true,
           idProgramaPuntoVenta: 1,
           idProgramaReferenciacion: 1,
           idPuntoVenta: 3
         },
         {
            flagActivo: true,
            idProgramaPuntoVenta: 2,
            idProgramaReferenciacion: 1,
            idPuntoVenta: 4,
          }
       ],     
	},
	{
		id: 2,
		descripcion: "Programa de referenciación profesional",
		programa: "PROFESIONAL",
		tipoPeriodo: "Anual",
      estado: "inactivo",
	},   
	{
		id: 3,
		descripcion: "Programa de referenciación amateur",
		programa: "AMATEUR",
		tipoPeriodo: "Semestral",
      estado: "inactivo",
      programaPuntoVentas: [
         {
           flagActivo: true,
           idProgramaPuntoVenta: 3,
           idProgramaReferenciacion: 3,
           idPuntoVenta: 3
         },
         {
            flagActivo: true,
            idProgramaPuntoVenta: 4,
            idProgramaReferenciacion: 3,
            idPuntoVenta: 4,
          },
          {
            flagActivo: true,
            idProgramaPuntoVenta: 5,
            idProgramaReferenciacion: 3,
            idPuntoVenta: 6,
          },    
          {
            flagActivo: true,
            idProgramaPuntoVenta: 6,
            idProgramaReferenciacion: 3,
            idPuntoVenta: 7,
          },                  
       ],      
	},   
];
