import { useQuery } from "react-query";
import { getIssues, Issue } from "../../../services/Issues";

export const useList = (text: string) => useQuery(['issues', text], () => {
    return getIssues({params: {text}})
    .then(({data}) : Issue[] => data);
});
