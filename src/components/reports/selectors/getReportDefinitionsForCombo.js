import { getReportDefinitionsByProcessType } from "./getReportDefinitionsByProcessType";

export const getReportDefinitionsForCombo = async (tipoProceso) => {

   const list = await getReportDefinitionsByProcessType(tipoProceso);
   let defs = [];

   list.forEach((i) => {
      let obj = {};
      obj["id"] = i.id;
      obj["label"] = i.descripcion;
      defs.push(obj);
   })

   return defs;

}