'use client'
import { getAllParticipantIndividualRoundTwo } from "@/lib/api"

export default function TestLeaderboardPage() {
const getQuestion = async () => {
  const questionIds = await getAllParticipantIndividualRoundTwo()
  console.log(questionIds)
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 py-8 lg:py-12">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">Test Leaderboard Page</h1>
        <p>This is a placeholder for the test leaderboard page.</p>
        <button
          onClick={() => getQuestion()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Get Question
        </button>
      </div>
    </div>
  )
}
