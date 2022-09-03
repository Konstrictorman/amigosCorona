import React from "react";
import { Routes, Route } from "react-router-dom";
import { NoProfileView } from "../components/general/NoProfileView";
import { Layout } from "../components/layout/Layout";

export const NoProfileRouter = ({name, userName}) => {
	return (
		<div>
			{" "}
			<Layout name={name} role="none">
				<div>
					<Routes  >
						<Route path="*" element={<NoProfileView userName={userName} />} />
					</Routes>
				</div>
			</Layout>
		</div>
	);
};
