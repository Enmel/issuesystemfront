import { useQueryClient, useMutation } from "react-query";
import {createIssue, IssueToSave} from "@services/Issues"

export const useAdd = () => {

  const queryClient = useQueryClient();

  return useMutation((issue : IssueToSave) => createIssue(issue), {
    onSuccess: () => {
      queryClient.invalidateQueries("issues");
    },
  });
};