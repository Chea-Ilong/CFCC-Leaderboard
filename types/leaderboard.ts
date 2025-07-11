export interface OverallEntry {
  id: number
  rank: number
  fullName: string
  hackerRankId: string
  group: string
  round1Score: number
  round2Score: number
  teamScore: number
  gameScore: number // Changed from bonus to gameScore
  totalPoints: number
}

export interface GroupOverallEntry {
  id: number
  rank: number
  groupName: string
  memberCount: number
  round1Score: number
  round2Score: number
  teamScore: number
  gameScore: number // Changed from bonus to gameScore
  totalScore: number
  members: string[]
}

export interface LeaderboardEntry {
  id: number
  rank: number
  fullName: string
  hackerRankId: string
  group: string
  questions: Record<string, number>
  totalScore: number
}

export interface TeamEntry {
  id: number
  rank: number
  teamName: string
  member1: string
  member2: string
  questions: Record<string, number>
  totalScore: number
}

export interface LeaderboardFilters {
  search: string
  group: string
  participantsPerPage: number
  scoreRange?: [number, number]
}

export interface PaginationState {
  currentTab: number
  currentPage: number
  totalPages: number
  hasMore: boolean
}

export interface LeaderboardStats {
  totalParticipants: number
  averageScore: number
  highestScore: number
  lowestScore: number
  completionRate: number
}
