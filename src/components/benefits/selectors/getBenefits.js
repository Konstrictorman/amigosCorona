import { getNivelesBeneficios } from "../api/benefitsApi";

export const getBenefits = async () => {
	const benefits = await getNivelesBeneficios();

	const array = benefits.data._embedded.nivelBeneficios
		.slice()
		.sort((a, b) => a.nivelBeneficio.localeCompare(b.nivelBeneficio));

	array.forEach((f) => {
		delete f._links;
	});

	return array;
};
