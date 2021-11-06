import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import { Bills } from '../components/bills/Bills';
import { ClientList } from '../components/clients/ClientList';
import { Home } from '../components/general/Home';
import { PageNotFound } from '../components/general/PageNotFound';
import { Layout } from '../components/layout/Layout';
import { Promotions } from '../components/promotions/Promotions';
import { SalesPoint } from '../components/salesPoint/SalesPoint';
import { SalesPointList } from '../components/salesPoint/SalesPointList';
import { SalesPointNew } from '../components/salesPoint/SalesPointNew';



export const DashRouter = () => {
   return (
      <>
      
         <Layout>
         
            <div>
               <Switch>
                  <Route exact path="/home" component={Home}/>
                  <Route exact path="/bills" component={Bills}/>
                  <Route exact path="/clientList" component={ClientList}/>
                  <Route exact path="/promotions" component={Promotions}/>
                  <Route exact path="/salesPoint" component={SalesPoint}/>
                  <Route exact path="/salesPointNew" component={SalesPointNew}/>
                  <Route exact path="/salesPointList" component={SalesPointList}/>
                  
                  <Route component={PageNotFound}/>
                  <Redirect to="/home"/>
               </Switch>   
            </div>
            
         </Layout> 
            
      </>
   )
}
