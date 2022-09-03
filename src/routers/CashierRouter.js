import { Route, Routes } from "react-router-dom"
import { Client } from "../components/clients/Client"
import { ClientList } from "../components/clients/ClientList"
import { Home } from "../components/general/Home"
import { PageNotFound } from "../components/general/PageNotFound"
import { Layout } from "../components/layout/Layout"
import { Redemption } from "../components/redemptions/Redemption"
import { RedemptionsList } from "../components/redemptions/RedemptionsList"

export const CashierRouter = ({name}) => {

   return (
      <>
			<Layout name={name} role="cashier">
				<div>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/home" element={<Home />} />
                  <Route exact path="/login" element={<Home />} />
						<Route exact path="/client" element={<Client />} />
						<Route exact path="/clientList" element={<ClientList />} />
						<Route exact path="/redemptionsList" element={<RedemptionsList />}/>
						<Route exact path="/redemption" element={<Redemption />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</div>
			</Layout>
      
      </>
   )
}