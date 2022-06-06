export const processParams = (params) => {
   let attrs = "";
	if (params) {
		Object.entries(params).forEach((param) => {
			attrs = attrs + "&" + param[0] + "=" + param[1];
		});
	}
   return attrs;
}