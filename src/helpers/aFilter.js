export const aFilter = (array, array2) => {
   
   array2.forEach(element => {
      array = array.filter(item=> item.id !== element);
   });
   return array;
}