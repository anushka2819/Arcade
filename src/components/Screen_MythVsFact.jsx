import React from 'react';
import { Play, RotateCcw, BarChart3, Volume2, Moon, Sparkles, Check, HelpCircle } from 'lucide-react';
import { sounds } from '../SoundEffects';

export function Screen_MythVsFact({
  onBackToArcade,
  onPlayMiniGame,
  isAudioOn,
  setIsAudioOn,
  isDarkMode,
  setIsDarkMode,
  isParticlesOn,
  setIsParticlesOn
}) {
  const handleAudioToggle = () => {
    const next = !isAudioOn;
    setIsAudioOn?.(next);
    sounds.toggleAmbient(next);
    sounds.playToggle(next);
  };

  const handleDarkToggle = () => {
    const next = !isDarkMode;
    setIsDarkMode?.(next);
    sounds.playToggle(next);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto flex flex-col justify-center">

      {/* Main Content */}
      <main className="w-full bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-10 border border-zen-pinkAccent/40 shadow-zen flex flex-col justify-between">
        <div>
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative rounded-2xl overflow-hidden mb-4 shadow-sm h-40 w-full max-w-md bg-white/80 border border-[#4A7C7D]/30 flex items-center justify-center p-3">
              <img src="/stickman_assets/scholar_stickman.svg" alt="Myth vs Fact" className="max-h-full max-w-full object-contain drop-shadow-sm" />
            </div>

            <h2 className="text-3xl font-extrabold text-zen-plum font-display">
              Myth vs Fact
            </h2>
            <p className="text-xs sm:text-sm text-zen-mauve mt-1.5 max-w-md">
              Sort mental-health statements into myths and facts through a calm card challenge.
            </p>
          </div>

          <div className="max-w-md mx-auto mb-8">
            <button
              onClick={() => {
                sounds.playLaunch();
                onPlayMiniGame({
                  id: 'myth_vs_fact',
                  title: 'Myth vs Fact',
                  description: 'Challenge your awareness of mental health myths vs facts!'
                });
              }}
              className="w-full py-4 px-6 rounded-2xl bg-zen-plum hover:bg-zen-plumHover text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-current text-zen-pinkAccent" />
              </div>
              <span className="font-display tracking-wide uppercase">Resume Last Session</span>
            </button>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <button
                onClick={() => {
                  sounds.playLaunch();
                  onPlayMiniGame({
                    id: 'myth_vs_fact',
                    title: 'Myth vs Fact',
                    description: 'Start fresh trivia challenge.'
                  });
                }}
                className="py-2.5 px-4 rounded-xl bg-zen-pinkLight border border-zen-pinkAccent text-zen-plum font-bold text-xs hover:bg-zen-pinkCard transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5 text-zen-mauve" />
                <span>New Game</span>
              </button>

              <button
                onClick={() => alert("Myth vs Fact Stats:\n- Cards Solved: 24\n- Accuracy: 100%\n- Score: 800 Calm Points")}
                className="py-2.5 px-4 rounded-xl bg-zen-pinkLight border border-zen-pinkAccent text-zen-plum font-bold text-xs hover:bg-zen-pinkCard transition-all flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-3.5 h-3.5 text-zen-mauve" />
                <span>Stat History</span>
              </button>
            </div>
          </div>

          {/* Settings */}
          <div className="max-w-md mx-auto bg-zen-pinkLight/60 rounded-2xl p-5 border border-zen-pinkAccent/40">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-zen-plum mb-4 flex items-center gap-1.5 font-display">
              <span>🔊</span> Atmosphere Settings
            </h4>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-zen-plum shadow-sm">
                    <Volume2 className="w-4 h-4 text-zen-mauve" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zen-plum">Ambient Audio</p>
                    <p className="text-[10px] text-zen-mauve">Soft audio chimes</p>
                  </div>
                </div>
                <button
                  onClick={handleAudioToggle}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${isAudioOn ? 'bg-zen-plum justify-end' : 'bg-zen-pinkAccent/60 justify-start'}`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center">
                    {isAudioOn && <Check className="w-3 h-3 text-zen-plum" />}
                  </div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-zen-plum shadow-sm">
                    <Moon className="w-4 h-4 text-zen-mauve" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zen-plum">Calming Dark Theme</p>
                    <p className="text-[10px] text-zen-mauve">Gentle dim lighting</p>
                  </div>
                </div>
                <button
                  onClick={handleDarkToggle}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${isDarkMode ? 'bg-zen-plum justify-end' : 'bg-zen-pinkAccent/60 justify-start'}`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center">
                    {isDarkMode && <Check className="w-3 h-3 text-zen-plum" />}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              sounds.playClick();
              onBackToArcade();
            }}
            className="py-2.5 px-6 rounded-full bg-zen-pinkHeader border border-zen-pinkAccent text-zen-plum font-bold text-xs hover:bg-zen-pinkAccent transition-all shadow-sm"
          >
            Switch Game
          </button>
        </div>
      </main>

    </div>
  );
}
