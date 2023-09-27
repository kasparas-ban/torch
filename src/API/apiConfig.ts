import { QueryClient } from "@tanstack/react-query"

if (!import.meta.env.VITE_HOST_ADDRESS) {
  throw new Error("Missing host address")
}

export const HOST = import.meta.env.VITE_HOST_ADDRESS

export const queryClient = new QueryClient()
