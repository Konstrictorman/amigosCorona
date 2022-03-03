import React from 'react'
import { Routes, Route } from "react-router-dom";
import { BillsList } from '../components/bills/BillsList';
import { Client } from '../components/clients/Client';
import { ClientList } from '../components/clients/ClientList';
import { Home } from '../components/general/Home';
import { PageNotFound } from '../components/general/PageNotFound';
import { Layout } from '../components/layout/Layout';
import { Promotion } from '../components/promotions/Promotion';
import { PromotionsList } from '../components/promotions/PromotionsList';
import { ReferenceProgramList } from '../components/referencePrograms/ReferenceProgramList';
import { ReferenceProgram} from '../components/referencePrograms/ReferenceProgram';
import { SalesPoint } from '../components/salesPoint/SalesPoint';
import { SalesPointList } from '../components/salesPoint/SalesPointList';
import { Benefit } from '../components/benefits/Benefit';
import { BenefitsList } from '../components/benefits/BenefitsList';
import { Bill } from '../components/bills/Bill';
import { MovementsList } from '../components/movements/MovementsList';
import { RedemptionsList } from '../components/redemptions/RedemptionsList';
import { Redemption } from '../components/redemptions/Redemption';
import { ParameterGroupsList } from '../components/parameterGroups/ParameterGroupsList';
import { ParameterGroup } from '../components/parameterGroups/ParameterGroup';
import { LoadData } from '../components/loadData/LoadData';
import { RecordMovement } from '../components/movements/RecordMovement';

export const DashRouter = () => {
   return (
      <>
         <Layout>
            <div>
               <Routes>
                  <Route exact path="/home" element={<Home/>}/>
                  <Route exact path="/benefit" element={<Benefit/>}/>
                  <Route exact path="/benefitsList" element={<BenefitsList/>}/>
                  <Route exact path="/billsList" element={<BillsList/>}/>
                  <Route exact path="/bill" element={<Bill/>}/>
                  <Route exact path="/client" element={<Client/>}/>
                  <Route exact path="/clientList" element={<ClientList/>}/>
                  <Route exact path="/loadData" element={<LoadData/>}/>
                  <Route exact path="/movementList" element={<MovementsList/>}/>
                  <Route exact path="/parameterGroupsList" element={<ParameterGroupsList/>}/>
                  <Route exact path="/parameterGroup" element={<ParameterGroup/>}/>
                  <Route exact path="/promotionsList" element={<PromotionsList/>}/>
                  <Route exact path="/promotion" element={<Promotion/>}/>
                  <Route exact path="/recordMovement" element={<RecordMovement/>}/>
                  <Route exact path="/redemptionsList" element={<RedemptionsList/>}/>
                  <Route exact path="/redemption" element={<Redemption/>}/>
                  <Route exact path="/referenceProgram" element={<ReferenceProgram/>}/>
                  <Route exact path="/referenceProgramList" element={<ReferenceProgramList/>}/>
                  <Route exact path="/salesPoint" element={<SalesPoint/>}/>
                  <Route exact path="/salesPointList" element={<SalesPointList/>}/>
                  <Route exact path="/" element={<Home/>}/>
                  <Route element={<PageNotFound/>}/>
               </Routes>   
            </div>
         </Layout> 
      </>
   )
}
