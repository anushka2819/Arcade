import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { sounds } from '../../../SoundEffects';

const QUESTIONS = [
  { statement: '"Asking for help is a clear sign of mental strength and self-awareness."', answer: 'FACT', explanation: 'Correct! Reaching out shows courage and proactive self-care.' },
  { statement: '"Mental health conditions are simply a sign of laziness or emotional weakness."', answer: 'MYTH', explanation: 'Correct! Mental health challenges are real psychological conditions, not character flaws.' },
  { statement: '"Practicing mindful deep breathing helps lower heart rate and calm stress."', answer: 'FACT', explanation: 'Correct! Deep breathing directly activates the parasympathetic nervous system.' },
  { statement: '"You should always try to suppress bad feelings and pretend everything is fine."', answer: 'MYTH', explanation: 'Correct! Acknowledging feelings in a safe space allows healthy processing.' }
];

export default function MythVsFactGame() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);

  const q = QUESTIONS[currentIdx];

  const handleAnswer = (choice) => {
    sounds.playClick();
    if (choice === q.answer) {
      sounds.playLaunch();
      setFeedback({ type: 'correct', text: q.explanation });
      setScore(prev => prev + 100);
      try { confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } }); } catch (e) {}
    } else {
      setFeedback({ type: 'incorrect', text: `Not quite! This statement is actually a ${q.answer}.` });
    }
  };

  const handleNext = () => {
    sounds.playClick();
    setFeedback(null);
    setCurrentIdx((prev) => (prev + 1) % QUESTIONS.length);
  };

  return (
    <div className="min-h-screen bg-[#E8F7F5] text-[#4A353B] p-4 sm:p-6 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#4A7C7D]/40 shadow-xl text-center">
        
        <div className="relative rounded-2xl overflow-hidden mb-6 h-40 shadow-sm bg-white/80 border border-[#4A7C7D]/30 flex items-center justify-center p-3">
          <img src="/stickman_assets/scholar_stickman.svg" alt="Myth vs Fact" className="max-h-full max-w-full object-contain drop-shadow-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
            <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-teal-300" />
              Myth vs Fact
            </h2>
          </div>
        </div>

        <p className="text-xs text-[#4A7C7D] font-semibold mb-4">
          Question {currentIdx + 1} of {QUESTIONS.length}: Is this statement a Myth or a Fact?
        </p>

        {/* Statement Card */}
        <div className="p-6 bg-[#E7F2F2] rounded-2xl border-2 border-[#4A7C7D]/30 min-h-[100px] flex items-center justify-center mb-6">
          <h3 className="font-extrabold text-sm sm:text-base text-[#4A353B] leading-relaxed">
            {q.statement}
          </h3>
        </div>

        {/* Action Choice Buttons */}
        {!feedback && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => handleAnswer('MYTH')}
              className="py-3 px-6 rounded-2xl bg-[#F7C5D1] text-[#4A353B] font-extrabold text-sm hover:bg-[#F7D0D8] hover:scale-102 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <XCircle className="w-5 h-5 text-rose-700" />
              <span>❌ MYTH</span>
            </button>
            <button
              onClick={() => handleAnswer('FACT')}
              className="py-3 px-6 rounded-2xl bg-[#4A7C7D] text-white font-extrabold text-sm hover:bg-[#3B6667] hover:scale-102 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span>✅ FACT</span>
            </button>
          </div>
        )}

        {/* Feedback Display */}
        {feedback && (
          <div className={`p-4 rounded-2xl text-center mb-6 animate-bounce-soft ${
            feedback.type === 'correct' ? 'bg-[#E7F2F2] border border-[#4A7C7D] text-[#4A7C7D]' : 'bg-rose-100 border border-rose-300 text-rose-800'
          }`}>
            <p className="font-bold text-xs sm:text-sm mb-3">{feedback.text}</p>
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-full bg-[#4A353B] text-white font-bold text-xs shadow-md hover:bg-[#37252A] transition-all inline-flex items-center gap-2"
            >
              <span>Next Statement</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="text-xs text-[#4A7C7D] font-bold">
          Score: {score} Calm Points
        </div>

      </div>
    </div>
  );
}
