import { QueryClient } from "@tanstack/react-query"

export const HOST =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_BE_HOSTNAME_DEV
    : import.meta.env.VITE_BE_HOSTNAME

if (!HOST) {
  throw new Error("Missing host address")
}

export const queryClient = new QueryClient()
