import React from "react";

export const Spinner = () => {
	return (
		<div className="text-center spinner-top-margin">
         <p><strong>Loading...</strong></p>
			<div className="spinner-border text-primary" role="status" style={{'width': '3rem', 'height': '3rem'}}/>
		</div>
	);
};
