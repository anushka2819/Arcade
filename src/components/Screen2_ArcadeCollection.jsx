import React, { useState } from 'react';
import { Search, Sparkles, Play, Rocket } from 'lucide-react';
import { sounds } from '../SoundEffects';

export function Screen2_ArcadeCollection({ onSelectGame }) {
  const [searchQuery, setSearchQuery] = useState('');

  const games = [
    {
      id: 'words_of_wisdom',
      title: 'Words of Wisdom',
      category: 'Mindful Puzzles',
      tag: 'CALMING',
      badgeColor: 'bg-zen-pinkAccent text-zen-plum',
      description: 'A calming puzzle & quote builder to inspire mindfulness.',
      bgGradient: 'from-[#FFF3F5] to-[#FCEBEF]',
      borderColor: 'border-zen-pinkAccent',
      imageUrl: '/1.png'
    },
    {
      id: 'stick_man',
      title: 'Stick Man to the Rescue',
      category: 'Physics & Play',
      tag: 'LIGHTHEARTED',
      badgeColor: 'bg-zen-creamBg text-zen-plum',
      description: 'A lighthearted physics puzzle to guide your stick figure home.',
      bgGradient: 'from-[#FAF7F2] to-[#E8E3C5]/40',
      borderColor: 'border-zen-creamBg',
      imageUrl: '/2.png'
    },
    {
      id: 'little_big_feelings',
      title: 'Little Big Feelings',
      category: 'Mood & Feelings',
      tag: 'EMOTIONAL',
      badgeColor: 'bg-zen-oliveBg text-zen-olive',
      description: 'Explore and process your emotions with interactive blob friends.',
      bgGradient: 'from-[#EFF2E1] to-[#E3E8CE]',
      borderColor: 'border-zen-olive/40',
      imageUrl: '/3.png'
    },
    {
      id: 'mindscape_defense',
      title: 'Mindscape Defense',
      category: 'Relaxed Strategy',
      tag: 'PROTECT PEACE',
      badgeColor: 'bg-zen-pinkHeader text-zen-plum',
      description: 'Protect your inner peace in a relaxed strategy experience.',
      bgGradient: 'from-[#FAF2F4] to-[#FCEBEF]',
      borderColor: 'border-zen-mauve/30',
      imageUrl: '/4.png'
    },
    {
      id: 'feeling_fusion',
      title: 'Feeling Fusion',
      category: 'Mood & Feelings',
      tag: 'DISCOVER',
      badgeColor: 'bg-zen-yellow text-zen-plum',
      description: 'Blend emotions together and discover what your feelings are trying to say.',
      bgGradient: 'from-[#FFF7D6] to-[#FDECC8]',
      borderColor: 'border-zen-yellow',
      imageUrl: '/5.png'
    },
    {
      id: 'myth_vs_fact',
      title: 'Myth vs Fact',
      category: 'Mindful Puzzles',
      tag: 'LEARN',
      badgeColor: 'bg-zen-tealBg text-zen-teal',
      description: 'Sort mental-health statements into myths and facts through a calm card challenge.',
      bgGradient: 'from-[#E8F7F5] to-[#D9EEEC]',
      borderColor: 'border-zen-teal/40',
      imageUrl: '/6.png'
    },
    {
      id: 'signal_scout',
      title: 'Signal Scout',
      category: 'Pathway Flow',
      tag: 'NOTICE',
      badgeColor: 'bg-zen-pinkAccent text-zen-plum',
      description: 'Learn to notice signals of distress and choose compassionate ways to respond.',
      bgGradient: 'from-[#F3F0FF] to-[#E7E0FA]',
      borderColor: 'border-indigo-200',
      imageUrl: '/bg-4.png'
    }
  ];

  const visibleGames = games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zen-pinkAccent/40 text-zen-plum text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cozy Game Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zen-plum font-display">
            Arcade Collection
          </h2>
          <p className="text-sm text-zen-mauve mt-1">
            Choose a game to enter its dedicated hub. You can exit back to the arcade at any time.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-zen-mauve absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search cozy games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-zen-pinkAccent/50 rounded-full text-xs font-medium text-zen-plum placeholder-zen-mauve/60 focus:outline-none focus:border-zen-plum shadow-sm"
          />
        </div>
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleGames.map((game) => (
          <div
            key={game.id}
            onClick={() => {
              sounds.playLaunch();
              onSelectGame(game.id);
            }}
            className={`bg-gradient-to-b ${game.bgGradient} rounded-3xl p-5 border ${game.borderColor} shadow-zen hover:shadow-zen-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1`}
          >
            <div>
              {/* Card Illustration */}
              <div className="relative rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:scale-102 transition-transform duration-300">
                <img src={game.imageUrl} alt={game.title} className="w-full h-36 object-cover rounded-2xl" />
                <span className={`absolute top-3 left-3 text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm ${game.badgeColor}`}>
                  {game.tag}
                </span>
              </div>

              {/* Title & Category */}
              <h3 className="text-xl font-extrabold text-zen-plum font-display group-hover:text-zen-mauve transition-colors">
                {game.title}
              </h3>
              <p className="text-xs font-semibold text-zen-mauve mt-0.5 mb-2">
                {game.category}
              </p>

              {/* Description */}
              <p className="text-xs text-zen-plum/80 leading-relaxed mb-6">
                {game.description}
              </p>
            </div>

            {/* Action Button: Enter Game */}
            <div className="pt-2 border-t border-black/5">
              <button
                type="button"
                className="w-full py-3 px-4 rounded-xl bg-zen-plum hover:bg-zen-plumHover text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 group-hover:scale-102"
              >
                <Play className="w-3.5 h-3.5 fill-current text-zen-pinkAccent" />
                <span>Enter {game.title}</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Footer Banner */}
      <div className="mt-12 p-6 rounded-3xl bg-zen-yellow/50 border border-zen-yellow flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zen-plum text-white flex items-center justify-center font-display font-bold">
            LZ
          </div>
          <div>
            <h4 className="font-extrabold text-zen-plum font-display">Lumina Zen Arcade</h4>

          </div>
        </div>
      </div>

    </div>
  );
}
