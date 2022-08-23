import React from "react";
import { TextField } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import esLocale from "date-fns/locale/es";
import { INPUT_TYPE } from "../../config/config";

export const CustomDatePicker = (props) => {

   const {required} = props;
	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
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
