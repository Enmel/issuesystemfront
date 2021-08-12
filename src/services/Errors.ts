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

export type Comment = {
    id: number,
    note: string,
    owner: User,
    created_at: string,
    updated_at: string
}

export type CommentType = Comment;

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
    type: string
}

export type getErrorsParam = {
    params: {text: string}
}

const getErrors = async (params:getErrorsParam): Promise<AxiosResponse<Error[]>> => {
    return axios.get<Error[]>('/errors', params);
}

const getError = async (id: number): Promise<AxiosResponse<Error>> => {
    return axios.get<Error>('/errors/' + id);
}

const createError = async (data: ErrorToSave): Promise<AxiosResponse> => {
    return axios.post('/errors', data);
}

const toggleState = async (id: number): Promise<AxiosResponse> => {
    return axios.post('/errors/' + id + '/toggleState');
}

const addComment = async (id : number, comment: string):  Promise<AxiosResponse> => {
    return axios.post('/errors/' + id + '/comment', {note: comment});
}

export {getErrors, getError, createError, toggleState, addComment};