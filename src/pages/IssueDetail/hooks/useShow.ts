import { useQuery } from "react-query";
import { getIssue, Issue } from "../../../services/Issues";

export const useShow = (id: number) => useQuery(['issue', id], () => {
    return getIssue(id)
    .then(({data}) : Issue => data);
});
