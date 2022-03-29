import React from "react";
import {
	Card,
	CardContent,
	Button,
} from "@mui/material";

export const HomeCard = (props) => {
	const { handleClick, title, icon } = props;
	return (
		<div>
			{/*<Grid className="noPadding" item xs={2}>*/}
			
				<Card className="home__card" onClick={handleClick}>
					<CardContent className="home__card__content">
						{icon}
						<Button
							className="btn-primary mt-3 mx-2"
							variant="contained"
							style={{ textTransform: "none" }}
                     
						>
							{title}
						</Button>
					</CardContent>
				</Card>
			
			{/*</Grid>*/}
		</div>
	);
};
