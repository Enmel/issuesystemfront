import axios, {AxiosResponse} from 'axios';
import { useQueryClient, useMutation } from "react-query";

export type FileResource = {
    id : string,
    name : string,
    mime : string,
    url : string
}

const uploadFile = async (file: File): Promise<AxiosResponse<FileResource>> => {

    let formData = new FormData();
    formData.set('file', file);

    return axios.post<FileResource>('/files', formData, {
        headers: {
            'content-type': 'multipart/form-data' // do not forget this 
        }
    });
}

const useUploadFile = () => {

    const queryClient = useQueryClient();
  
    return useMutation((file : File) => uploadFile(file), {
      onSuccess: () => {
        queryClient.invalidateQueries("upload");
      },
      onError: () => {
          queryClient.invalidateQueries("upload");
      }
    });
};

export {uploadFile, useUploadFile};