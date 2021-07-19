import { useQuery } from "react-query";
import { getMembers, User } from "@services/Members";

export const useList = (id: number) => useQuery(['members', id], () => {
    return getMembers(id)
    .then(({data}) : User[] => data);
});
