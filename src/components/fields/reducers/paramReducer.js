
/*
 [
   {
      id: 99,
      parametro: 'param',
      valor: 'valor'
      idPuntoVenta: 54,
      idGrupoParametros: 90,
   } 
]
 */

export  const paramReducer = (state =[], action) => {
   switch (action.type) {
      case 'add':
         return [...state, action.payload];
         
      case 'remove':
         return state.filter(todo => todo.id !== action.payload);

      default:
         return state;
   }

}
