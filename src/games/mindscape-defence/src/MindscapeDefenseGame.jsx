import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Shield, Sparkles, CheckCircle, Zap } from 'lucide-react';
import { sounds } from '../../../SoundEffects';

export default function MindscapeDefenseGame() {
  const [shield, setShield] = useState(0);
  const [protectedState, setProtectedState] = useState(false);

  const handleCharge = () => {
    sounds.playClick();
    if (shield >= 100) return;
    const next = Math.min(100, shield + 20);
    setShield(next);

    if (next >= 100) {
      sounds.playLaunch();
      setProtectedState(true);
      try { confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } }); } catch (e) {}
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setShield(0);
    setProtectedState(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF2F4] text-[#4A353B] p-4 sm:p-6 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#F7C5D1] shadow-xl text-center">
        
        <div className="relative rounded-2xl overflow-hidden mb-6 h-40 shadow-sm bg-white/80 border border-[#F7C5D1]/50 flex items-center justify-center p-3">
          <img src="/stickman_assets/shield_stickman.svg" alt="Mindscape Defense" className="max-h-full max-w-full object-contain drop-shadow-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
            <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2">
              <Shield className="w-6 h-6 text-[#F7C5D1]" />
              Mindscape Defense
            </h2>
          </div>
        </div>

        <p className="text-xs text-[#A86B79] font-semibold mb-6">
          Protect your inner peace crystal against intrusive thoughts! Tap to generate peace shields:
        </p>

        {/* Crystal Shield Button */}
        <div
          onClick={handleCharge}
          className="w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-[#FCEBEF] to-[#F7C5D1] border-4 border-white shadow-xl flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all mb-6 group relative"
        >
          <span className="text-5xl group-hover:scale-110 transition-transform">💎</span>
          <span className="absolute inset-0 rounded-full border-2 border-dashed border-[#A86B79] animate-spin-slow opacity-60"></span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#FCEBEF] h-4 rounded-full overflow-hidden border border-[#F7C5D1] mb-2">
          <div
            className="bg-[#4A353B] h-full transition-all duration-300 rounded-full"
            style={{ width: `${shield}%` }}
          />
        </div>
        <p className="text-xs font-bold text-[#4A353B] mb-6">
          Sanctuary Peace Shield: {shield}%
        </p>

        {protectedState && (
          <div className="p-4 rounded-2xl bg-[#EADF9E] text-[#4A353B] text-center animate-bounce-soft mb-4">
            <h4 className="font-extrabold text-sm font-display flex items-center justify-center gap-2 mb-1">
              <CheckCircle className="w-5 h-5 text-emerald-700" />
              <span>Sanctuary Fully Shielded! (+100 Calm Points)</span>
            </h4>
            <p className="text-xs">Your inner peace is calm, grounded, and safe.</p>
            <button
              onClick={handleReset}
              className="mt-3 px-5 py-2 rounded-full bg-[#4A353B] text-white font-bold text-xs shadow-sm hover:bg-[#37252A] transition-all"
            >
              Recharge Sanctuary
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
