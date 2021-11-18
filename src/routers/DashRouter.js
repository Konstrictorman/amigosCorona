import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import { Bills } from '../components/bills/Bills';
import { ClientList } from '../components/clients/ClientList';
import { Home } from '../components/general/Home';
import { PageNotFound } from '../components/general/PageNotFound';
import { Layout } from '../components/layout/Layout';
import { Promotion } from '../components/promotions/Promotion';
import { PromotionsList } from '../components/promotions/PromotionsList';
import { SalesPoint } from '../components/salesPoint/SalesPoint';
import { SalesPointList } from '../components/salesPoint/SalesPointList';



export const DashRouter = () => {
   return (
      <>
      
         <Layout>
         
            <div>
               <Switch>
                  <Route exact path="/home" component={Home}/>
                  <Route exact path="/bills" component={Bills}/>
                  <Route exact path="/clientList" component={ClientList}/>
                  <Route exact path="/promotionsList" component={PromotionsList}/>
                  <Route exact path="/promotion" component={Promotion}/>
                  <Route exact path="/salesPoint" component={SalesPoint}/>
                  <Route exact path="/salesPointList" component={SalesPointList}/>
                  <Route exact path="/" component={Home}/>
                  <Route component={PageNotFound}/>
                
               </Switch>   
            </div>
            
         </Layout> 
            
      </>
   )
}
