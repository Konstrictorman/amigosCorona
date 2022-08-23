import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { setError } from "../general/actions/uiActions";
import { getRedemptionsByParams } from "./selectors/getRedemptionsByParams";

export const useRedemptionsQuery = (page, pageSize, params, show) => {
	const [rowCount, setRowCount] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const [rows, setRows] = useState([]);
   const dispatch = useDispatch();

	useEffect(() => {
		let active = true;

		setLoading(true);
		setRowCount(undefined);

		if (show) {
 
			getRedemptionsByParams(pageSize, page, params)
				.then((response) => {
					if (!active) {
						return;
					}

					setRows(response.data?._embedded?.redencions);
					setRowCount(response.data?.page?.totalElements);
					setLoading(false);
				})
				.catch((e) => {
					setLoading(false);
					Swal.fire("Error", e.message, "error");
               dispatch(setError(e));
				});
		} else {
			setRows([]);
			setRowCount(0);
			setLoading(false);
		}
		return () => {
			active = false;
			setLoading(false);
		};
	}, [page, pageSize, params, show, dispatch]);

	return { loading, rows, rowCount };
};
