import { delay } from "../../../helpers/delay";
import { addCliente, deleteClienteById, getEstadosReferenciador, updateCliente, updateReferenciador } from "../api/clientApi";
import { TIME_OUT } from '../../../config/config';
import { getClientById } from "../selectors/getClientById";
import { getPhonesByClientId } from "../selectors/getPhonesByClientId";
import { getReferrerByClientId } from "../selectors/getReferrerByClientId";
import { getAddressesByClientId } from "../selectors/getAddressesByClientId";
import { getEmailsByClientId } from "../selectors/getEmailsByClientId";
import { getStatusHistoryByReferrerId } from "../selectors/getStatusHistoryByReferrerId";
import { getReferrerLevelsByReferrerId } from "../selectors/getReferrerLevelsByReferrerId";

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

   const ref = referrer[0];
   const states = await getStatusHistoryByReferrerId(ref?.id);
   const levels = await getReferrerLevelsByReferrerId(ref?.id);

   if (ref) {
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
   await updateReferenciador(id, referrer);
   await delay(TIME_OUT);
}
