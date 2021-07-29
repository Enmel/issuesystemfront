import { useQuery } from "react-query";
import { getError, Error } from "../../../services/Errors";

export const useShow = (id: number) => useQuery(['error', id], () => {
    return getError(id)
    .then(({data}) : Error => data);
});
