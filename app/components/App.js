'use client'
import React from "react"
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from "@tanstack/react-query"
const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["player"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.cors.lol/?url=https://api.wynncraft.com/v3/player/KeterComet"
      )
      return await response.json()
    }
  })

  if (isPending) return "Loading..."

  if (error) return "An error has occurred: " + error.message

  return (
    <div>
      <h1>{data.username}</h1>
      <p>{data.server}</p>
      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  )
}
