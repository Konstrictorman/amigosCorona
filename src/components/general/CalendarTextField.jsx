import { TextField } from "@mui/material";
import { withStyles } from "@mui/styles";

export const CalendarTextField = withStyles({
   root: {
      
      '& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
         padding: '0px 5px 0px 10px' ,
         margin: 0,  
         height: '26px',       
      },
     '& .css-i4bv87-MuiSvgIcon-root' : {
        fontSize: '24px',
     },
     '& .MuiOutlinedInput-root': {
       '& fieldset': {
         borderColor: 'rgba(255,255,255,0)',
       },
       '&:hover fieldset': {
         borderColor: 'rgba(255,255,255,0)',
       },
       '&.Mui-focused fieldset': {
         borderColor: 'rgba(255,255,255,0)',
       },     
     },
   },
 })(TextField);