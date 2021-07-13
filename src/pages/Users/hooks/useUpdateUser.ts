import { useQueryClient, useMutation } from "react-query";
import { updateUser, UserParams } from "../../../services/Users";

export const useUpdateUser = () => {

  const queryClient = useQueryClient();

  return useMutation((user : UserParams) => updateUser(user), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};