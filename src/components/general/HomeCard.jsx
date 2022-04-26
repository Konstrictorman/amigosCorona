import React from "react";
import { Card, CardContent } from "@mui/material";

export const HomeCard = (props) => {
	const { handleClick, title, icon } = props;
	return (
		<div title={title}>
			<Card className="home__card" onClick={handleClick}>
				<div className="home__icon__frame">
					<CardContent className="home__card__content">
						{icon}

						<div className="btn-home">
							<div>{title}</div>
						</div>
					</CardContent>
				</div>
			</Card>
		</div>
	);
};
