import React from "react";
import { Footer } from "./Footer";
import { TopBar } from "./TopBar";

export const Layout = ({children}) => {
	return (
		<>
			<div className="row">
				<TopBar />
			</div>
			<div className="row">
				<div className="container">
					<div className="row mb-4">
						<div id="left" className="col-1 "></div>
						<div id="center" className="col-10  text-center container">{children}</div>
						<div id="right" className="col-1 "></div>
					</div>
				</div>
			</div>
         
			<div className="row">
				<Footer />
			</div>         
		</>
	);
};
