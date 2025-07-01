'use client'
import React, { useState } from "react";
import Link from 'next/link';
import {
    QueryClient,
    QueryClientProvider,
    useQuery
} from "@tanstack/react-query"

import WavyText from './WavyText.js';

const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Example />
        </QueryClientProvider>
    )
}

function Example() {
    const [playerName, setPlayerName] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [shouldFetch, setShouldFetch] = useState(false)

    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ["player", playerName],
        queryFn: async () => {
            const response = await fetch(
                "https://api.allorigins.win/raw?url=https://api.wynncraft.com/v3/player/" + playerName
            )
            return await response.json()
        },
        enabled: shouldFetch && playerName.length > 0
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (inputValue.trim()) {
            setPlayerName(inputValue.trim())
            setShouldFetch(true)
        }
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <div className="mb-6">
                <div className="mb-4">
                    <label htmlFor="playerName" className="block text-sm font-medium mb-2">
                        Player Name:
                    </label>
                    <input
                        id="playerName"
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit(e)
                            }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="enter player name"
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                    search player
                </button>
            </div>

            {isPending && shouldFetch && <p className="text-white"><WavyText text={"Loading"} /></p>}
            {error && <p className="text-red-900">An error has occurred: {error.message}</p>}
            {data && data.Error && (
                <div className="bg-red-50 p-4 rounded-md border border-red-200">
                    <p className="text-red-900">{data.Error}</p>
                </div>
            )}
            {data && !data.Error && (
                <div className="bg-gray-50 p-4 rounded-md">
                    <h1 className="text-xl text-black mb-2">{data.username}</h1>
                    <div className="text-black">
                        Total playtime: {Math.floor(data.playtime)} hrs <br />
                        {data.online ? "Online on " : "Last seen on "} {data.server} <br />
                        {data.guild ? (
                            <> {data.guild.rank} of{' '}
                                <Link href={`https://wynncraft.com/stats/guild/${data.guild.name}`}
                                className="hover:text-green-700 underline text-green-900"
                                target="_blank"
                                > {data.guild.name} </Link> </>
                        ) : (
                            "No guild"
                        )}
                        <br />

                        Warcount: {data.globalData.wars} (#{data.ranking.warsCompletion}) <br />
                        --- <br />
                        Total Raids: {data.globalData.raids.total} <br />
                        <div className="pl-4">
                            NOTG: {data.globalData.raids.list['Nest of the Grootslangs'] + " "}
                            (<Icon name="social_leaderboard" />#{data.ranking.grootslangSrPlayers} <Icon name="sports_score" />#{data.ranking.grootslangCompletion})<br />
                            NOL: {data.globalData.raids.list["Orphion's Nexus of Light"] + " "}
                            (<Icon name="social_leaderboard" />#{data.ranking.orphionSrPlayers} <Icon name="sports_score" />#{data.ranking.orphionCompletion}) <br />
                            TCC: {data.globalData.raids.list["The Canyon Colossus"] + " "}
                            (<Icon name="social_leaderboard" />#{data.ranking.colossusSrPlayers} <Icon name="sports_score" />#{data.ranking.colossusCompletion})<br />
                            TNA: {data.globalData.raids.list["The Nameless Anomaly"] + " "}
                            (<Icon name="social_leaderboard" />#{data.ranking.namelessSrPlayers} <Icon name="sports_score" />#{data.ranking.namelessCompletion})<br />
                        </div>
                    </div>
                    <div className="mt-2 text-2xl text-blue-600">
                        {isFetching ? "Updating..." : ""}
                    </div>
                </div>
            )}
        </div>
    )
}

function Icon({ name }) {
    return (
        <div className="inline-block">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
            <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>
                {name}
            </span>
        </div>
    )
}