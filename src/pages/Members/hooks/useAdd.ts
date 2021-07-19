import { useQueryClient, useMutation } from "react-query";
import { addMembers } from "@services/Members";

export const useAdd = (idGroup: number) => {

  const queryClient = useQueryClient();

  return useMutation((idMember: number[]) => addMembers(idGroup, idMember),
  {
    onSuccess: () => {
      queryClient.invalidateQueries("members");
    },
  });
};