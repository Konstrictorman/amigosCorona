import {parameterGroups} from "../../../data/parameterGroups";

export const getParameterGroupById = (id) => {
   return parameterGroups.find(pg => pg.id === parseInt(id, 10));
}