import { useQuery } from "react-query";
import { getGroup, Group } from "../../../services/Groups";

export const useShow = (id: string) => useQuery(['groups', id], () => {
    return getGroup(id)
    .then(({data}) : Group => data);
});
