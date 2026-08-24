import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Plus, CheckCircle, RefreshCw } from 'lucide-react';
import { sounds } from '../../../SoundEffects';

const COMBINATIONS = {
  'Joy 💛+Calm 🌿': '💖 Serenity (A deep, peaceful inner happiness)',
  'Joy 💛+Hope 🌅': '🌟 Optimism (Bright expectation for tomorrow)',
  'Calm 🌿+Trust 🤝': '🛡️ Harmony (Unshakeable security & quiet confidence)',
  'Trust 🤝+Wonder ✨': '🔮 Reverence (Deep awe and emotional connection)',
  'Hope 🌅+Wonder ✨': '🚀 Inspiration (Creative energy flowing freely)'
};

export default function FeelingFusionGame() {
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);

  const handleSelect = (emotion) => {
    sounds.playClick();
    let next;
    if (selected.length >= 2) {
      next = [emotion];
      setResult(null);
    } else {
      next = [...selected, emotion];
    }
    setSelected(next);

    if (next.length === 2) {
      sounds.playLaunch();
      const k1 = `${next[0]}+${next[1]}`;
      const k2 = `${next[1]}+${next[0]}`;
      const res = COMBINATIONS[k1] || COMBINATIONS[k2] || '🌈 Radiant Harmony (A novel, unique synthesis of feelings!)';
      setResult(res);
      try { confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } }); } catch (e) {}
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7D6] text-[#4A353B] p-4 sm:p-6 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#EADF9E] shadow-xl text-center">
        
        <div className="relative rounded-2xl overflow-hidden mb-6 h-40 shadow-sm">
          <img src="/5.png" alt="Feeling Fusion" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-300" />
              Feeling Fusion
            </h2>
          </div>
        </div>

        <p className="text-xs text-[#7A8450] font-semibold mb-6">
          Select 2 primary emotions to blend them into a rich emotional state:
        </p>

        {/* Fusion Slots */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-[#EADF9E] bg-[#FAF7F2] flex items-center justify-center text-3xl font-extrabold shadow-inner">
            {selected[0] ? selected[0].split(' ')[1] : '❓'}
          </div>
          <Plus className="w-6 h-6 text-[#7A8450]" />
          <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-[#EADF9E] bg-[#FAF7F2] flex items-center justify-center text-3xl font-extrabold shadow-inner">
            {selected[1] ? selected[1].split(' ')[1] : '❓'}
          </div>
        </div>

        {/* Primary Emotion Options */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {['Joy 💛', 'Calm 🌿', 'Hope 🌅', 'Trust 🤝', 'Wonder ✨'].map((item) => (
            <button
              key={item}
              onClick={() => handleSelect(item)}
              className="px-4 py-2.5 rounded-xl bg-white border border-[#EADF9E] font-bold text-xs hover:bg-[#FFF7D6] hover:scale-105 active:scale-95 transition-all shadow-sm"
            >
              {item}
            </button>
          ))}
        </div>

        {result && (
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADF9E] text-center animate-bounce-soft">
            <p className="text-xs font-bold text-[#7A8450] uppercase tracking-wider mb-1">Synthesized Emotion</p>
            <h4 className="font-extrabold text-base text-[#4A353B]">{result}</h4>
          </div>
        )}

      </div>
    </div>
  );
}
