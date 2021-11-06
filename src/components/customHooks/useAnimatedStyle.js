import { useState } from 'react'

export const useAnimatedStyle = (initialValues={}) => {

   const [style, setstyle] = useState('animate__fadeIn');
   const {history, path} = initialValues;

   const handleClickOut = (e) => {
      setstyle('animate__fadeOut');
      
      setTimeout(() => {
         history.push(path)
      }, 200);
   }

   return [style, handleClickOut];
}
