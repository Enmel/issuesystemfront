import axios, {AxiosResponse} from 'axios';
import {User} from "./Login";

export type getUsersConfig = {
    params: {email: string}
}

export type removeUserConfig = {
    params: {id: Number}
}

export type UserParams = {
    id?: number,
    name : string,
    role : string,
    email : string,
    password : string,
}

const getUsers = async (params:getUsersConfig): Promise<AxiosResponse<User[]>> => {
    return axios.get<User[]>('/users', params);
}

const createUser = async (params:UserParams): Promise<AxiosResponse<User>> => {
    return axios.post<User>('/users', params);
}

const updateUser = async (params:UserParams): Promise<AxiosResponse<User>> => {
    return axios.put<User>(`/users/${params.id}`, params);
}

const removeUser = async (id: number): Promise<AxiosResponse> => {
    return axios.delete(`/users/${id}`);
}

export {getUsers, createUser, updateUser, removeUser};