import { useQuery } from "react-query";
import { getUsers } from "../../../services/Users";
import {User} from "../../../services/Login";

export const useGetUsers = (email: string) => useQuery(['users', email], () => {
    return getUsers({params: {email}})
    .then(({data}) : User[] => {
        window.dispatchEvent(new Event('resize'));
        return data; 
    });
}, { keepPreviousData : true });

export const useGetUsersWithFilter = (param : number[]) => useQuery(['users', param], () => {
    return getUsers({params: {email: ""}})
    .then(({data}) : User[] => {
        return data.filter((user) => !param.includes(user.id)) 
    });
});
