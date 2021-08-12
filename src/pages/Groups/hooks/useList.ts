import { useQuery } from "react-query";
import { getGroups, Group } from "@services/Groups";

export const useList = (text: string) => useQuery<Group[], []>(['groups', text], () => {
    return getGroups({params: {text}})
    .then(({data}) : Group[] => data);
});
