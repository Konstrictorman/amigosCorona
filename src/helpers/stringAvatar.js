import { stringToColor } from "./stringToColor";

export const stringAvatar = (name) => {
	if (name) {
		return {
			sx: {
				bgcolor: stringToColor(name),
			},
			children: `${name?.split(" ")[0][0]}${name?.split(" ")[1][0]}`,
		};
	}
};
