"use client"

import axios from "axios"

function emailToFullName(email: string): string {
  const localPart = email.split("@")[0]
  const parts = localPart.split(".")

  const capitalized = parts.map((word) => word.charAt(0).toUpperCase() + word.slice(1))

  return capitalized.reverse().join(" ")
}

type Participant = {
  email: string
  group?: number
}

type APIEntry = {
  email: string
  score: number
  questions: Record<string, number>
}

export interface CandidateData {
  email: string
  score: number
  questions: Record<string, number>
}

export interface ApiResponse {
  data: CandidateData[]
  totalCount?: number
  hasMore?: boolean
}

// Mock data for development and testing
const MOCK_PARTICIPANTS: Participant[] = [
  { email: "john.doe@student.cadt.edu.kh", group: 1 },
  { email: "jane.smith@student.cadt.edu.kh", group: 2 },
  { email: "bob.johnson@student.cadt.edu.kh", group: 3 },
  { email: "alice.brown@student.cadt.edu.kh", group: 1 },
  { email: "charlie.wilson@student.cadt.edu.kh", group: 2 },
  { email: "diana.davis@student.cadt.edu.kh", group: 3 },
  { email: "edward.miller@student.cadt.edu.kh", group: 1 },
  { email: "fiona.garcia@student.cadt.edu.kh", group: 2 },
  { email: "george.martinez@student.cadt.edu.kh", group: 3 },
  { email: "helen.anderson@student.cadt.edu.kh", group: 1 },
  { email: "ivan.taylor@student.cadt.edu.kh", group: 2 },
  { email: "julia.thomas@student.cadt.edu.kh", group: 3 },
  { email: "kevin.jackson@student.cadt.edu.kh", group: 1 },
  { email: "lisa.white@student.cadt.edu.kh", group: 2 },
  { email: "mike.harris@student.cadt.edu.kh", group: 3 },
  { email: "nancy.martin@student.cadt.edu.kh", group: 1 },
  { email: "oscar.thompson@student.cadt.edu.kh", group: 2 },
  { email: "paula.garcia@student.cadt.edu.kh", group: 3 },
  { email: "quinn.rodriguez@student.cadt.edu.kh", group: 1 },
  { email: "rachel.lewis@student.cadt.edu.kh", group: 2 },
]

const MOCK_TEAMS = [
  {
    name: "Code Warriors",
    member_1_email: "john.doe@student.cadt.edu.kh",
    member_2_email: "jane.smith@student.cadt.edu.kh",
  },
  {
    name: "Debug Masters",
    member_1_email: "bob.johnson@student.cadt.edu.kh",
    member_2_email: "alice.brown@student.cadt.edu.kh",
  },
  {
    name: "Algorithm Aces",
    member_1_email: "charlie.wilson@student.cadt.edu.kh",
    member_2_email: "diana.davis@student.cadt.edu.kh",
  },
  {
    name: "Binary Builders",
    member_1_email: "edward.miller@student.cadt.edu.kh",
    member_2_email: "fiona.garcia@student.cadt.edu.kh",
  },
  {
    name: "Logic Legends",
    member_1_email: "george.martinez@student.cadt.edu.kh",
    member_2_email: "helen.anderson@student.cadt.edu.kh",
  },
  {
    name: "Syntax Squad",
    member_1_email: "ivan.taylor@student.cadt.edu.kh",
    member_2_email: "julia.thomas@student.cadt.edu.kh",
  },
  {
    name: "Function Force",
    member_1_email: "kevin.jackson@student.cadt.edu.kh",
    member_2_email: "lisa.white@student.cadt.edu.kh",
  },
  {
    name: "Variable Vikings",
    member_1_email: "mike.harris@student.cadt.edu.kh",
    member_2_email: "nancy.martin@student.cadt.edu.kh",
  },
  {
    name: "Loop Lions",
    member_1_email: "oscar.thompson@student.cadt.edu.kh",
    member_2_email: "paula.garcia@student.cadt.edu.kh",
  },
  {
    name: "Array Avengers",
    member_1_email: "quinn.rodriguez@student.cadt.edu.kh",
    member_2_email: "rachel.lewis@student.cadt.edu.kh",
  },
]

const MOCK_GAMES = [
  {
    member_1_email: "john.doe@student.cadt.edu.kh",
    member_2_email: "jane.smith@student.cadt.edu.kh",
    member_3_email: "bob.johnson@student.cadt.edu.kh",
    member_4_email: "alice.brown@student.cadt.edu.kh",
    score: 50,
  },
  {
    member_1_email: "charlie.wilson@student.cadt.edu.kh",
    member_2_email: "diana.davis@student.cadt.edu.kh",
    member_3_email: "edward.miller@student.cadt.edu.kh",
    member_4_email: "fiona.garcia@student.cadt.edu.kh",
    score: 75,
  },
  {
    member_1_email: "george.martinez@student.cadt.edu.kh",
    member_2_email: "helen.anderson@student.cadt.edu.kh",
    member_3_email: "ivan.taylor@student.cadt.edu.kh",
    member_4_email: "julia.thomas@student.cadt.edu.kh",
    score: 25,
  },
  {
    member_1_email: "kevin.jackson@student.cadt.edu.kh",
    member_2_email: "lisa.white@student.cadt.edu.kh",
    member_3_email: "mike.harris@student.cadt.edu.kh",
    member_4_email: "nancy.martin@student.cadt.edu.kh",
    score: 100,
  },
  {
    member_1_email: "oscar.thompson@student.cadt.edu.kh",
    member_2_email: "paula.garcia@student.cadt.edu.kh",
    member_3_email: "quinn.rodriguez@student.cadt.edu.kh",
    member_4_email: "rachel.lewis@student.cadt.edu.kh",
    score: 60,
  },
]

// Question IDs for mapping (mock HackerRank question IDs)
const QUESTION_IDS = [
  "q1_basic_array",
  "q2_string_manipulation",
  "q3_sorting_algorithm",
  "q4_data_structures",
  "q5_dynamic_programming",
  "q6_graph_theory",
]

// Generate mock scores for a participant
function generateMockScores(email: string, difficulty: "easy" | "medium" | "hard" = "medium"): Record<string, number> {
  const scores: Record<string, number> = {}
  const baseScore = difficulty === "easy" ? 80 : difficulty === "medium" ? 60 : 40
  const variance = 30

  QUESTION_IDS.forEach((questionId, index) => {
    // Generate score with some randomness but consistent per email
    const seed = email.charCodeAt(0) + index
    const randomFactor = (seed % 100) / 100
    const score = Math.max(0, Math.min(100, baseScore + (randomFactor - 0.5) * variance))
    scores[questionId] = Math.round(score)
  })

  return scores
}

// Generate mock API data for Round 1
function generateMockRound1Data(): APIEntry[] {
  return MOCK_PARTICIPANTS.map((participant) => {
    const questions = generateMockScores(participant.email, "easy")
    const totalScore = Object.values(questions).reduce((sum, score) => sum + score, 0)

    return {
      email: participant.email,
      score: totalScore,
      questions,
    }
  })
}

// Generate mock API data for Round 2
function generateMockRound2Data(): APIEntry[] {
  return MOCK_PARTICIPANTS.map((participant) => {
    const questions = generateMockScores(participant.email, "hard")
    const totalScore = Object.values(questions).reduce((sum, score) => sum + score, 0)

    return {
      email: participant.email,
      score: totalScore,
      questions,
    }
  })
}

// Generate mock team data
function generateMockTeamData(): APIEntry[] {
  return MOCK_TEAMS.map((team) => {
    const member1Questions = generateMockScores(team.member_1_email, "medium")
    const member2Questions = generateMockScores(team.member_2_email, "medium")

    // Combine scores (take the better score for each question)
    const combinedQuestions: Record<string, number> = {}
    QUESTION_IDS.forEach((questionId) => {
      combinedQuestions[questionId] = Math.max(member1Questions[questionId] || 0, member2Questions[questionId] || 0)
    })

    const totalScore = Object.values(combinedQuestions).reduce((sum, score) => sum + score, 0)

    return {
      email: `${emailToFullName(team.member_1_email)} & ${emailToFullName(team.member_2_email)}`,
      score: totalScore,
      questions: combinedQuestions,
    }
  })
}

// Check if we should use mock data (for development)
const USE_MOCK_DATA = false

export async function getAllParticipantIndividualRoundOne() {
  try {
    // Fetch first 100
    const response1 = await axios.get(
      `${process.env.NEXT_PUBLIC_HACKERRANK_ROUND1_URL}/candidates?limit=100`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      }
    );

    // Fetch next 100 (offset = 100)
    const response2 = await axios.get(
      `${process.env.NEXT_PUBLIC_HACKERRANK_ROUND1_URL}/candidates?limit=99&offset=100`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      }
    );

    // Combine both results
    const apiData: APIEntry[] = [
      ...response1.data.data,
      ...response2.data.data,
    ];

    // Firebase participants
    const firebaseResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_FIREBASE_URL}/participants.json`
    );
    const firebaseList: Participant[] = Object.values(firebaseResponse.data || {});

    // Question ID to label mapping
    const roundInfoResponse = await axios.get(process.env.NEXT_PUBLIC_HACKERRANK_ROUND1_URL!, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    });

    const questionIdObj = roundInfoResponse.data.questions;
    const questionIdList = Object.values(questionIdObj) as string[];

    const questionIdMap: Record<string, string> = {};
    questionIdList.forEach((id, index) => {
      questionIdMap[id] = `q${index + 1}`;
    });

    const result = firebaseList.map((participant) => {
      const hrData = apiData.find((item) => item.email === participant.email);

      const renamedQuestions: Record<string, number> = {};
      for (const [qid, score] of Object.entries(hrData?.questions || {})) {
        const label = questionIdMap[qid] || qid;
        renamedQuestions[label] = Number(score);
      }

      return {
        fullName: emailToFullName(participant.email),
        group: participant.group || 0,
        questions: renamedQuestions,
        totalScore: hrData?.score || 0,
      };
    });

    return result;
  } catch (error) {
    console.error("Error fetching Round 1 data, falling back to mock data:", error);
  }
}

export async function getAllParticipantIndividualRoundTwo() {
  try {
    // Fetch first 100
    const response1 = await axios.get(
      `${process.env.NEXT_PUBLIC_HACKERRANK_ROUND2_URL}/candidates?limit=100`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      }
    );

    // Fetch next 100 (offset = 100)
    const response2 = await axios.get(
      `${process.env.NEXT_PUBLIC_HACKERRANK_ROUND2_URL}/candidates?limit=99&offset=100`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      }
    );

    // Combine both results
    const apiData: APIEntry[] = [
      ...response1.data.data,
      ...response2.data.data,
    ];

    // Firebase participants
    const firebaseResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_FIREBASE_URL}/participants.json`
    );
    const firebaseList: Participant[] = Object.values(firebaseResponse.data || {});

    // Question ID to label mapping
    const roundInfoResponse = await axios.get(process.env.NEXT_PUBLIC_HACKERRANK_ROUND2_URL!, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    });

    const questionIdObj = roundInfoResponse.data.questions;
    const questionIdList = Object.values(questionIdObj) as string[];

    const questionIdMap: Record<string, string> = {};
    questionIdList.forEach((id, index) => {
      questionIdMap[id] = `q${index + 1}`;
    });

    const result = firebaseList.map((participant) => {
      const hrData = apiData.find((item) => item.email === participant.email);

      const renamedQuestions: Record<string, number> = {};
      for (const [qid, score] of Object.entries(hrData?.questions || {})) {
        const label = questionIdMap[qid] || qid;
        renamedQuestions[label] = Number(score);
      }

      return {
        fullName: emailToFullName(participant.email),
        group: participant.group || 0,
        questions: renamedQuestions,
        totalScore: hrData?.score || 0,
      };
    });

    return result;
  } catch (error) {
    console.error("Error fetching Round 1 data, falling back to mock data:", error);
  }
}

export async function getAllParticipantTeamRound() {
  try {
    // Fetch question ID mapping
    const roundInfoResponse = await axios.get(process.env.NEXT_PUBLIC_HACKERRANK_ROUND_TEAM_URL!, {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
    })
    const questionIdList = Object.values(roundInfoResponse.data.questions) as string[]
    const questionIdMap: Record<string, string> = {}
    questionIdList.forEach((id, index) => {
      questionIdMap[id] = `q${index + 1}`
    })

    // Fetch candidates
    const response1 = await axios.get(process.env.NEXT_PUBLIC_HACKERRANK_ROUND_TEAM_URL + "/candidates?limit=100", {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
    })
    const response2 = await axios.get(process.env.NEXT_PUBLIC_HACKERRANK_ROUND_TEAM_URL + "/candidates?limit=99&offset=100", {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
    })
    const apiData: APIEntry[] = [...response1.data.data, ...response2.data.data]

    const scoreMap = new Map<string, { score: number; questions: any }>()
    for (const item of apiData) {
      if (item.email && item.score != null) {
        scoreMap.set(item.email, {
          score: item.score,
          questions: item.questions,
        })
      }
    }

    // Fetch team list
    const firebaseResponseTeam = await axios.get(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/teams.json`)
    const firebaseTeamList: any[] = Object.values(firebaseResponseTeam.data || {})

    const results: {
      teamName: string
      fullNameMember1: string
      fullNameMember2: string
      questions: Record<string, number>
      totalScore: number
    }[] = []

    for (const team of firebaseTeamList) {
      const m1 = team.member_1_email
      const m2 = team.member_2_email

      const m1Score = scoreMap.get(m1)
      const m2Score = scoreMap.get(m2)

      const finalScore = m1Score?.score ?? m2Score?.score ?? 0
      const rawQuestions = m1Score?.questions ?? m2Score?.questions ?? {}

      const renamedQuestions: Record<string, number> = {}
      for (const [qid, score] of Object.entries(rawQuestions)) {
        const label = questionIdMap[qid] || qid
        renamedQuestions[label] = Number(score)
      }

      results.push({
        teamName: team.name,
        fullNameMember1: emailToFullName(m1),
        fullNameMember2: emailToFullName(m2),
        questions: renamedQuestions,
        totalScore: finalScore,
      })
    }

    return results
  } catch (error) {
    console.error("Error fetching Team data, falling back to mock data:", error)
  }
}

export async function getAllParticipantOverall() {
  try {
    const [round1, round2, teamRound] = await Promise.all([
      getAllParticipantIndividualRoundOne(),
      getAllParticipantIndividualRoundTwo(),
      getAllParticipantTeamRound(),
    ])

    let participants: Participant[]
    let games: any[]

    if (USE_MOCK_DATA) {
      participants = MOCK_PARTICIPANTS
      games = MOCK_GAMES
    } else {
      const [participantsRes, gamesRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/participants.json`),
        axios.get(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/games.json`),
      ])
      participants = Object.values(participantsRes.data || {})
      games = Object.values(gamesRes.data || {})
    }

    // Map round scores by full name
    const round1Map = new Map<string, number>()
    round1.forEach((p) => round1Map.set(p.fullName, p.totalScore))

    const round2Map = new Map<string, number>()
    round2.forEach((p) => round2Map.set(p.fullName, p.totalScore))

    // Map team scores by full name
    const teamScoreMap = new Map<string, number>()
    teamRound.forEach((team) => {
      teamScoreMap.set(team.fullNameMember1, team.totalScore)
      teamScoreMap.set(team.fullNameMember2, team.totalScore)
    })

    // Map bonus score from games by email
    const bonusScoreMap = new Map<string, number>()
    for (const game of games) {
      const members = [game.member_1_email, game.member_2_email, game.member_3_email, game.member_4_email]
      for (const email of members) {
        if (email) {
          bonusScoreMap.set(email, game.score || 0)
        }
      }
    }

    const results = participants.map((p) => {
      const email = p.email
      const fullName = emailToFullName(email)
      const group = p.group || 1

      const round1Score = round1Map.get(fullName) || 0
      const round2Score = round2Map.get(fullName) || 0
      const teamScore = teamScoreMap.get(fullName) || 0
      const bonusScore = bonusScoreMap.get(email) || 0

      const totalScore = round1Score + round2Score + teamScore + bonusScore

      return {
        fullName,
        group,
        round1: round1Score,
        round2: round2Score,
        teamScore,
        bonusScore,
        totalScore,
      }
    })

    return results.sort((a, b) => b.totalScore - a.totalScore)
  } catch (error) {
    console.error("Error fetching overall data:", error)
    throw new Error("Failed to fetch overall leaderboard data")
  }
}

// API adapter functions for backward compatibility
export async function fetchRound1Data(): Promise<CandidateData[]> {
  try {
    const data = await getAllParticipantIndividualRoundOne()
    return data.map((item) => ({
      email: item.fullName,
      score: item.totalScore,
      questions: item.questions,
      group: item.group || 0,
    }))
  } catch (error) {
    console.error("Error fetching Round 1 data:", error)
    throw new Error("Failed to fetch Round 1 data")
  }
}

export async function fetchRound2Data(): Promise<CandidateData[]> {
  try {
    const data = await getAllParticipantIndividualRoundTwo()
    return data.map((item) => ({
      email: item.fullName,
      score: item.totalScore,
      questions: item.questions,
      group: item.group || 0,
    }))
  } catch (error) {
    console.error("Error fetching Round 2 data:", error)
    throw new Error("Failed to fetch Round 2 data")
  }
}

export async function fetchTeamLeaderboardData(): Promise<CandidateData[]> {
  try {
    const data = await getAllParticipantTeamRound()
    return data.map((team) => ({
      teamName: team.teamName,
      email: `${team.fullNameMember1} & ${team.fullNameMember2}`,
      score: team.totalScore,
      questions: team.questions,
    }))
  } catch (error) {
    console.error("Error fetching team leaderboard data:", error)
    throw new Error("Failed to fetch team leaderboard data")
  }
}

// Legacy functions for backward compatibility
export async function fetchLeaderboardData(): Promise<CandidateData[]> {
  return await fetchRound1Data()
}

export async function fetchLeaderboard2Data(): Promise<CandidateData[]> {
  return await fetchRound2Data()
}

// export async function testRound1(): Promise<ApiResponse> {
//   const data = await fetchRound1Data()
//   return { data, totalCount: data.length, hasMore: false }
// }

// export async function testRound2(): Promise<ApiResponse> {
//   const data = await fetchRound2Data()
//   return { data, totalCount: data.length, hasMore: false }
// }

// export async function testTeam(): Promise<ApiResponse> {
//   const data = await fetchTeamLeaderboardData()
//   return { data, totalCount: data.length, hasMore: false }
// }

// export async function test(): Promise<ApiResponse> {
//   return await testRound1()
// }
