"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { GroupOverallEntry, LeaderboardFilters, PaginationState } from "@/types/leaderboard"
import { getAllParticipantOverall } from "@/lib/api"
import { LEADERBOARD_CONFIG } from "@/lib/constants"

export function useGroupOverallLeaderboard() {
  const [groupData, setGroupData] = useState<GroupOverallEntry[]>([])
  const [filteredData, setFilteredData] = useState<GroupOverallEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<LeaderboardFilters>({
    search: "",
    group: "All",
    participantsPerPage: LEADERBOARD_CONFIG.DEFAULT_PARTICIPANTS_PER_PAGE,
  })
  const [pagination, setPagination] = useState<PaginationState>({
    currentTab: 1,
    currentPage: 1,
    totalPages: 1,
    hasMore: false,
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("Fetching group overall leaderboard data...")

      // Get individual participant data
      const overallResults = await getAllParticipantOverall()

      // Group participants by their group
      const groupMap = new Map<
        string,
        {
          round1: number
          round2: number
          teamScore: number
          gameScore: number
          memberCount: number
        }
      >()

      overallResults.forEach((participant) => {
        const groupKey = `G${participant.group}`

        if (!groupMap.has(groupKey)) {
          groupMap.set(groupKey, {
            round1: 0,
            round2: 0,
            teamScore: 0,
            gameScore: 0,
            memberCount: 0,
          })
        }

        const groupData = groupMap.get(groupKey)!
        groupData.round1 += participant.round1
        groupData.round2 += participant.round2
        groupData.teamScore += participant.teamScore
        groupData.gameScore += participant.bonusScore
        groupData.memberCount += 1
      })

      // Transform to GroupOverallEntry format
      const transformedData: GroupOverallEntry[] = Array.from(groupMap.entries())
        .map(([groupName, data], index) => ({
          id: index + 1,
          rank: index + 1, // Will be recalculated after sorting
          groupName,
          round1Score: data.round1,
          round2Score: data.round2,
          teamScore: data.teamScore,
          gameScore: data.gameScore,
          totalPoints: data.round1 + data.round2 + data.teamScore + data.gameScore,
          memberCount: data.memberCount,
        }))
        .sort((a, b) => b.totalPoints - a.totalPoints) // Sort by total score descending
        .map((entry, index) => ({ ...entry, rank: index + 1 })) // Recalculate ranks

      setGroupData(transformedData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching group data")
      console.error("Group overall leaderboard fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const applyFilters = useCallback(() => {
    let filtered = [...groupData]

    // Search filter (search by group name)
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter((entry) => entry.groupName.toLowerCase().includes(searchTerm))
    }

    // Group filter (filter by specific group)
    if (filters.group && filters.group !== "All" && filters.group !== "all") {
      filtered = filtered.filter((entry) => entry.groupName === filters.group)
    }

    setFilteredData(filtered)

    // Update pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / filters.participantsPerPage))
    setPagination((prev) => ({
      ...prev,
      totalPages,
      currentPage: Math.min(prev.currentPage, totalPages),
    }))
  }, [groupData, filters])

  const updateFilters = useCallback((newFilters: Partial<LeaderboardFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      // Ensure values are never undefined
      search: newFilters.search ?? prev.search ?? "",
      group: newFilters.group ?? prev.group ?? "All",
      participantsPerPage:
        newFilters.participantsPerPage ?? prev.participantsPerPage ?? LEADERBOARD_CONFIG.DEFAULT_PARTICIPANTS_PER_PAGE,
    }))
    setPagination((prev) => ({ ...prev, currentPage: 1 }))
  }, [])

  const changePage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
  }, [])

  // Initial data fetch
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Apply filters when data or filters change
  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  // Set up live updates
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      fetchData()
    }, LEADERBOARD_CONFIG.LIVE_UPDATE_INTERVAL)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [fetchData])

  return {
    groupData: filteredData,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    changePage,
    refetch: fetchData,
  }
}
