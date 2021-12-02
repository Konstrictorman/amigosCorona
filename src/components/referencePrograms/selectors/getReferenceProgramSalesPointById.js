import { getSalesPoints } from "../../salesPoint/selectors/getSalesPoints";
import { getReferenceProgramById } from "./getReferenceProgramById";

const salesPoints = getSalesPoints();

export const getReferenceProgramSalesPointById = (id) => {
	let result = [];
	if (id) {
		const rp = getReferenceProgramById(id);

		result = salesPoints.map((sp) => {
			const pvs = rp.programaPuntoVentas?.filter(
				(ppv) => ppv.idPuntoVenta === sp.id
			);
			return {
            ...sp,
				flagActivo: pvs?.length > 0 ? true : false,
			};
		});

      result = result.sort((a, b) => a.name.localeCompare(b.name));
	}
	return result;
};
