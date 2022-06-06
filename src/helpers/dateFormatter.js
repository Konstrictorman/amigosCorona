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