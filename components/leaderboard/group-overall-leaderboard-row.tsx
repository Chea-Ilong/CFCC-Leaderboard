"use client"

import { Badge } from "@/components/ui/badge"
import { COLORS } from "@/lib/constants"

interface GroupOverallLeaderboardRowProps {
  entry: {
    groupName: string
    memberCount: number
    round1Score: number
    round2Score: number
    teamScore: number
    gameScore: number
    totalScore: number
    members?: string[]
  }
  rank: number
}

export function GroupOverallLeaderboardRow({ entry, rank }: GroupOverallLeaderboardRowProps) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900"
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800"
    if (rank === 3) return "bg-gradient-to-r from-orange-400 to-orange-500 text-orange-900"
    return "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return rank.toString()
  }

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-9 gap-4 items-center bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
        {/* Rank */}
        <div className="flex justify-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${getRankColor(rank)}`}
          >
            {getRankIcon(rank)}
          </div>
        </div>

        {/* Group Name */}
        <div className="col-span-2">
          <div className="font-bold text-lg text-gray-900">{entry.groupName}</div>
          <div className="text-sm text-gray-500">Group Leaderboard</div>
        </div>

        {/* Member Count */}
        <div className="text-center">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {entry.memberCount} members
          </Badge>
        </div>

        {/* Round 1 Score */}
        <div className="text-center">
          <div className="font-semibold text-lg text-gray-900">{Math.round(entry.round1Score)}</div>
          <div className="text-xs text-gray-500">Round 1</div>
        </div>

        {/* Round 2 Score */}
        <div className="text-center">
          <div className="font-semibold text-lg text-gray-900">{Math.round(entry.round2Score)}</div>
          <div className="text-xs text-gray-500">Round 2</div>
        </div>

        {/* Team Score */}
        <div className="text-center">
          <div className="font-semibold text-lg text-gray-900">{Math.round(entry.teamScore)}</div>
          <div className="text-xs text-gray-500">Team</div>
        </div>

        {/* Game Score */}
        <div className="text-center">
          <div className="font-semibold text-lg text-gray-900">{Math.round(entry.gameScore)}</div>
          <div className="text-xs text-gray-500">Game</div>
        </div>

        {/* Total Score */}
        <div className="text-center">
          <div className="font-bold text-2xl" style={{ color: COLORS.PRIMARY }}>
            {Math.round(entry.totalScore)}
          </div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden bg-white rounded-2xl p-6 shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${getRankColor(rank)}`}>
              {getRankIcon(rank)}
            </div>
            <div>
              <div className="font-bold text-lg text-gray-900">{entry.groupName}</div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                {entry.memberCount} members
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-xl" style={{ color: COLORS.PRIMARY }}>
              {Math.round(entry.totalScore * 100) / 100}
            </div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
        </div>

        {/* Scores Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-semibold text-lg text-gray-900">{Math.round(entry.round1Score)}</div>
            <div className="text-xs text-gray-500">Round 1</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-semibold text-lg text-gray-900">{Math.round(entry.round2Score)}</div>
            <div className="text-xs text-gray-500">Round 2</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-semibold text-lg text-gray-900">{Math.round(entry.teamScore)}</div>
            <div className="text-xs text-gray-500">Team</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-semibold text-lg text-gray-900">{Math.round(entry.gameScore)}</div>
            <div className="text-xs text-gray-500">Game</div>
          </div>
        </div>
      </div>
    </>
  )
}
