import { useState } from 'react'

interface Lesson {
  id: string
  title: string
  duration: string
  content: string[]
  tips: string[]
  icon: string
}

const lessons: Lesson[] = [
  {
    id: 'vwap-basics',
    title: 'Understanding VWAP',
    duration: '5 min',
    icon: '📊',
    content: [
      'VWAP (Volume Weighted Average Price) is the average price weighted by volume. It shows where most trading occurred during the session.',
      'Institutional traders use VWAP as a benchmark. They often execute orders near VWAP to get "fair" prices.',
      'Price above VWAP = bullish control. Price below VWAP = bearish control. Crosses are significant.',
      'VWAP resets each day at market open. It\'s most reliable after the first 30 minutes when enough volume has accumulated.'
    ],
    tips: [
      'Use VWAP only for intraday trading - it resets daily',
      'The flatter the VWAP, the more range-bound the session',
      'Strong trends rarely touch VWAP after the first hour'
    ]
  },
  {
    id: 'opening-range',
    title: 'Opening Range Mastery',
    duration: '7 min',
    icon: '🎯',
    content: [
      'The Opening Range (OR) is the high and low established in the first 15-30 minutes of trading.',
      'This range often sets the tone for the entire day. Breakouts from OR tend to see follow-through.',
      'The OR captures the initial battle between overnight positioning and cash session traders.',
      'Many institutional algorithms are programmed to buy OR breakouts, adding fuel to moves.'
    ],
    tips: [
      'Wait for a 5-min candle close outside the range before entering',
      'Avoid OR breakouts that happen in the first 5 minutes',
      'The tighter the OR, the more explosive the breakout tends to be'
    ]
  },
  {
    id: 'gaps',
    title: 'Trading Gaps in SPX',
    duration: '6 min',
    icon: '🕳️',
    content: [
      'Gaps occur when SPX opens at a different price than the previous close, creating an unfilled area.',
      'About 70% of SPX gaps fill within the same session. This makes gap fading a high-probability strategy.',
      'Gap types: Breakaway gaps (trend continuation), Exhaustion gaps (near reversal), Common gaps (usually fill).',
      'Large gaps (>1%) are less likely to fill same day. Focus on gaps between 0.3-0.8% for best odds.'
    ],
    tips: [
      'Always wait for a reversal signal before fading a gap',
      'Gap fills work best in range-bound market conditions',
      'Monday gaps are more likely to fill than Friday gaps'
    ]
  },
  {
    id: 'trend-days',
    title: 'Identifying Trend Days',
    duration: '8 min',
    icon: '📈',
    content: [
      'True trend days are rare (about 15-20% of sessions) but account for the majority of monthly range.',
      'Key signs: Strong directional move from open, price stays one side of VWAP, pullbacks are shallow.',
      'On trend days, fading moves is a losing strategy. The key is to buy every pullback to moving averages.',
      'Volume pattern: Expanding volume on moves with trend, declining volume on pullbacks.'
    ],
    tips: [
      'If you miss the first move, wait for the first pullback to 9 EMA',
      'On trend days, hold winners longer than usual',
      'VIX declining with price rising confirms bullish trend day'
    ]
  },
  {
    id: 'volume-analysis',
    title: 'Reading Volume Like a Pro',
    duration: '6 min',
    icon: '📶',
    content: [
      'Volume confirms price moves. High volume = conviction. Low volume = suspect move.',
      'Look for volume spikes at key levels - they show where real buying/selling interest exists.',
      'Declining volume on a pullback is bullish - it shows sellers are losing interest.',
      'Volume often precedes price. A breakout with massive volume is more likely to follow through.'
    ],
    tips: [
      'Compare current volume to the 20-period average',
      'Pre-market volume can signal potential trend day',
      'Low volume breakouts often fail and reverse'
    ]
  },
  {
    id: 'risk-management',
    title: 'Position Sizing & Risk',
    duration: '5 min',
    icon: '🛡️',
    content: [
      'Never risk more than 1-2% of your account on a single trade. This ensures survival through losing streaks.',
      'Calculate position size: Risk Amount / (Entry - Stop) = Number of contracts or shares.',
      'Use the ATR (Average True Range) to set realistic stops that account for normal volatility.',
      'Scale out of winners: Take 1/3 at first target, 1/3 at second target, let 1/3 run with trailing stop.'
    ],
    tips: [
      'Tighter stops aren\'t always better - they increase your loss rate',
      'Your win rate matters less than your risk:reward ratio',
      'After 2 losses in a row, take a 30-minute break minimum'
    ]
  }
]

export function LearningModule() {
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())

  const toggleComplete = (lessonId: string) => {
    setCompletedLessons(prev => {
      const next = new Set(prev)
      if (next.has(lessonId)) {
        next.delete(lessonId)
      } else {
        next.add(lessonId)
      }
      return next
    })
  }

  const progress = Math.round((completedLessons.size / lessons.length) * 100)

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h2 className="font-sans text-2xl md:text-3xl font-light mb-2">
          Learn the <span className="text-[#ffa726] font-semibold">Fundamentals</span>
        </h2>
        <p className="text-[#6b6b7b] text-sm md:text-base max-w-xl">
          Master the concepts behind each setup. Understanding the "why" makes spotting opportunities intuitive.
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-6 md:mb-8 p-4 md:p-6 bg-[#12121a] rounded-xl border border-[#1a1a24]">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-sm text-[#6b6b7b]">YOUR PROGRESS</span>
          <span className="font-mono text-lg text-[#00f0ff]">{progress}%</span>
        </div>
        <div className="h-2 bg-[#1a1a24] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00f0ff] to-[#00ff88] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-[#4a4a5a]">
          {completedLessons.size} of {lessons.length} lessons completed
        </div>
      </div>

      {/* Lessons */}
      <div className="space-y-3 md:space-y-4">
        {lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className={`
              rounded-xl border transition-all duration-300
              ${expandedLesson === lesson.id
                ? 'bg-[#16161f] border-[#2a2a3a]'
                : 'bg-[#12121a] border-[#1a1a24] hover:border-[#2a2a3a]'
              }
            `}
            style={{
              animationDelay: `${index * 60}ms`,
              animation: 'fadeSlideUp 0.4s ease-out forwards',
              opacity: 0
            }}
          >
            {/* Lesson header */}
            <button
              onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
              className="w-full p-4 md:p-5 flex items-center gap-3 md:gap-4 text-left"
            >
              <span className="text-xl md:text-2xl flex-shrink-0">{lesson.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-sans text-base md:text-lg font-medium text-[#e8e8e8] truncate pr-2">
                  {lesson.title}
                </h3>
                <span className="text-xs font-mono text-[#6b6b7b]">{lesson.duration} read</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                {completedLessons.has(lesson.id) && (
                  <span className="w-6 h-6 rounded-full bg-[#00ff88]/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#00ff88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
                <svg
                  className={`w-5 h-5 text-[#6b6b7b] transition-transform duration-300 ${expandedLesson === lesson.id ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Expanded content */}
            {expandedLesson === lesson.id && (
              <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-[#1a1a24] pt-4 md:pt-5">
                <div className="space-y-4">
                  {lesson.content.map((paragraph, i) => (
                    <p key={i} className="text-sm md:text-base text-[#b8b8c0] leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Tips */}
                <div className="mt-6 p-3 md:p-4 bg-[#ffa726]/5 rounded-lg border border-[#ffa726]/20">
                  <h4 className="font-mono text-xs text-[#ffa726] mb-3">PRO TIPS</h4>
                  <ul className="space-y-2">
                    {lesson.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-[#c8c8d0]">
                        <span className="text-[#ffa726] mt-1 flex-shrink-0">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Complete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleComplete(lesson.id)
                  }}
                  className={`
                    mt-4 md:mt-6 w-full py-3 rounded-lg font-mono text-sm transition-all
                    ${completedLessons.has(lesson.id)
                      ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30'
                      : 'bg-[#00f0ff]/10 text-[#00f0ff] hover:bg-[#00f0ff]/20 border border-[#00f0ff]/30'
                    }
                  `}
                >
                  {completedLessons.has(lesson.id) ? '✓ COMPLETED' : 'MARK AS COMPLETE'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
