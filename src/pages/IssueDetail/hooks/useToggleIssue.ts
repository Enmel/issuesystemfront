import { toggleState } from '@services/Issues';
import { useQueryClient, useMutation } from "react-query";

export const useToggleIssue = (id: number) => {

  const queryClient = useQueryClient();

  return useMutation(() => toggleState(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("issue");
    },
  });
};