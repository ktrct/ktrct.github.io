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
    const [selectedUUID, setSelectedUUID] = useState(null)

    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ["player", playerName, selectedUUID],
        queryFn: async () => {
            let url = "https://api.allorigins.win/raw?url=https://api.wynncraft.com/v3/player/"
            
            if (selectedUUID) {
                // Fetch specific player by UUID
                url += selectedUUID + "?fullResult"
            } else {
                // Initial search by name
                url += playerName + "?fullResult"
            }
            
            const response = await fetch(url)
            const result = await response.json()
            
            // Store the response status for multi-selector detection
            result._responseStatus = response.status
            
            return result
        },
        enabled: shouldFetch && (playerName.length > 0 || selectedUUID)
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (inputValue.trim()) {
            setPlayerName(inputValue.trim())
            setSelectedUUID(null) // Reset UUID selection
            setShouldFetch(true)
        }
    }

    const handlePlayerSelect = (uuid) => {
        setSelectedUUID(uuid)
        setShouldFetch(true)
    }

    const isMultiSelector = data && (data._responseStatus === 300 || (typeof data === 'object' && !data.username && !data.Error))

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
            
            {/* Multi-selector */}
            {isMultiSelector && (
                <div className="bg-yellow-50 p-4">
                    <h3 className="text-lg font-medium text-yellow-800">multiple players have this name logged</h3>
                    <p className="text-yellow-700 mb-3">choose the player you&#39;re looking for:</p>
                    <div className="space-y-2">
                        {Object.entries(data).map(([uuid, playerInfo]) => {
                            // Skip the _responseStatus property we added
                            if (uuid === '_responseStatus') return null;
                            
                            return (
                                <button
                                    key={uuid}
                                    onClick={() => handlePlayerSelect(uuid)}
                                    className="w-full text-left p-3 bg-white hover:bg-gray-50 border border-gray-200 transition-colors"
                                >
                                    <div className="font-medium text-gray-900">{playerInfo.storedName}</div>
                                    <div className="text-sm text-gray-600">
                                        Rank: {playerInfo.rank} <br/>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Regular error handling */}
            {data && data.Error && !isMultiSelector && (
                <div className="bg-red-50 p-4 rounded-md border border-red-200">
                    <p className="text-red-900">{data.Error}</p>
                </div>
            )}

            {/* Regular player data display */}
            {data && !data.Error && !isMultiSelector && (
                <div className="bg-gray-50 p-4 rounded-md">
                    <h1 className="text-xl text-black mb-2">{data.username}</h1>
                    <div className="text-black">
                        <HL c={data.characters}/>
                        Total playtime: {Math.floor(data.playtime)} hrs <br />
                        {data.online ? "Online on " : "Last seen on "} {data.server ?? '✕'} <br />
                        {data.guild ? (
                            <> {data.guild.rank} of{' '}
                                <Link href={`https://wynncraft.com/stats/guild/${data.guild.name}`}
                                className="hover:text-green-700 underline text-green-900"
                                target="_blank"
                                > {data.guild.name} </Link> </>
                            ) : ("No guild")} <br />
                        Warcount: {data.globalData.wars} (#{data.ranking.warsCompletion ?? '✕'}) <br />
                        --- <br />
                        Total Raids: {data.globalData.raids.total} <br />
                        <div className="pl-4">
                            NOTG: {(data.globalData.raids.list['Nest of the Grootslangs'] ?? 0) + " "}
                            (<Icon name="social_leaderboard" />#{data.ranking.grootslangSrPlayers ?? '✕'} <Icon name="sports_score" />#{data.ranking.grootslangCompletion ?? '✕'})<br />
                            NOL: {(data.globalData.raids.list["Orphion's Nexus of Light"] ?? 0) + " "}
                            (<Icon name="social_leaderboard" />#{data.ranking.orphionSrPlayers ?? '✕'} <Icon name="sports_score" />#{data.ranking.orphionCompletion ?? '✕'}) <br />
                            TCC: {(data.globalData.raids.list["The Canyon Colossus"] ?? 0) + " "}
                            (<Icon name="social_leaderboard" />#{data.ranking.colossusSrPlayers ?? '✕'} <Icon name="sports_score" />#{data.ranking.colossusCompletion ?? '✕'})<br />
                            TNA: {(data.globalData.raids.list["The Nameless Anomaly"] ?? 0) + " "}
                            (<Icon name="social_leaderboard" />#{data.ranking.namelessSrPlayers ?? '✕'} <Icon name="sports_score" />#{data.ranking.namelessCompletion ?? '✕'})<br />
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
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=optional" />
            <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>
                {name}
            </span>
        </div>
    )
}

function HL({c}) {
    const highestLvl = (characters) => {
    return Object.entries(characters).reduce((highest, [id, char]) => {
        return char.level > highest.level ? { ...char, id } : highest;
    }, { level: -1 });
    };
    const hc = highestLvl(c)
    return (
        <div>Highest lvl class: {hc.level} {hc.type}</div>
    )
}