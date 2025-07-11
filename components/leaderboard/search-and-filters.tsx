"use client"

import { useState } from "react"
import { Search, RefreshCw, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SearchAndFiltersProps {
  filters?: {
    search?: string
    group?: string
    participantsPerPage?: number
  }
  onFiltersChange?: (filters: any) => void
  onRefresh?: () => void
  totalResults?: number
  isRefreshing?: boolean
  showScoreFilter?: boolean
  showGroupFilter?: boolean
  searchPlaceholder?: string
}

export function SearchAndFilters({
  filters = { search: "", group: "All", participantsPerPage: 10 },
  onFiltersChange = () => {},
  onRefresh = () => {},
  totalResults = 0,
  isRefreshing = false,
  searchPlaceholder = "Search participants...",
}: SearchAndFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value })
  }

  const hasActiveFilters = filters.search || (filters.group && filters.group !== "All")

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between gap-6">
        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={searchPlaceholder}
            value={filters.search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 h-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <Button onClick={onRefresh} disabled={isRefreshing} className="h-10 bg-orange-500 hover:bg-orange-600">
            <RefreshCw className={cn("w-4 h-4 mr-2", isRefreshing && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex justify-between gap-5">
        {/* Search Bar */}
        <div className="relative mb-4 flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={searchPlaceholder}
            value={filters.search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 h-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        {/* Filter Toggle and Refresh */}
        <div className="flex items-center justify-between mb-4">
          <Button onClick={onRefresh} disabled={isRefreshing} className="h-10 bg-orange-500 hover:bg-orange-600">
            <RefreshCw className={cn("w-4 h-4 mr-2", isRefreshing && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium">{totalResults}</span> results
        </p>
      </div>
    </div>
  )
}
