import { useQueryClient, useMutation } from "react-query";
import {addComment} from "../../../services/Issues";

export const useAddComment = (id: number) => {

  const queryClient = useQueryClient();

  return useMutation((comment : string) => addComment(id, comment), {
    onSuccess: () => {
      queryClient.invalidateQueries("issue");
    },
  });
};