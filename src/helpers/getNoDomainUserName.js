export const getNoDomainUserName = (userName) => {
   const index = userName.indexOf("@");
   const str = userName.substring(0,index);
   return str;

}