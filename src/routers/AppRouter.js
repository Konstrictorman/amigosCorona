import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {LoginView} from '../components/login/LoginView';
import { DashRouter } from './DashRouter';

export const AppRouter = () => {
   return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/login" component={LoginView}/>
               <Route path="/" component={DashRouter}/>
				</Switch>
			</div>
		</Router>
   )
}
