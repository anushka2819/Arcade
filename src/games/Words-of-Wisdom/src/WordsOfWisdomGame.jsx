import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Sparkles, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { sounds } from '../../../SoundEffects';

const QUOTES = [
  { id: 1, words: ['Peace', 'begins', 'within', 'a quiet', 'mind.'], hint: 'Calming affirmation for inner quiet' },
  { id: 2, words: ['Breathe', 'deeply', 'and', 'release', 'all tension.'], hint: 'Mindful breathing practice' },
  { id: 3, words: ['Every', 'small', 'step', 'forward', 'is progress.'], hint: 'Encouragement for your journey' },
  { id: 4, words: ['You', 'are', 'stronger', 'than', 'your thoughts.'], hint: 'Self-compassion reminder' }
];

export default function WordsOfWisdomGame() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [placedWords, setPlacedWords] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuote = QUOTES[currentIdx];
  const targetWords = currentQuote.words;

  const handleSelectWord = (word) => {
    sounds.playClick();
    const nextPlaced = [...placedWords, word];
    setPlacedWords(nextPlaced);

    if (nextPlaced.length === targetWords.length) {
      if (JSON.stringify(nextPlaced) === JSON.stringify(targetWords)) {
        sounds.playLaunch();
        setCompleted(true);
        setScore(prev => prev + 100);
        try { confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } }); } catch (e) {}
      } else {
        setTimeout(() => {
          setPlacedWords([]);
          alert('Not quite in order! Try again.');
        }, 300);
      }
    }
  };

  const handleNextQuote = () => {
    sounds.playClick();
    setPlacedWords([]);
    setCompleted(false);
    setCurrentIdx((prev) => (prev + 1) % QUOTES.length);
  };

  return (
    <div className="min-h-screen bg-[#FDF2F4] text-[#4A353B] p-4 sm:p-6 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#F7C5D1] shadow-xl text-center">
        
        <div className="relative rounded-2xl overflow-hidden mb-6 h-40 shadow-sm bg-white/80 border border-[#F7C5D1]/50 flex items-center justify-center p-3">
          <img src="/stickman_assets/Words_Of_Wisdom-1024.png" alt="Words of Wisdom" className="max-h-full max-w-full object-contain drop-shadow-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
            <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#F7C5D1]" />
              Words of Wisdom
            </h2>
          </div>
        </div>

        <p className="text-xs text-[#A86B79] font-medium mb-4">
          Hint: {currentQuote.hint}
        </p>

        {/* Display Placed Words Box */}
        <div className="min-h-[70px] p-4 bg-[#FCEBEF] rounded-2xl border-2 border-dashed border-[#F7C5D1] flex flex-wrap items-center justify-center gap-2 mb-6">
          {placedWords.length === 0 ? (
            <span className="text-xs italic text-[#A86B79]">Tap the words below in order...</span>
          ) : (
            placedWords.map((w, idx) => (
              <span key={idx} className="px-3.5 py-1.5 rounded-xl bg-[#4A353B] text-white font-bold text-xs shadow-sm animate-bounce-soft">
                {w}
              </span>
            ))
          )}
        </div>

        {/* Words Selection Pool */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          {targetWords.map((word, idx) => {
            const isUsed = placedWords.includes(word);
            return (
              <button
                key={idx}
                disabled={isUsed}
                onClick={() => handleSelectWord(word)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  isUsed
                    ? 'opacity-30 bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#F7D0D8] text-[#4A353B] hover:bg-[#F7C5D1] hover:scale-105 active:scale-95'
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>

        {/* Win Banner & Next Button */}
        {completed && (
          <div className="p-4 rounded-2xl bg-[#EADF9E] text-[#4A353B] text-center animate-bounce-soft mb-4">
            <h4 className="font-extrabold text-sm font-display flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-700" />
              <span>Affirmation Unlocked! (+100 Calm Points)</span>
            </h4>
            <button
              onClick={handleNextQuote}
              className="mt-3 px-6 py-2.5 rounded-full bg-[#4A353B] text-white font-bold text-xs shadow-md hover:bg-[#37252A] transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <span>Next Affirmation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="text-xs text-[#A86B79] font-bold">
          Calm Points: {score} | Quote {currentIdx + 1} of {QUOTES.length}
        </div>

      </div>
    </div>
  );
}
