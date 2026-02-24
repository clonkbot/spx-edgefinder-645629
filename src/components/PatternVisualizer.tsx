import { useEffect, useState } from 'react'
import type { Setup } from '../data/setups'

interface PatternVisualizerProps {
  setup: Setup
  onClose: () => void
}

export function PatternVisualizer({ setup, onClose }: PatternVisualizerProps) {
  const [activeSection, setActiveSection] = useState<'spot' | 'entry' | 'exit'>('spot')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 200)
  }

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4
        transition-all duration-200
        ${isVisible ? 'bg-black/80' : 'bg-black/0'}
      `}
      onClick={handleClose}
    >
      <div
        className={`
          bg-[#0d0d14] border border-[#1a1a24] rounded-t-2xl md:rounded-2xl w-full max-w-4xl
          max-h-[90vh] overflow-hidden shadow-2xl transition-all duration-300
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-[#1a1a24]">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`
                px-2 py-0.5 rounded text-[10px] font-mono
                ${setup.type === 'Bullish' ? 'text-[#00f0ff] bg-[#00f0ff]/10' :
                  setup.type === 'Bearish' ? 'text-[#ff4757] bg-[#ff4757]/10' :
                  'text-[#ffa726] bg-[#ffa726]/10'}
              `}>
                {setup.type.toUpperCase()}
              </span>
              <span className="text-[10px] font-mono text-[#6b6b7b]">{setup.timeframe}</span>
            </div>
            <h2 className="font-sans text-xl md:text-2xl font-semibold text-[#e8e8e8]">{setup.name}</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 md:p-3 rounded-lg bg-[#1a1a24] hover:bg-[#2a2a3a] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Pattern Animation */}
        <div className="p-4 md:p-6 bg-[#0a0a0f] border-b border-[#1a1a24]">
          <PatternChart pattern={setup.pattern} />
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[45vh] md:max-h-[50vh]">
          {/* Tab Navigation */}
          <div className="flex border-b border-[#1a1a24] sticky top-0 bg-[#0d0d14] z-10">
            {[
              { id: 'spot' as const, label: 'How to Spot' },
              { id: 'entry' as const, label: 'Entry Rules' },
              { id: 'exit' as const, label: 'Exit Rules' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`
                  flex-1 px-3 md:px-6 py-3 font-mono text-xs md:text-sm transition-colors
                  ${activeSection === tab.id
                    ? 'text-[#00f0ff] border-b-2 border-[#00f0ff] bg-[#00f0ff]/5'
                    : 'text-[#6b6b7b] hover:text-[#e8e8e8]'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-4 md:p-6">
            {activeSection === 'spot' && (
              <ul className="space-y-3">
                {setup.howToSpot.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 animate-fadeSlideUp"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <span className="w-6 h-6 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] flex items-center justify-center text-xs font-mono flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm md:text-base text-[#c8c8d0]">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeSection === 'entry' && (
              <ul className="space-y-3">
                {setup.entryRules.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 animate-fadeSlideUp"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <span className="w-6 h-6 rounded-lg bg-[#00ff88]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#00ff88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm md:text-base text-[#c8c8d0]">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeSection === 'exit' && (
              <ul className="space-y-3">
                {setup.exitRules.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 animate-fadeSlideUp"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <span className="w-6 h-6 rounded-lg bg-[#ff4757]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#ff4757]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                    <span className="text-sm md:text-base text-[#c8c8d0]">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Meta info */}
            <div className="mt-6 pt-6 border-t border-[#1a1a24] grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] font-mono text-[#4a4a5a] mb-1">BEST TIME</div>
                <div className="font-mono text-sm text-[#ffa726]">{setup.bestTime}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#4a4a5a] mb-1">RISK:REWARD</div>
                <div className="font-mono text-sm text-[#00ff88]">{setup.riskReward}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PatternChart({ pattern }: { pattern: string }) {
  const patterns: Record<string, { path: string; vwap?: string; annotations: { x: number; y: number; label: string; color: string }[] }> = {
    'vwap-bounce': {
      path: 'M 10 70 L 40 30 L 70 50 L 100 35 L 130 55 L 160 40 L 190 60 L 220 45 L 250 65 L 270 55 Q 290 70 310 45 L 340 25',
      vwap: 'M 10 55 L 340 55',
      annotations: [
        { x: 270, y: 75, label: 'VWAP Touch', color: '#ffa726' },
        { x: 310, y: 35, label: 'Entry', color: '#00ff88' }
      ]
    },
    'opening-range': {
      path: 'M 10 50 L 40 35 L 70 55 L 100 40 L 130 45 L 160 38 L 190 48 L 220 42 L 250 35 L 280 20 L 340 15',
      annotations: [
        { x: 40, y: 25, label: 'Range High', color: '#00f0ff' },
        { x: 40, y: 65, label: 'Range Low', color: '#ff4757' },
        { x: 280, y: 10, label: 'Breakout', color: '#00ff88' }
      ]
    },
    'gap-fill': {
      path: 'M 10 70 L 30 65 M 50 35 L 80 30 L 110 40 L 140 25 L 170 45 L 200 55 L 230 50 L 260 60 L 290 55 L 340 65',
      annotations: [
        { x: 30, y: 50, label: 'Gap', color: '#ffa726' },
        { x: 170, y: 55, label: 'Reversal', color: '#00ff88' },
        { x: 340, y: 75, label: 'Fill', color: '#00f0ff' }
      ]
    },
    'trend-continuation': {
      path: 'M 10 80 L 50 65 L 70 70 L 100 50 L 120 55 L 150 35 L 180 42 L 210 25 L 240 30 L 280 15 L 340 10',
      annotations: [
        { x: 70, y: 80, label: 'Pullback 1', color: '#ffa726' },
        { x: 180, y: 52, label: 'Pullback 2', color: '#ffa726' },
        { x: 280, y: 5, label: 'Continue', color: '#00ff88' }
      ]
    },
    'reversal': {
      path: 'M 10 30 L 50 45 L 90 55 L 130 65 L 160 80 L 180 85 L 200 75 L 230 60 L 260 50 L 300 35 L 340 20',
      annotations: [
        { x: 180, y: 95, label: 'False Break', color: '#ff4757' },
        { x: 200, y: 65, label: 'Reclaim', color: '#00ff88' }
      ]
    },
    'consolidation': {
      path: 'M 10 50 L 50 45 L 90 52 L 130 48 L 170 50 L 210 47 L 250 51 L 270 48 L 290 30 L 340 15',
      annotations: [
        { x: 140, y: 40, label: 'Range', color: '#6b6b7b' },
        { x: 290, y: 20, label: 'Breakout', color: '#00ff88' }
      ]
    }
  }

  const current = patterns[pattern] || patterns['vwap-bounce']

  return (
    <div className="relative h-32 md:h-40">
      <svg viewBox="0 0 350 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a1a24" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* VWAP line if exists */}
        {current.vwap && (
          <path
            d={current.vwap}
            fill="none"
            stroke="#6b6b7b"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="animate-drawLine"
          />
        )}

        {/* Opening range box */}
        {pattern === 'opening-range' && (
          <rect
            x="30"
            y="30"
            width="130"
            height="30"
            fill="#00f0ff"
            fillOpacity="0.05"
            stroke="#00f0ff"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        )}

        {/* Main price line */}
        <path
          d={current.path}
          fill="none"
          stroke="#00f0ff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-drawLine"
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
            animation: 'drawLine 2s ease-out forwards'
          }}
        />

        {/* Annotations */}
        {current.annotations.map((ann, i) => (
          <g key={i} className="animate-fadeIn" style={{ animationDelay: `${1 + i * 0.3}s` }}>
            <circle cx={ann.x} cy={ann.y - 10} r="3" fill={ann.color} />
            <text
              x={ann.x}
              y={ann.y}
              fill={ann.color}
              fontSize="8"
              fontFamily="monospace"
              textAnchor="middle"
            >
              {ann.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
