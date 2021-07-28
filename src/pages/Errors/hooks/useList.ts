import { useQuery } from "react-query";
import { getErrors, Error } from "../../../services/Errors";

export const useList = () => useQuery(['errors'], () => {
    return getErrors()
    .then(({data}) : Error[] => data);
});
