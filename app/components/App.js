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
        "https://api.wynncraft.com/v3/player/KeterComet"
      )
      return await response.json()
    }
  })

  if (isPending) return "Loading..."

  if (error) return "An error has occurred: " + error.message

  return (
    <div>
      <h1>{data.online}</h1>
      <p>{data.rankbadge}</p>
      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  )
}
