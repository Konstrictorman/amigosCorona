//https://github.com/jquense/yup/issues/559
import * as yup from "yup";

export default function createYupSchema(schema, config) {
   const { id, validationType, validations = [] } = config;
   if (!yup[validationType]) {
     return schema;
   }
   let validator = yup[validationType]();
   validations.forEach((validation) => {
     const { type, value, msg } = validation;
     if (!validator[type]) {
       return;
     }
     validator = validator[type](value, msg);
   });
   schema[id] = validator;
   return schema;
 }