import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, CheckCircle, BookOpen } from 'lucide-react';
import { sounds } from '../../../SoundEffects';

const FEELINGS = [
  { name: 'Calm', emoji: '🌿', color: 'bg-[#EFF2E1] border-[#7A8450] text-[#7A8450]', desc: 'Finding quiet peace and relaxation in your body.' },
  { name: 'Cozy', emoji: '☁️', color: 'bg-[#FCEBEF] border-[#F7C5D1] text-[#4A353B]', desc: 'Wrapped in warmth, safety, and comfort.' },
  { name: 'Joyful', emoji: '✨', color: 'bg-[#FFF7D6] border-[#EADF9E] text-amber-800', desc: 'Sparkling with happiness, light, and wonder.' },
  { name: 'Peaceful', emoji: '🌊', color: 'bg-[#E7F2F2] border-[#4A7C7D] text-[#4A7C7D]', desc: 'Riding smooth, gentle, and rhythmic waves.' },
  { name: 'Loved', emoji: '💖', color: 'bg-rose-100 border-rose-300 text-rose-700', desc: 'Surrounded by affection and deep kindness.' }
];

export default function LittleBigFeelingsGame() {
  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const [journal, setJournal] = useState([]);

  const handleSelectFeeling = (f) => {
    sounds.playLaunch();
    setSelectedFeeling(f);
    setJournal((prev) => [f.name, ...prev.filter(name => name !== f.name)]);
    try { confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } }); } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-[#EFF2E1] text-[#4A353B] p-4 sm:p-6 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#7A8450]/40 shadow-xl text-center">
        
        <div className="relative rounded-2xl overflow-hidden mb-6 h-40 shadow-sm bg-white/80 border border-[#7A8450]/30 flex items-center justify-center p-3">
          <img src="/assets/brand/image.png" alt="Little Big Feelings" className="max-h-full max-w-full object-contain drop-shadow-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
            <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-300 fill-current" />
              Little Big Feelings
            </h2>
          </div>
        </div>

        <p className="text-xs text-[#7A8450] font-semibold mb-6">
          How is your heart feeling right now? Tap an emotion blob to reflect:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {FEELINGS.map((f) => (
            <button
              key={f.name}
              onClick={() => handleSelectFeeling(f)}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${f.color} ${
                selectedFeeling?.name === f.name ? 'scale-105 ring-2 ring-[#4A353B] shadow-md' : 'hover:scale-102'
              }`}
            >
              <span className="text-4xl animate-bounce-soft">{f.emoji}</span>
              <span className="text-xs font-extrabold">{f.name}</span>
            </button>
          ))}
        </div>

        {selectedFeeling && (
          <div className="p-4 rounded-2xl bg-[#EFF2E1]/80 border border-[#7A8450]/40 text-[#4A353B] text-xs font-medium animate-fade-in mb-4">
            <div className="flex items-center justify-center gap-2 font-bold text-sm text-[#7A8450] mb-1">
              <span>{selectedFeeling.emoji}</span>
              <span>Checked in as {selectedFeeling.name}!</span>
            </div>
            <p>{selectedFeeling.desc}</p>
            <p className="text-[11px] text-[#A86B79] mt-2 font-bold">
              ✨ Saved to your Lumina Zen Mood Journal (+50 Calm Points)
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
