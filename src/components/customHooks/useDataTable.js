import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const useDataTable = (initialValues = {}) => {
	const navigate = useNavigate();
	const [state, setState] = useState(initialValues);

	const handleOpenModal = () => {
		setState({
			...state,
			openModal: true,
		});
	};
	const handleCloseModal = () => {
		setState({
			...state,
			openModal: false,
		});
	};

   useEffect(() => {
      console.log("Estado modal: ",JSON.stringify(state.openModal))
   }, [state.openModal]);

	const handleRowChange = (ids) => {
		console.log("Ids:", ids);
		setState({
			...state,
			selectedIds: ids,
		});
	};

	const handleClick = (params) => {
		const { field, row } = params;
		if (field === state.fieldName) {
			console.log("Abriendo registro ", row);
			navigate(`${state.path}?id=${row.id}`);
		}
	};

	const deleteItems = () => {
		handleCloseModal();
		//setLoading(true);
		setState({
			...state,
			loading: true,
			openModal: false,         
		});
		//setRows(rows.filter((r) => !selectedIds.includes(r.id)));
		//setSelectedIds([]);
		setState({
			...state,
         rows: state.rows.filter((r) => !state.selectedIds.includes(r.id)),
			selectedIds: [],
			loading: false,
		});
	};

	return [
		state,
		handleOpenModal,
		handleCloseModal,
		handleRowChange,
		handleClick,
		deleteItems,
	];
};
