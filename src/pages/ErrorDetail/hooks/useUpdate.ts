import { useQueryClient, useMutation } from "react-query";
import { updateGroup, GroupToSave } from "@services/Groups";

export const useUpdateUser = () => {

  const queryClient = useQueryClient();

  return useMutation((group : GroupToSave) => updateGroup(group), {
    onSuccess: () => {
      queryClient.invalidateQueries("groups");
    },
  });
};