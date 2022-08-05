import React from "react";

export const Separator = (params) => {
	const { title, icon } = params;
	return (
		<div className="separator-container">

				<svg className="separator-line separator-item" viewBox="0 0 100 0.4" xmlns="http://www.w3.org/2000/svg">
					<line x1="0" y1="0" x2="100" y2="0" stroke="#D8D1CA" />
				</svg>

				<div className="separator-title separator-item ">
               
					{title} {icon}
               
				</div>

				<svg className="separator-line separator-item" viewBox="0 0 100 0.4" xmlns="http://www.w3.org/2000/svg">
					<line x1="0" y1="0" x2="100" y2="0" stroke="#D8D1CA" />
				</svg>

		</div>
	);
};
