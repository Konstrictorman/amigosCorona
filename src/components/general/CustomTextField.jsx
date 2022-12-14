import { TextField } from "@mui/material";
import { withStyles } from "@mui/styles";

export const CustomTextField = withStyles({
   root: {      
      '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
         padding: '0px 5px 0px 10px' ,
         height: '26px',       
      },
      '& .css-ffg8md-MuiNativeSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
         padding: '2px 15px 0px 10px' ,
      },
     '& .MuiOutlinedInput-root': {
       '& fieldset': {
         borderColor: 'rgba(255,255,255,0)',
       },
       '&:Mui-error fieldset': {
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