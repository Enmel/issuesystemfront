import { useQueryClient, useMutation } from "react-query";
import { createGroup, GroupToSave } from "@services/Groups";

export const useAdd = () => {

  const queryClient = useQueryClient();

  return useMutation((group : GroupToSave) => createGroup(group), {
    onSuccess: () => {
      queryClient.invalidateQueries("groups");
    },
  });
};