import { useQueryClient, useMutation } from "react-query";
import { removeMember } from "@services/Members";

export const useRemove = (idGroup: number) => {

  const queryClient = useQueryClient();

  return useMutation((idMember: number) => removeMember(idGroup, idMember),
  {
    onSuccess: () => {
      queryClient.invalidateQueries("members");
    },
  });
};