export interface Setup {
  id: string
  name: string
  winRate: number
  avgReturn: string
  timeframe: string
  difficulty: 'Easy' | 'Medium' | 'Advanced'
  type: 'Bullish' | 'Bearish' | 'Neutral'
  description: string
  howToSpot: string[]
  entryRules: string[]
  exitRules: string[]
  bestTime: string
  riskReward: string
  pattern: 'vwap-bounce' | 'opening-range' | 'gap-fill' | 'trend-continuation' | 'reversal' | 'consolidation'
}

export const setups: Setup[] = [
  {
    id: 'vwap-bounce',
    name: 'VWAP Bounce',
    winRate: 68,
    avgReturn: '+0.8%',
    timeframe: '5-15 min',
    difficulty: 'Easy',
    type: 'Bullish',
    description: 'Price pulls back to VWAP and bounces with volume confirmation. One of the most reliable intraday setups for SPX.',
    howToSpot: [
      'Price is trending above VWAP for the session',
      'Pullback occurs on declining volume',
      'Price touches or slightly penetrates VWAP',
      'Look for a bullish candle with above-average volume'
    ],
    entryRules: [
      'Enter on the first bullish candle that closes above VWAP',
      'Confirmation: RSI showing oversold bounce (above 30)',
      'Volume on entry candle should be 1.5x average'
    ],
    exitRules: [
      'Target: Previous high or 0.5-1% above entry',
      'Stop loss: 0.2% below VWAP',
      'Trail stop using 8 EMA on 5-min chart'
    ],
    bestTime: '10:00 AM - 2:00 PM ET',
    riskReward: '1:2.5',
    pattern: 'vwap-bounce'
  },
  {
    id: 'opening-range-breakout',
    name: 'Opening Range Breakout',
    winRate: 62,
    avgReturn: '+1.2%',
    timeframe: '15-30 min',
    difficulty: 'Medium',
    type: 'Bullish',
    description: 'Trade the breakout from the first 15-30 minutes of trading range. High momentum plays with defined risk.',
    howToSpot: [
      'Mark high and low of first 15-30 minutes',
      'Wait for price to consolidate within range',
      'Watch for volume building near range edges',
      'Pre-market levels align with range boundaries'
    ],
    entryRules: [
      'Enter on clean break above range high with volume',
      'Wait for 5-min candle close above range',
      'Avoid chasing if price is >0.3% beyond range'
    ],
    exitRules: [
      'Target 1: 1x the opening range added to breakout',
      'Target 2: Previous day high/low',
      'Stop: Below the opening range midpoint'
    ],
    bestTime: '9:45 AM - 11:00 AM ET',
    riskReward: '1:2',
    pattern: 'opening-range'
  },
  {
    id: 'gap-fill-reversal',
    name: 'Gap Fill Reversal',
    winRate: 71,
    avgReturn: '+0.6%',
    timeframe: '5-60 min',
    difficulty: 'Easy',
    type: 'Neutral',
    description: 'SPX tends to fill overnight gaps. Fade the gap direction once price shows reversal signs.',
    howToSpot: [
      'SPX opens with a gap (>0.3% from previous close)',
      'Initial move extends the gap direction',
      'Reversal candle forms with wick rejection',
      'Volume spike on reversal candle'
    ],
    entryRules: [
      'Enter after first reversal candle confirmation',
      'RSI divergence supports the reversal',
      'Best on gaps that are 0.3-0.8% (avoid huge gaps)'
    ],
    exitRules: [
      'Target: Previous day close (gap fill level)',
      'Partial profit at 50% gap fill',
      'Stop: Beyond the gap high/low by 0.15%'
    ],
    bestTime: '9:30 AM - 10:30 AM ET',
    riskReward: '1:3',
    pattern: 'gap-fill'
  },
  {
    id: 'trend-day-continuation',
    name: 'Trend Day Continuation',
    winRate: 58,
    avgReturn: '+1.8%',
    timeframe: '30-60 min',
    difficulty: 'Medium',
    type: 'Bullish',
    description: 'Identify strong trend days early and ride pullbacks to moving averages. Highest profit potential setup.',
    howToSpot: [
      'Strong directional move from open (>0.5% in first hour)',
      'Price stays on one side of VWAP all day',
      'Each pullback makes higher lows (or lower highs)',
      'Declining volume on pullbacks, expanding on moves'
    ],
    entryRules: [
      'Enter on pullback to 9 or 21 EMA',
      'Pullback should be 3-5 candles maximum',
      'VWAP should be sloping in trend direction'
    ],
    exitRules: [
      'Hold until end of day on true trend days',
      'Scale out: 1/3 at each new high',
      'Stop: Close below VWAP (trend invalidation)'
    ],
    bestTime: '10:30 AM - 3:00 PM ET',
    riskReward: '1:4',
    pattern: 'trend-continuation'
  },
  {
    id: 'failed-breakdown',
    name: 'Failed Breakdown',
    winRate: 65,
    avgReturn: '+0.9%',
    timeframe: '15-30 min',
    difficulty: 'Advanced',
    type: 'Bullish',
    description: 'When SPX breaks support but quickly reclaims it, trapped sellers fuel explosive moves higher.',
    howToSpot: [
      'Clear support level is broken',
      'Breakdown holds for 2-5 candles',
      'Strong bullish candle reclaims the level',
      'Volume surge on the reclaim'
    ],
    entryRules: [
      'Enter when price closes back above broken level',
      'Add on first pullback that holds above level',
      'Best when VIX is declining during reclaim'
    ],
    exitRules: [
      'Target: 1.5-2x the distance of the false breakdown',
      'Stop: Below the breakdown low',
      'Time stop: Exit if no follow-through in 30 min'
    ],
    bestTime: '10:00 AM - 2:30 PM ET',
    riskReward: '1:2.5',
    pattern: 'reversal'
  },
  {
    id: 'power-hour-breakout',
    name: 'Power Hour Breakout',
    winRate: 59,
    avgReturn: '+0.7%',
    timeframe: '5-15 min',
    difficulty: 'Medium',
    type: 'Bullish',
    description: 'The last hour often sees increased volatility as institutions position. Trade range breaks after 3 PM.',
    howToSpot: [
      'Price consolidates in tight range 2-3 PM',
      'Range is narrower than morning range',
      'Volume picks up approaching 3 PM',
      'Watch for failed moves that reverse'
    ],
    entryRules: [
      'Enter on break of 2-3 PM consolidation',
      'Confirmation: Higher volume than noon session',
      'Direction should align with daily trend'
    ],
    exitRules: [
      'Target: Hold into close (3:45-4:00 PM)',
      'Stop: Opposite side of consolidation range',
      'Close all positions by 3:55 PM'
    ],
    bestTime: '3:00 PM - 3:55 PM ET',
    riskReward: '1:1.5',
    pattern: 'consolidation'
  }
]
