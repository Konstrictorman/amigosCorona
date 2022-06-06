import { useEffect, useState } from "react";


export const useCustomForm = (initialState={}) => {

   const [formState, setFormState] = useState(initialState);


   //Desestructura del event, el objeto target en el argumento
   const handleInputChange = ({target}) => {
      setFormState({
         ...formState,
         [target.name]: target.value,
      })
   }   

   const handleComplexInputChange = (evt, object) => {
      setFormState({
         ...formState,
         [object] : {
            ...formState[object],
            [evt.target.name]: evt.target.value,
         }
      })
   }     

   const handleValueChange = (name, value) => {
      setFormState({
         ...formState,
         [name]: value,
      })
   }    

   const handleCheckChange = ({target}) => {
      console.log("target:", target.name);
      setFormState({
         ...formState,
         [target.name]: target.checked,
      })
   }      

   const reset = (newFormState = initialState) => {
      setFormState(initialState);
   }

   
   useEffect(() => {
      console.log(formState)
   }, [formState])


   return [formState, handleInputChange, handleValueChange, handleCheckChange, handleComplexInputChange, reset];
}
