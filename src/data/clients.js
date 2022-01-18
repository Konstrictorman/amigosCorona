export const clients = [
   {
      id: 1,
      codigoCliente: "PLDOCS3X",
      documento: "13514130",
      primerApellido: "Pérez",
      primerNombre: "Karen",
      segundoApellido: "Beltrán",
      segundoNombre: "Yovanna",
      telefonosCliente: [
         {
            idCliente: 1,
            idTelefono: 1,
            principal: true,
            telefono: "3045189562",
            tipoTelefono: "celular",
         }
      ],
      tipoDocumento: "Cédula de ciudadanía",
      direccionesCliente: [
        {
          barrio: "La Victoria",
          ciudad: "Bogotá",
          departamento: "Cundinamarca",
          direccion: "Calle 146 #45-21 Int2 Apt 301",
          idCliente: 1,
          idDireccion: 1,
          principal: true,
          tipoDireccion: 'Casa'
        },
        {
         barrio: "Chicó",
         ciudad: "Bogotá",
         departamento: "Cundinamarca",
         direccion: "Calle 98b #10-23 Oficina 810",
         idCliente: 1,
         idDireccion: 2,
         principal: false,
         tipoDireccion: 'Oficina'
       },        
      ],
      emailsCliente: [
        {
          idCliente: 1,
          idMail: 1,
          mail: "karen.perez@presidencia.gov.co",
          principal: true,
          tipoMail: "corporativo",
        },
        {
         idCliente: 1,
         idMail: 2,
         mail: "amoaivanDuque72@gmail.com",
         principal: false,
         tipoMail: "personal",
       }        
      ],
      referenciador: {
        especialidad: "ENC",
        estadoRef: "Aprobado",
        fechaCreacion: "2021-12-04T01:19:47.399Z",
        fechaMat: "2021-12-04T01:19:47.399Z",
        fechaModificacion: "2021-12-04T01:19:47.399Z",
        genero: "Femenino",
        idCliente: 1,
        idLifeMiles: "120587653954",
        idProgramaReferenciacion: 2,
        numHijos: 1,
        referencia1: "Alguna referencia",
        usuarioCreacion: "Admin",
        usuarioModificacion: "Admin",                
      },
   },
   {
      id: 2,
      codigoCliente: "CLIOC34S",
      documento: "13514187",
      primerApellido: "Castellanos",
      primerNombre: "Ermenegildo",
      segundoApellido: "Torres",
      segundoNombre: "",
      telefonosCliente: [
         {
            idCliente: 2,
            idTelefono: 1,
            principal: true,
            telefono: "3145189562",
            tipoTelefono: "celular",
         }
      ],
      tipoDocumento: "Cédula de ciudadanía",
      direccionesCliente: [
        {
          barrio: "Mazuren",
          ciudad: "Bogotá",
          departamento: "Cundinamarca",
          direccion: "Calle 152b #56-24 Int3 Apt 402",
          idCliente: 2,
          idDireccion: 1,
          principal: true,
          tipoDireccion: 'Casa'
        },
        {
         barrio: "Chapinero",
         ciudad: "Bogotá",
         departamento: "Cundinamarca",
         direccion: "Calle 52b #8-32",
         idCliente: 2,
         idDireccion: 2,
         principal: false,
         tipoDireccion: 'Oficina'
       },        
      ],
      emailsCliente: [
        {
          idCliente: 2,
          idMail: 1,
          mail: "hermenegildo@gmail.com",
          principal: true,
          tipoMail: "corporativo",
        },
      ],
      referenciador: {
         especialidad: "ENC",
         estadoRef: "Aprobado",
         fechaCreacion: "2021-10-14T01:19:47.399Z",
         fechaMat: "2021-11-22T01:19:47.399Z",
         fechaModificacion: "2021-12-04T01:19:47.399Z",
         genero: "Masculino",
         idCliente: 2,
         idLifeMiles: "988535653954",
         idProgramaReferenciacion: 3,
         numHijos: 0,
         referencia1: "Alguna referencia",
         usuarioCreacion: "Admin",
         usuarioModificacion: "Admin",                
      },
   }   
]