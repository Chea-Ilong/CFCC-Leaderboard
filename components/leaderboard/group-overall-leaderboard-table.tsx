"use client"

import { GroupOverallLeaderboardHeader } from "./group-overall-leaderboard-header"
import { GroupOverallLeaderboardRow } from "./group-overall-leaderboard-row"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { COLORS } from "@/lib/constants"

interface GroupOverallLeaderboardTableProps {
  data: any[]
  loading: boolean
  error: string | null
  onRetry: () => void
}

export function GroupOverallLeaderboardTable({ data, loading, error, onRetry }: GroupOverallLeaderboardTableProps) {
  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />
  }

  return (
    <div className="rounded-2xl p-6 lg:p-8 overflow-hidden shadow-lg" style={{ backgroundColor: COLORS.SECONDARY }}>
      <GroupOverallLeaderboardHeader />

      {/* Mobile Header */}
      <div className="lg:hidden mb-6">
        <div
          className="rounded-2xl px-4 py-3 text-center text-white font-medium text-xl"
          style={{ backgroundColor: COLORS.PRIMARY }}
        >
          CADT Group Leaderboard
        </div>
      </div>

      {/* Data Rows */}
      <div className="space-y-4 lg:space-y-6">
        {data.map((entry, index) => (
          <GroupOverallLeaderboardRow key={entry.groupName || index} entry={entry} rank={index + 1} />
        ))}
      </div>

      {/* No Data Message */}
      {data.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Groups Available</h2>
            <p className="text-gray-600">No groups found matching your criteria.</p>
          </div>
        </div>
      )}
    </div>
  )
}
