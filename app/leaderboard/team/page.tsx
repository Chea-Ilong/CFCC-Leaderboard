"use client"

import { SearchAndFilters } from "@/components/leaderboard/search-and-filters"
import { TeamLeaderboardRow } from "@/components/leaderboard/team-leaderboard-row"
import { TeamLeaderboardHeader } from "@/components/leaderboard/team-leaderboard-header"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { Pagination } from "@/components/leaderboard/pagination"
import { useTeamLeaderboard } from "@/hooks/use-team-leaderboard"
import { COLORS } from "@/lib/constants"

export default function TeamLeaderboardPage() {
  const { teamData, loading, refreshing, error, filters, pagination, updateFilters, changePage, refetch } =
    useTeamLeaderboard()

  if (loading && teamData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 py-8 lg:py-12">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 py-8 lg:py-12">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
      </div>
    )
  }

  const startIndex = (pagination.currentPage - 1) * filters.participantsPerPage
  const endIndex = startIndex + filters.participantsPerPage
  const paginatedData = teamData.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 py-8 lg:py-12">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center hidden md:block mb-12 lg:mb-16">
          <h1 className="text-4xl lg:text-6xl font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6 leading-tight">
            CADT Freshman Coding Championship
          </h1>
        </div>

        {/* Search and Filters */}
        <SearchAndFilters
          filters={filters}
          onFiltersChange={updateFilters}
          onRefresh={refetch}
          totalResults={teamData.length}
          isRefreshing={refreshing}
          showScoreFilter={false}
        />

        {/* Leaderboard Table */}
        <div className="rounded-2xl p-6 lg:p-8 overflow-hidden shadow-lg" style={{ backgroundColor: COLORS.SECONDARY }}>
          <TeamLeaderboardHeader />

          {/* Mobile Header */}
          <div className="md:hidden mb-6">
            <div
              className="rounded-2xl px-4 py-3 text-center text-white font-medium text-xl"
              style={{ backgroundColor: COLORS.PRIMARY }}
            >
              CADT Team Leaderboard
            </div>
          </div>

          {/* Data Rows */}
          <div className="space-y-4 lg:space-y-6">
            {paginatedData.map((team) => (
              <TeamLeaderboardRow key={team.id} team={team} />
            ))}
          </div>

          {/* No Data Message */}
          {paginatedData.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No Data Available</h2>
                <p className="text-gray-600">No participants found matching your criteria.</p>
              </div>
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={changePage}
            className="mt-8"
          />
        </div>
      </div>
    </div>
  )
}
