"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { LeaderboardEntry, LeaderboardFilters, PaginationState } from "@/types/leaderboard"
import { fetchLeaderboardData } from "@/lib/api"
import { transformApiDataToLeaderboard } from "@/lib/utils"
import { LEADERBOARD_CONFIG } from "@/lib/constants"

export function useRound1Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [filteredData, setFilteredData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const mounted = useRef(false)

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

  const fetchData = useCallback(async (refresh = false) => {
    refresh ? setRefreshing(true) : setLoading(true)
    setError(null)
    try {
      const res = await fetchLeaderboardData()
      const transformed = transformApiDataToLeaderboard(res)
      if (mounted.current) setLeaderboardData(transformed)
    } catch (err) {
      if (mounted.current)
        setError(
          err instanceof Error ? err.message : "Failed to fetch Round 1 leaderboard",
        )
    } finally {
      if (mounted.current) {
        setLoading(false)
        setRefreshing(false)
      }
    }
  }, [])

  const applyFilters = useCallback(() => {
    let data = [...leaderboardData]

    if (filters.search) {
      const term = filters.search.toLowerCase()
      data = data.filter(
        (d) =>
          d.fullName.toLowerCase().includes(term) ||
          d.hackerRankId.toLowerCase().includes(term),
      )
    }

    if (filters.group !== "All") {
      data = data.filter((d) => d.group === filters.group)
    }

    setFilteredData(data)

    const totalPages = Math.max(1, Math.ceil(data.length / filters.participantsPerPage))
    const currentPage = Math.min(pagination.currentPage, totalPages)
    setPagination((prev) => ({
      ...prev,
      totalPages,
      currentPage,
      hasMore: currentPage < totalPages,
    }))
  }, [leaderboardData, filters, pagination.currentPage])

  const updateFilters = (patch: Partial<LeaderboardFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }))
    setPagination((prev) => ({ ...prev, currentPage: 1, hasMore: prev.totalPages > 1 }))
  }

  const changePage = (page: number) => {
    setPagination((p) => {
      const nextPage = Math.max(1, Math.min(page, p.totalPages))
      return {
        ...p,
        currentPage: nextPage,
        hasMore: nextPage < p.totalPages,
      }
    })
  }

  useEffect(() => {
    mounted.current = true
    fetchData()
    const id = setInterval(() => fetchData(true), 5000)
    return () => {
      mounted.current = false
      clearInterval(id)
    }
  }, [fetchData])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  const refetch = useCallback(() => fetchData(true), [fetchData])

  const paginatedData = filteredData.slice(
    (pagination.currentPage - 1) * filters.participantsPerPage,
    pagination.currentPage * filters.participantsPerPage,
  )

  return {
    leaderboardData: paginatedData,
    loading,
    refreshing,
    error,
    filters,
    pagination,
    updateFilters,
    changePage,
    refetch,
  }
}
