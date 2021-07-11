import axios, {AxiosResponse} from 'axios';
import {baseUrl} from "../config/webservice"

export type Auth = {
    email:string
    password:string
}

export type User = {
    name: string,
    email: string,
    picture_url: string,
    role: string
}

export type SessionData = {
    logged: Boolean,
    token?:string
    user?: User
}

const authenticate = async (params:Auth): Promise<AxiosResponse<SessionData>> => {
    return axios.post<SessionData>(baseUrl + '/users/authenticate', params);
}

export {authenticate};