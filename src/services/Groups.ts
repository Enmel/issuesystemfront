import axios, {AxiosResponse} from 'axios';

type Picture = {
    id?: number,
    name?: string,
    mime?: string,
    url?: string
}

export type GroupToSave = {
    id? : number,
    name: string,
    description?: string,
    picture: number
}

export type Group = {
    id : number,
    name : string,
    description : string,
    picture : Picture
}

export type getGroupsConfig = {
    params: {text: string}
}

const getGroups = async (params:getGroupsConfig): Promise<AxiosResponse<Group[]>> => {
    return axios.get<Group[]>('/groups', params);
}

const createGroup = async (params:GroupToSave): Promise<AxiosResponse<Group>> => {
    return axios.post<Group>('/groups', params);
}

const updateGroup = async (params:GroupToSave): Promise<AxiosResponse<Group>> => {
    return axios.put<Group>(`/groups/${params.id}`, params);
}

const removeGroup = async (id: number): Promise<AxiosResponse> => {
    return axios.delete(`/groups/${id}`);
}

export {getGroups, createGroup, updateGroup, removeGroup};