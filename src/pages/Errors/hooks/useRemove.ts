import { useQueryClient, useMutation } from "react-query";
import { removeGroup } from "@services/Groups";

export const useRemoveUser = () => {

  const queryClient = useQueryClient();

  return useMutation((id: number) => removeGroup(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("groups");
    },
  });
};