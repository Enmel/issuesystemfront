import axios, {AxiosResponse} from 'axios';

type Picture = {
    id?: number,
    name?: string,
    mime?: string,
    url?: string
}

export type User = {
    id: number,
    name: string,
    email: string,
    picture: string,
    role: string
}

const getMembers = async (id: number): Promise<AxiosResponse<User[]>> => {
    return axios.get<User[]>(`/groups/${id}/members`);
}

const addMembers = async (id: number, members: number[]): Promise<AxiosResponse<null>> => {
    return axios.post<null>(`/groups/${id}/members`, {members: members});
}

const removeMember = async (id: number, idMember: number): Promise<AxiosResponse> => {
    return axios.delete(`/groups/${id}/members/${idMember}`);
}

export {addMembers, removeMember, getMembers};