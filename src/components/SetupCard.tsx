import type { Setup } from '../data/setups'

interface SetupCardProps {
  setup: Setup
  index: number
  onClick: () => void
  isSelected: boolean
}

export function SetupCard({ setup, index, onClick, isSelected }: SetupCardProps) {
  const difficultyColors = {
    Easy: 'text-[#00ff88] bg-[#00ff88]/10',
    Medium: 'text-[#ffa726] bg-[#ffa726]/10',
    Advanced: 'text-[#ff4757] bg-[#ff4757]/10'
  }

  const typeColors = {
    Bullish: 'text-[#00f0ff] border-[#00f0ff]/30',
    Bearish: 'text-[#ff4757] border-[#ff4757]/30',
    Neutral: 'text-[#ffa726] border-[#ffa726]/30'
  }

  return (
    <button
      onClick={onClick}
      className={`
        group relative text-left w-full p-4 md:p-6 rounded-xl border transition-all duration-300
        ${isSelected
          ? 'bg-[#00f0ff]/5 border-[#00f0ff]/50 shadow-lg shadow-[#00f0ff]/10'
          : 'bg-[#12121a] border-[#1a1a24] hover:border-[#2a2a3a] hover:bg-[#16161f]'
        }
      `}
      style={{
        animationDelay: `${index * 80}ms`,
        animation: 'fadeSlideUp 0.5s ease-out forwards',
        opacity: 0
      }}
    >
      {/* Win rate indicator */}
      <div className="absolute top-3 md:top-4 right-3 md:right-4">
        <div className={`
          text-lg md:text-xl font-mono font-bold
          ${setup.winRate >= 65 ? 'text-[#00ff88]' : setup.winRate >= 55 ? 'text-[#ffa726]' : 'text-[#6b6b7b]'}
        `}>
          {setup.winRate}%
        </div>
        <div className="text-[10px] text-[#6b6b7b] font-mono text-right">WIN RATE</div>
      </div>

      {/* Header */}
      <div className="mb-3 md:mb-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${typeColors[setup.type]}`}>
            {setup.type.toUpperCase()}
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${difficultyColors[setup.difficulty]}`}>
            {setup.difficulty}
          </span>
        </div>
        <h3 className="font-sans text-base md:text-lg font-semibold text-[#e8e8e8] group-hover:text-[#00f0ff] transition-colors pr-16">
          {setup.name}
        </h3>
      </div>

      {/* Description */}
      <p className="text-[#6b6b7b] text-xs md:text-sm leading-relaxed mb-4 line-clamp-2">
        {setup.description}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 md:gap-3 pt-4 border-t border-[#1a1a24]">
        <div>
          <div className="text-[10px] text-[#4a4a5a] font-mono mb-0.5">AVG RETURN</div>
          <div className="text-sm md:text-base font-mono text-[#00ff88]">{setup.avgReturn}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#4a4a5a] font-mono mb-0.5">TIMEFRAME</div>
          <div className="text-sm md:text-base font-mono text-[#e8e8e8]">{setup.timeframe}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#4a4a5a] font-mono mb-0.5">R:R</div>
          <div className="text-sm md:text-base font-mono text-[#ffa726]">{setup.riskReward}</div>
        </div>
      </div>

      {/* Hover indicator */}
      <div className={`
        absolute bottom-0 left-0 h-[2px] bg-[#00f0ff] transition-all duration-300
        ${isSelected ? 'w-full' : 'w-0 group-hover:w-full'}
      `} />
    </button>
  )
}
