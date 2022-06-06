/*
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";


const dateFormatter = (date) => {
	let d = parseISO(date);
	const offSet = d.getTimezoneOffset();
	d = new Date(d.valueOf() + offSet * 60 * 1000);
	d = format(d, "dd/MM/yyyy");
	return d;
};

const currencyFormatter = (value) => {
	let formatter = new Intl.NumberFormat("es-CO", {
		style: "currency",
		currency: "COP",
	});
	return formatter.format(value);
};
*/

import { currencyFormatter } from "../../../helpers/currencyFormatter";
import { dateFormatter } from "../../../helpers/dateFormatter";


export const getBillColumns = () => {


	const columns = [
		{
			field: "numeroFactura",
			headerName: "Nro",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "center",
			type: "string",
			cellClassName: "clickableCell",
		},
		{
			field: "pedido",
			headerName: "Pedido",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			type: "string",
			align: "center",
		},
		{
			field: "estado",
			headerName: "Estado",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			type: "string",
			align: "center",
			
		},
		{
			field: "fechaFactura",
			headerName: "Fecha",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			align: "center",
			type: "dateTime",
			valueFormatter: ({ value }) => dateFormatter(value),
		},
		{
			field: "tipoFactura",
			headerName: "Tipo",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			type: "string",
			align: "center",
		},
		{
			field: "flagEsPremium",
			headerName: "Premium",
			flex: 0.7,
			headerClassName: "headerCol",
			headerAlign: "center",
			type: "boolean",
			align: "center",
		},
		{
			field: "valor",
			headerName: "Valor",
			flex: 1,
			headerClassName: "headerCol",
			headerAlign: "center",
			type: "number",
			align: "right",
			valueFormatter: ({ value }) => currencyFormatter(value),
		},
	];
	return columns;
};
