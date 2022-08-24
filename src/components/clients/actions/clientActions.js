import { delay } from "../../../helpers/delay";
import { addCliente, addReferenciadorNivel, createReferenciador, deleteClienteById, updateCliente, updateReferenciador } from "../api/clientApi";
import { TIME_OUT } from '../../../config/config';
import { getClientById } from "../selectors/getClientById";
import { getPhonesByClientId } from "../selectors/getPhonesByClientId";
import { getReferrerByClientId } from "../selectors/getReferrerByClientId";
import { getAddressesByClientId } from "../selectors/getAddressesByClientId";
import { getEmailsByClientId } from "../selectors/getEmailsByClientId";
import { getStatusHistoryByReferrerId } from "../selectors/getStatusHistoryByReferrerId";
import { getReferrerLevelsByReferrerId } from "../selectors/getReferrerLevelsByReferrerId";
import moment from "moment";
import { dateFormatter3 } from "../../../helpers/dateFormatter";

export const updateClient = async (id, client) => {
   await updateCliente(id, client);
   await delay(TIME_OUT);
}

export const deleteclient = async (id) => {
   await deleteClienteById(id);
   await delay(TIME_OUT);
}

export const addclient = async (client) => {
   const res = await addCliente(client);
   await delay(TIME_OUT);
   return res;
}


export const loadClientById = async (id) => {
   if (!id) {
      return null;
   }

   
   
   const client = await getClientById(id);
   const phones = await getPhonesByClientId(id);
   const addresses = await getAddressesByClientId(id);
   const referrer = await getReferrerByClientId(id);
   const mails = await getEmailsByClientId(id);

   const ref = referrer?referrer:{};
   ref.states = [];
   ref.levels = [];

   if (referrer) {
      const states = await getStatusHistoryByReferrerId(ref?.id);
      const levels = await getReferrerLevelsByReferrerId(ref?.id);   
      ref.states = states;
      ref.levels = levels;   
   }

   //console.log("REFERRER: ", JSON.stringify(referrer));

   const cli = {
		id,
		codigoCliente: client.codigoCliente,
		tipoDocumento: client.tipoDocumento,
		documento: client.documento,
		nombreCompleto: client.nombreCompleto,
		facturas: [],
		telefonosclientes: phones,
		referenciador: ref,
		direccionesCliente: addresses,
		emailsCliente: mails,
	}


   //console.log(JSON.stringify(cli));
   return cli;
}


export const updateReferrer = async (id, referrer) => {
   const today = moment.now();
   const date =dateFormatter3(today);   
   referrer.fechaModificacion = date;
   referrer.usuarioModificacion="PRUEBA";
   await updateReferenciador(id, referrer);
}

export const createReferrer = async (referrer) => {
   const today = moment.now();
   const date =dateFormatter3(today);
   referrer.fechaCreacion = date;
   referrer.fechaModificacion = date;
   referrer.usuarioCreacion = "PRUEBA";
   referrer.usuarioModificacion="PRUEBA";
   const ref = await createReferenciador(referrer);
   return ref;
}

export const addReferrerBenefitLevel = async (idBenefitLevel, idReferrer) => {
   if (idBenefitLevel && idReferrer) {
      const obj = {
         estado: "A",
         fechaReferencia: dateFormatter3(moment.now()),
         id:0,
         idNivelBeneficio: idBenefitLevel,
         idReferenciador: idReferrer,
      }
      const def = await addReferenciadorNivel(obj);
      return def;
   } else {
      throw new Error("Imposible guardar beneficio sin identificador de referido/nivelBeneficio");
   }
}

