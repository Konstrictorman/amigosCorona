import { format } from "date-fns";
import parseISO from "date-fns/parseISO";
import moment from 'moment';

export const dateFormatter = (date) => {
	let d = parseISO(date);
	const offSet = d.getTimezoneOffset();
	d = new Date(d.valueOf() + offSet * 60 * 1000);
	d = format(d, "dd/MM/yyyy");
	return d;
};

export const dateFormatter2 = (date) => {
   const m = moment(date).format('YYYY-MM-DD');     
   return m;
};

export const dateFormatter3 = (date) => {
   //const m = moment(date).format('YYYY-MM-DD HH:mm:ss.SSSSSSS');     
   const m = moment(date).format(`yyyy-MM-DDTHH:mm:ss`);     

   
   return m;
};

export const dateFormatter4 = (date) => {
   //const m = moment(date).format('YYYY-MM-DD HH:mm:ss.SSSSSSS');     
   const m = moment(date).format(`yyyy-MM-DDTHH:mm:ss.SSSZ`);     

   
   return m;
};