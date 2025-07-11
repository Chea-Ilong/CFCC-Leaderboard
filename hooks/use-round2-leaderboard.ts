"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { LeaderboardEntry, LeaderboardFilters, PaginationState } from "@/types/leaderboard"
import { fetchLeaderboard2Data } from "@/lib/api"
import { transformApiDataToLeaderboard } from "@/lib/utils"
import { LEADERBOARD_CONFIG } from "@/lib/constants"

export function useRound2Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [filteredData, setFilteredData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const mounted = useRef(false);

  const [filters, setFilters] = useState<LeaderboardFilters>({
    search: "",
    group: "All",
    participantsPerPage: LEADERBOARD_CONFIG.DEFAULT_PARTICIPANTS_PER_PAGE,
  })

  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    hasMore: false,
  })

  const applyFilters = useCallback(() => {
    let data = [...leaderboardData]

    if (filters.search) {
      const term = filters.search.toLowerCase()
      data = data.filter((d) => d.fullName.toLowerCase().includes(term) || d.hackerRankId.toLowerCase().includes(term))
    }

    if (filters.group !== "All") {
      data = data.filter((d) => d.group === filters.group)
    }

    const totalPages = Math.max(1, Math.ceil(data.length / filters.participantsPerPage))
    setFilteredData(data)
    setPagination((prev) => ({
      ...prev,
      totalPages,
      currentPage: Math.min(prev.currentPage, totalPages),
      hasMore: false,
    }))
  }, [leaderboardData, filters])

  const fetchData = useCallback(async (refresh = false) => {
    refresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      const res = await fetchLeaderboard2Data();
      const transformed = transformApiDataToLeaderboard(res);
      if (mounted.current) setLeaderboardData(transformed);
    } catch (err) {
      if (mounted.current)
        setError(
          err instanceof Error ? err.message : "Failed to fetch Round 2 leaderboard"
        );
    } finally {
      if (mounted.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    fetchData();
    const id = setInterval(() => fetchData(true), 300000);  
    return () => {
      mounted.current = false;
      clearInterval(id);
    };
  }, [fetchData]);

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  const updateFilters = (patch: Partial<LeaderboardFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }))
    setPagination((prev) => ({ ...prev, currentPage: 1 }))
  }

  const changePage = (page: number) => {
    setPagination((p) => ({ ...p, currentPage: page }))
  }

  const refetch = useCallback(() => {
    return fetchData(true)
  }, [fetchData])

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
