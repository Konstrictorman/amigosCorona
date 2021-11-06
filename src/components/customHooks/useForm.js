import { useEffect, useState } from "react";


export const useForm = (initialState={}) => {

   const [formState, setFormState] = useState(initialState);


   //Desestructura del event, el objeto target en el argumento
   const handleInputChange = ({target}) => {
      
      setFormState({
         ...formState,
         [target.name]: target.value,
      })
   }   

   const reset = () => {
      setFormState(initialState);
   }

   useEffect(() => {
      console.log(formState)
   }, [formState])

   return [formState, handleInputChange, reset];
}
