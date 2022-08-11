import React from "react";
import PropTypes from "prop-types";

export const Spinner = ({css}) => {
	return (
		<div className={css}>
         <p><strong>Loading...</strong></p>
			<div className="spinner-border text-primary" role="status" style={{'width': '3rem', 'height': '3rem'}}/>
		</div>
	);
};

Spinner.propTypes = {
   css: PropTypes.array.isRequired,
}
