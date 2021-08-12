import { useQuery } from "react-query";
import { getErrors, Error } from "../../../services/Errors";

export const useList = (text: string) => useQuery(['errors', text], () => {
    return getErrors({params: {text}})
    .then(({data}) : Error[] => data);
});
