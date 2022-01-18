import { useState } from 'react'

export const useAnimatedStyle = (initialValues={}) => {

   const [style, setstyle] = useState('animate__fadeIn');
   const {navigate, path} = initialValues;

   const handleClickOut = (e) => {
      setstyle('animate__fadeOut');
      
      setTimeout(() => {
         navigate(path)
      }, 200);
   }

   return [style, handleClickOut];
}
