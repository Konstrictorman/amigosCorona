export const getNoDomainUserName = (userName) => {
   if (userName) {
      const index = userName.indexOf("@");
      const str = userName.substring(0,index);
      return str;   
   } else {
      return "";
   }

}