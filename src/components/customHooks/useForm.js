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

   const handleDateChange = (name, value) => {
      setFormState({
         ...formState,
         [name]: value,
      })
   }    

   const handleCheckChange = ({target}) => {
      setFormState({
         ...formState,
         [target.name]: target.checked,
      })
   }      

   const reset = () => {
      setFormState(initialState);
   }

   useEffect(() => {
      console.log(formState)
   }, [formState])

   return [formState, handleInputChange, handleDateChange, handleCheckChange, reset];
}
