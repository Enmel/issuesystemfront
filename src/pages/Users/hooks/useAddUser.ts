import { useQueryClient, useMutation } from "react-query";
import { createUser, UserParams } from "../../../services/Users";

export const useAddUser = () => {

  const queryClient = useQueryClient();

  return useMutation((user : UserParams) => createUser(user), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};