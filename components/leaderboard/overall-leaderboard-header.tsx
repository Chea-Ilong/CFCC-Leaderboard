"use client"

import { COLORS } from "@/lib/constants"

export function OverallLeaderboardHeader() {
  return (
    <div className="hidden lg:block mb-6">
      <div
        className="grid grid-cols-9 gap-4 px-0 py-4 rounded-2xl text-white font-semibold text-sm"
        style={{ backgroundColor: COLORS.PRIMARY }}
      >
        <div className="text-center">RANK</div>
        <div className="col-span-2 text-center">PARTICIPANT</div>
        <div className="text-center">GROUP</div>
        <div className="text-center">ROUND 1</div>
        <div className="text-center">ROUND 2</div>
        <div className="text-center">TEAM</div>
        <div className="text-center">GAME</div>
        <div className="text-center">TOTAL</div>
      </div>
    </div>
  )
}
