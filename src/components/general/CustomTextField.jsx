import { createTheme } from "@mui/material";
import React from "react";

const styles = ({ spacing, palette: { primary } }) => ({
	label: {
		textTransform: "uppercase",
		fontSize: "1.5rem",
	},

	input: {
		top: spacing(2),
		border: `1px solid ${grey[500]}`,
		outline: `1px solid transparent`, // we use a transparent outline here so the component doesn't move when focused
		padding: spacing(1),
		"&$focused": {
			border: `1px solid ${deepPurple[500]}`,
			outline: `1px solid ${deepPurple[500]}`, // this outline makes our "border" thicker without moving the component
		},
	},
	focused: {}, // we have to pass in this focused class to make the focused state rule above work
});

const theme = createTheme({
   palette: {
     primary: {
       main: deepPurple[500],
     },
     secondary: {
       main: amber[500],
       contrastText: deepPurple[900],
     },
   },
   props: {
      MuiButton: {
        disableElevation: true,
      },
      MuiInputLabel: {
        shrink: true, // <---------
      },
      MuiInput: {
        disableUnderline: true, // <---------
      }
    },
    overrides: {
      MuiInputLabel: {
        root: {
          textTransform: 'uppercase',
          fontSize: '1.5rem',
        },
      },
      MuiInput: {
        root: {
          top: theme.spacing(2),
          border: `1px solid ${grey[500]}`,
          outline: `1px solid transparent`,
          padding: theme.spacing(1),
          '&$focused': {
            border: `1px solid ${theme.palette.primary.main}`,
            outline: `1px solid ${theme.palette.primary.main}`,
          },
        },
        // we don't need `focused: {}` with overrides
      },
    }    
 });


const CustomTextField = ({ classes }) => {
	return (
		<div>
			<TextField
				label="Role or Title"
				placeholder="Developer"
				fullWidth
				InputLabelProps={{
					shrink: true, // keep the label in the top left corner and don't shrink on input focus
					classes: {
						root: classes.label,
					},
				}}
				InputProps={{
					classes: {
						root: classes.input,
						focused: classes.focused, // we can't forget to pass this in or &$focused in our input class won't work
					},
					disableUnderline: true, // remove the underline
				}}
			/>
		</div>
	);
};

export default withStyles(styles)(CustomTextField);


