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
import { CashierRouter } from "./CashierRouter";
import { NoProfileRouter } from "./NoProfileRouter";
import { getNoDomainUserName } from "../helpers/getNoDomainUserName";

export const AppRouter = () => {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.ui);
   const { accounts } = useMsal();
	//const [graphData, setGraphData] = useState(null);   
   const [isAdmin, setIsAdmin] = useState(false);
   const [isCashier, setIsCashier] = useState(false);
	//const navigate = useNavigate();
	//const isAuthenticated = useIsAuthenticated();
   const name = accounts[0] && accounts[0].name;
   const claims = accounts[0] && accounts[0].idTokenClaims;
   const userName = getNoDomainUserName(accounts[0] && accounts[0].username);

   //console.log(JSON.stringify(accounts[0],null,2));



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
      const checkRoles = ()=> {
         const admin = claims?.roles?.find(x => x === "Administrador");
         const cajero = claims?.roles?.find(x=> x === "Cajero");
         //if (admin) {
            setIsAdmin(true);
         //}

         if (cajero) {
            setIsCashier(true);
         }
      }
      checkRoles();  
   }, [claims]);

   /*
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
   */


	if (loading) {
		return <Spinner css="text-center spinner-top-margin" />;
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Router>
				<div>
					<Routes>
                  {isAdmin && (<Route exact path="/*" element={<DashRouter name={name}/>} />)}
						{isCashier && (<Route exact path="/*" element={<CashierRouter name={name}/>} />)}
                  {!isAdmin && !isCashier && (<Route path="*" element={<NoProfileRouter name={name} userName={userName} />} />)}
					</Routes>
				</div>
			</Router>
		</LocalizationProvider>
	);
};
