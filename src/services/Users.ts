import axios, {AxiosResponse} from 'axios';
import {baseUrl} from "../config/webservice"
import {User} from "./Login";

export type getUsersConfig = {
    params: {email: string}
}

const getUsers = async (params:getUsersConfig): Promise<AxiosResponse<User[]>> => {
    return axios.get<User[]>(baseUrl + '/users', params);
}

export {getUsers};