interface LeaderboardHeaderProps {
  title: string
  subtitle: string
}

export function LeaderboardHeader({ title, subtitle }: LeaderboardHeaderProps) {
  return (
    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
      <h1 className="hidden lg:block text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
        CADT Freshman Coding Competition
      </h1>
    </div>
  )
}
