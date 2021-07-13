import axios, {AxiosResponse} from 'axios';

export type Auth = {
    email:string
    password:string
}

export type User = {
    id: number,
    name: string,
    email: string,
    picture_url: string,
    password: string,
    role: string
}

export type SessionData = {
    logged: Boolean,
    token?:string
    user?: User
}

const authenticate = async (params:Auth): Promise<AxiosResponse<SessionData>> => {
    return axios.post<SessionData>('/users/authenticate', params);
}

export {authenticate};