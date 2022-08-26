import { getProgramasReferenciacion } from "../api/referenceProgramsApi";

export const getReferencePrograms = async () => {
	const data = await getProgramasReferenciacion();

	const array = data?.data?._embedded?.programaReferenciacions
		.slice()
		.sort((a, b) => a.descripcion.localeCompare(b.descripcion));

	array?.forEach((f) => {
		delete f._links;
	});
	return array;
};
