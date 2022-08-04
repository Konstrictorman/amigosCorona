import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginView } from "../components/login/LoginView";
import { DashRouter } from "./DashRouter";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useDispatch, useSelector } from "react-redux";
import {
   loadDocumentTypes,
   loadGenders,
	loadLoadTypes,
	loadPeriods,
	loadProcessStates,
	loadProcessTypes,
	loadPrograms,
	loadRedemptionTypes,
	loadReferredStatus,
	loadSpecialties,
	loadStates,
} from "../components/fields/actions/fieldActions";
import { Spinner } from "../components/general/Spinner";
import {
	finishLoading,
	removeError,
	setError,
	startLoading,
} from "../components/general/actions/uiActions";
import Swal from "sweetalert2";
import { loadFieldValues } from "../components/fields/actions/fieldValuesActions";

export const AppRouter = () => {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.ui);

   
	useEffect(() => {
		dispatch(startLoading());
		try {
         dispatch(loadSpecialties());
			dispatch(loadStates());
         dispatch(loadProcessStates());
         dispatch(loadReferredStatus());
         dispatch(loadFieldValues());
         dispatch(loadGenders());
			dispatch(loadPeriods());
         dispatch(loadPrograms());
         dispatch(loadLoadTypes());      
         dispatch(loadDocumentTypes());
         dispatch(loadProcessTypes());
         dispatch(loadRedemptionTypes());
			dispatch(removeError());
		} catch (e) {
			console.log(e);
			Swal.fire("Error", e.message, "error");
         dispatch(setError(e));
		}
		dispatch(finishLoading());
	}, [dispatch]);

	if (loading) {
		return <Spinner />;
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Router>
				<div>
					<Routes>
						<Route exact path="/login" element={<LoginView />} />
						<Route path="/*" element={<DashRouter />} />
					</Routes>
				</div>
			</Router>
		</LocalizationProvider>
	);
};
