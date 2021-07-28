import axios, {AxiosResponse} from 'axios';
import { User} from "./Members";

type Picture = {
    id?: number,
    name?: string,
    mime?: string,
    url?: string
}

export type Group = {
    id : number,
    name : string,
    description : string,
    picture : Picture
}

export type Error = {
    id?: number,
    title: string,
    status: string,
    type:string,
    comments: Comment[],
    group: Group,
    reporter: User,
    created_at: string,
    updated_at: string
}

export type ErrorToSave = {
    title: string,
    comment: string,
    group: number,
}

const getErrors = async (): Promise<AxiosResponse<Error[]>> => {
    return axios.get<Error[]>('/errors');
}


export {getErrors};