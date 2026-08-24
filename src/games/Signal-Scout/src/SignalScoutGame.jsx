import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Compass, Heart, CheckCircle2, MessageCircle } from 'lucide-react';
import { sounds } from '../../../SoundEffects';

const SIGNALS = [
  { id: 1, title: 'Isolation', emoji: '🛋️', signal: 'Withdrawing from usual peer activities and conversations.', action: '💬 Send a gentle check-in message without any pressure.' },
  { id: 2, title: 'Fatigue', emoji: '☕', signal: 'Exhausted, low energy, and unusually quiet during group work.', action: '☕ Share a calm warm drink and offer a listening ear.' },
  { id: 3, title: 'Overwhelmed', emoji: '🌊', signal: 'Expressing feeling flooded by workload or daily expectations.', action: '🌿 Help break tasks into small, manageable, quiet steps.' }
];

export default function SignalScoutGame() {
  const [selectedSignal, setSelectedSignal] = useState(null);

  const handleSelect = (s) => {
    sounds.playLaunch();
    setSelectedSignal(s);
    try { confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } }); } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-[#F3F0FF] text-[#4A353B] p-4 sm:p-6 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-indigo-200 shadow-xl text-center">
        
        <div className="relative rounded-2xl overflow-hidden mb-6 h-40 shadow-sm">
          <img src="/bg-4.png" alt="Signal Scout" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2">
              <Compass className="w-6 h-6 text-indigo-300" />
              Signal Scout
            </h2>
          </div>
        </div>

        <p className="text-xs text-indigo-600 font-semibold mb-6">
          Learn to notice distress signals in peers and choose compassionate support:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {SIGNALS.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelect(s)}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                selectedSignal?.id === s.id
                  ? 'bg-indigo-100 border-indigo-500 scale-105 shadow-md'
                  : 'bg-white border-indigo-100 hover:border-indigo-300 hover:scale-102'
              }`}
            >
              <span className="text-4xl animate-bounce-soft">{s.emoji}</span>
              <span className="text-xs font-extrabold text-indigo-900">{s.title}</span>
            </button>
          ))}
        </div>

        {selectedSignal && (
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-left animate-bounce-soft">
            <div className="flex items-center gap-2 font-bold text-xs text-indigo-700 uppercase tracking-wider mb-2">
              <span>{selectedSignal.emoji}</span>
              <span>Distress Signal: {selectedSignal.title}</span>
            </div>
            <p className="text-xs text-[#4A353B] mb-3 font-medium">"{selectedSignal.signal}"</p>
            <div className="p-3 rounded-xl bg-white border border-indigo-100 text-xs font-bold text-indigo-900 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 shrink-0 fill-current" />
              <span>{selectedSignal.action}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
