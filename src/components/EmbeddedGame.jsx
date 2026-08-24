import React from 'react';
import { ArrowLeft } from 'lucide-react';

const GAME_PATHS = {
  stick_man: '/src/games/stickman/index.html',
  words_of_wisdom: '/src/games/Words-of-Wisdom/index.html',
  little_big_feelings: '/src/games/Little-Big-Feelings/index.html',
  mindscape_defense: '/src/games/mindscape-defence/index.html',
  feeling_fusion: '/src/games/Feeling-Fusion/index.html',
  myth_vs_fact: '/src/games/Myth-vs-Fact/index.html',
  signal_scout: '/src/games/Signal-Scout/index.html',
};

export function EmbeddedGame({ gameId, title, onBackToArcade }) {
  const gamePath = GAME_PATHS[gameId];

  if (!gamePath) return null;

  return (
    <div className="fixed inset-0 z-20 bg-slate-950 flex flex-col">
      {/* Top Header Overlay Bar */}
      <div className="h-14 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 flex items-center justify-between z-30 shrink-0">
        <button
          onClick={onBackToArcade}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Arcade</span>
        </button>
        <h3 className="text-sm font-bold text-slate-200 font-display">{title}</h3>
        <div className="w-20" /> {/* Spacer */}
      </div>

      <iframe
        title={title}
        src={gamePath}
        className="block flex-1 w-full border-0"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}

