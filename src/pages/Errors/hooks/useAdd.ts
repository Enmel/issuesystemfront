import { useQueryClient, useMutation } from "react-query";
import {createError, ErrorToSave} from "@services/Errors"

export const useAdd = () => {

  const queryClient = useQueryClient();

  return useMutation((error : ErrorToSave) => createError(error), {
    onSuccess: () => {
      queryClient.invalidateQueries("errors");
    },
  });
};