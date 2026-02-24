import { useState } from 'react'
import { SetupCard } from './components/SetupCard'
import { PatternVisualizer } from './components/PatternVisualizer'
import { LearningModule } from './components/LearningModule'
import { setups } from './data/setups'

type Tab = 'setups' | 'learn' | 'practice'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('setups')
  const [selectedSetup, setSelectedSetup] = useState<string | null>(null)

  const selectedSetupData = setups.find(s => s.id === selectedSetup)

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e8e8e8] overflow-x-hidden flex flex-col">
      {/* Noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Header */}
      <header className="relative border-b border-[#1a1a24] bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#0080ff] flex items-center justify-center">
                <span className="font-mono font-bold text-[#0a0a0f] text-lg md:text-xl">SPX</span>
              </div>
              <div>
                <h1 className="font-mono text-lg md:text-xl font-bold tracking-tight">
                  EDGE<span className="text-[#00f0ff]">FINDER</span>
                </h1>
                <p className="text-xs text-[#6b6b7b] font-sans">High-Probability SPX Setups</p>
              </div>
            </div>

            {/* Live indicator */}
            <div className="flex items-center gap-2 bg-[#12121a] rounded-full px-3 py-1.5 md:px-4 md:py-2 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="font-mono text-xs text-[#6b6b7b]">MARKET OPEN</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="border-b border-[#1a1a24] bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex gap-0 overflow-x-auto">
            {[
              { id: 'setups' as Tab, label: 'TOP SETUPS', count: setups.length },
              { id: 'learn' as Tab, label: 'LEARN', count: null },
              { id: 'practice' as Tab, label: 'PRACTICE', count: null },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative px-4 md:px-6 py-3 md:py-4 font-mono text-xs md:text-sm tracking-wider transition-all whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'text-[#00f0ff]'
                    : 'text-[#6b6b7b] hover:text-[#e8e8e8]'
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  {tab.label}
                  {tab.count && (
                    <span className={`
                      px-1.5 py-0.5 rounded text-[10px]
                      ${activeTab === tab.id
                        ? 'bg-[#00f0ff]/20 text-[#00f0ff]'
                        : 'bg-[#1a1a24] text-[#6b6b7b]'
                      }
                    `}>
                      {tab.count}
                    </span>
                  )}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00f0ff]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-6 md:py-10">
        {activeTab === 'setups' && (
          <div className="space-y-6 md:space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h2 className="font-sans text-2xl md:text-3xl font-light mb-2">
                  High-Probability <span className="text-[#00f0ff] font-semibold">Setups</span>
                </h2>
                <p className="text-[#6b6b7b] text-sm md:text-base max-w-xl">
                  Curated SPX patterns with proven edge. Click any setup to see detailed entry criteria and visual examples.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#ffa726] bg-[#ffa726]/10 px-3 py-2 rounded-lg">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="whitespace-nowrap">Win rates based on historical data</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {setups.map((setup, index) => (
                <SetupCard
                  key={setup.id}
                  setup={setup}
                  index={index}
                  onClick={() => setSelectedSetup(setup.id)}
                  isSelected={selectedSetup === setup.id}
                />
              ))}
            </div>

            {/* Pattern Visualizer Modal */}
            {selectedSetupData && (
              <PatternVisualizer
                setup={selectedSetupData}
                onClose={() => setSelectedSetup(null)}
              />
            )}
          </div>
        )}

        {activeTab === 'learn' && <LearningModule />}

        {activeTab === 'practice' && (
          <div className="animate-fadeIn text-center py-12 md:py-20">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#ffa726]/20 to-[#ff6b35]/20 flex items-center justify-center">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-[#ffa726]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="font-sans text-xl md:text-2xl font-semibold mb-3">Practice Mode Coming Soon</h3>
            <p className="text-[#6b6b7b] max-w-md mx-auto text-sm md:text-base px-4">
              Test your pattern recognition skills with real historical SPX charts. Identify setups in real-time simulation.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1a1a24] py-4 md:py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="font-mono text-[10px] md:text-xs text-[#4a4a5a] tracking-wide">
            Requested by <span className="text-[#6b6b7b]">@O_Meezly</span> · Built by <span className="text-[#6b6b7b]">@clonkbot</span>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
