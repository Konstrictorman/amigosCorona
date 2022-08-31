import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import { DashRouter } from "./DashRouter";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useDispatch, useSelector } from "react-redux";
import {
	loadDocumentTypes,
	loadGenders,
	loadLoadTypes,
	loadMotives,
	loadOutputFileTypes,
	loadPeriods,
	loadProcessStates,
	loadProcessTypes,
	loadPrograms,
	loadRedemptionStatus,
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
import { useMsal } from "@azure/msal-react";
import { callMsGraph } from "../auth/graph";
import { loginRequest } from "../auth/authConfig";

export const AppRouter = () => {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.ui);
   const { instance, accounts } = useMsal();
	const [graphData, setGraphData] = useState(null);   
	//const navigate = useNavigate();
	//const isAuthenticated = useIsAuthenticated();
   const name = accounts[0] && accounts[0].name;

	useEffect(() => {
		try {
			//if (isAuthenticated) {
			dispatch(startLoading());
			dispatch(loadSpecialties());
			dispatch(loadStates());
			dispatch(loadProcessStates());
			dispatch(loadRedemptionStatus());
			dispatch(loadReferredStatus());
			dispatch(loadFieldValues());
			dispatch(loadGenders());
			dispatch(loadMotives());
			dispatch(loadPeriods());
			dispatch(loadPrograms());
			dispatch(loadOutputFileTypes());
			dispatch(loadLoadTypes());
			dispatch(loadDocumentTypes());
			dispatch(loadProcessTypes());
			dispatch(loadRedemptionTypes());
			dispatch(removeError());
			//}
		} catch (e) {
			console.log(e);
			Swal.fire("Error", e.message, "error");
			dispatch(setError(e));
		}
		dispatch(finishLoading());
	}, [dispatch]);

   useEffect(() => {
      const RequestProfileData = () => {
         const request = {
            ...loginRequest,
            account: accounts[0],
         };
   
         // Silently acquires an access token which is then attached to a request for Microsoft Graph data
         instance
            .acquireTokenSilent(request)
            .then((response) => {
               console.log(JSON.stringify(response,null,2));            
               callMsGraph(response.accessToken).then((response) =>
                  setGraphData(response)
               );
            })
            .catch((e) => {
               instance.acquireTokenPopup(request).then((response) => {
                  callMsGraph(response.accessToken).then((response) =>
                     setGraphData(response)
                  );
               });
            });
      };
   
      RequestProfileData();
   }, [accounts, graphData, instance])
   

	if (loading) {
		return <Spinner css="text-center spinner-top-margin" />;
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Router>
				<div>
					<Routes>
						<Route exact path="/*" element={<DashRouter name={name}/>} />
					</Routes>
				</div>
			</Router>
		</LocalizationProvider>
	);
};
