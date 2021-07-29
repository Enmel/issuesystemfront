import { toggleState } from '../../../services/Errors';
import { useQueryClient, useMutation } from "react-query";

export const useToggleError = (id: number) => {

  const queryClient = useQueryClient();
  
  return useMutation(() => toggleState(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("error");
    },
  });
};