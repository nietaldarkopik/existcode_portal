import { useMutation } from "@tanstack/react-query";
import { createContactMessage } from "@existcode/api-client";
import { apiClient } from "../../../app/apiClient";

export function useSubmitContactMessage() {
  return useMutation({
    mutationFn: (payload: Parameters<typeof createContactMessage>[1]) => createContactMessage(apiClient, payload)
  });
}
