import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginView } from "../components/login/LoginView";
import { DashRouter } from "./DashRouter";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useDispatch, useSelector } from "react-redux";
import {
	loadPeriods,
	loadPrograms,
	loadReferredStatus,
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

export const AppRouter = () => {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.ui);

   
	useEffect(() => {
		dispatch(startLoading());
		try {
			dispatch(loadStates());
			dispatch(loadPeriods());
			dispatch(loadReferredStatus());
         dispatch(loadPrograms());
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
