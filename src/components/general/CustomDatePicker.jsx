import React from "react";
import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import esLocale from "date-fns/locale/es";
import { INPUT_TYPE } from "../../config/config";

export const CustomDatePicker = (props) => {

   const {required} = props;
	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
				<DesktopDatePicker
					{...props}
					renderInput={(params) => (
						<TextField
							{...params}
							size="small"
							className="form-control"
							variant={INPUT_TYPE}
							sx={{
								"& .MuiIconButton-root": {
									padding: "15px",
								},
							}}
                     required={required}
						/>
					)}
				/>
			</LocalizationProvider>
		</>
	);
};
