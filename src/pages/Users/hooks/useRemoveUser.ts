import { useQueryClient, useMutation } from "react-query";
import { removeUser } from "../../../services/Users";

export const useRemoveUser = () => {

  const queryClient = useQueryClient();

  return useMutation((id: number) => removeUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};