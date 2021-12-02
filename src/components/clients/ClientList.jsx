import React from 'react'
import { useAnimatedStyle } from '../customHooks/useAnimatedStyle'

export const ClientList = (history) => {

   const [animatedStyle, handleClick] = useAnimatedStyle(
      {
         history,
         path: '/clientNew'
      }
   )

   return (
		<div className={"text-center animate__animated " + animatedStyle} >
         <h4 className="title">Clientes</h4>
      </div>
   )
}
