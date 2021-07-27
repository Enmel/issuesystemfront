import axios, {AxiosResponse} from 'axios';
import { User} from "@services/Members";

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

export type getIssuesConfig = {
    params: {text: string}
}

export type Comment = {
    id: number,
    note: string,
    owner: User,
    created_at: string,
    updated_at: string
}

export type CommentType = Comment;

export type Issue = {
    id?: number,
    title: string,
    description:string,
    status: string,
    error_code:string,
    comments: Comment[],
    group: Group,
    contact: number,
    reporter: User,
    spotted_at: string,
    created_at: string,
    updated_at: string
}

export type IssueToSave = {
    title: string,
    comment: string,
    group: number,
}

const getIssues = async (params:getIssuesConfig): Promise<AxiosResponse<Issue[]>> => {
    return axios.get<Issue[]>('/issues', params);
}

const getIssue = async (id: number): Promise<AxiosResponse<Issue>> => {
    return axios.get<Issue>('/issues/' + id);
}

const createIssue = async (data: IssueToSave): Promise<AxiosResponse> => {
    return axios.post('/issues', data);
}

const toggleState = async (id: number): Promise<AxiosResponse> => {
    return axios.post('/issues/' + id + '/toggleState');
}

const addComment = async (id : number, comment: string):  Promise<AxiosResponse> => {
    return axios.post('/issues/' + id + '/comment', {note: comment});
}

export {getIssues, getIssue, toggleState, addComment, createIssue};