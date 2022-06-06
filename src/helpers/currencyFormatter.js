
export const currencyFormatter = (value) => {
	let formatter = new Intl.NumberFormat("es-CO", {
		style: "currency",
		currency: "COP",
	});
	return formatter.format(value);
};