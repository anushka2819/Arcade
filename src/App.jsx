import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Screen1_Login } from './components/Screen1_Login';
import { Screen2_ArcadeCollection } from './components/Screen2_ArcadeCollection';
import { Screen3_WordsOfWisdom } from './components/Screen3_WordsOfWisdom';
import { Screen4_LittleBigFeelings } from './components/Screen4_LittleBigFeelings';
import { Screen5_StickManToRescue } from './components/Screen5_StickManToRescue';
import { Screen_MindscapeDefense } from './components/Screen_MindscapeDefense';
import { Screen_PlushMatch } from './components/Screen_PlushMatch';
import { Screen_SignalCloud } from './components/Screen_SignalCloud';
import { MiniGameModal } from './components/MiniGameModal';
import { EmbeddedGame } from './components/EmbeddedGame';
import { supabase } from './lib/supabase';


export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [currentView, setCurrentView] = useState('login'); // 'login', 'arcade', or game IDs
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isParticlesOn, setIsParticlesOn] = useState(true);
  const [activeMiniGame, setActiveMiniGame] = useState(null);
  const [activeStandaloneGame, setActiveStandaloneGame] = useState(null);

  const [user, setUser] = useState({
    name: 'Anushka',
    email: 'anushka@luminazen.app',
    avatar: '🧘'
  });

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      if (session?.user) {
        setUser({
          name: session.user.user_metadata?.display_name || session.user.email?.split('@')[0] || 'Zen Explorer',
          email: session.user.email || '',
          avatar: '🧘',
        });
        setIsAuthenticated(true);
        setCurrentView('arcade');
      }
      setAuthReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setIsAuthenticated(Boolean(session));
      if (!session) {
        setCurrentView('login');
        return;
      }
      setUser({
        name: session.user.user_metadata?.display_name || session.user.email?.split('@')[0] || 'Zen Explorer',
        email: session.user.email || '',
        avatar: '🧘',
      });
      setCurrentView('arcade');
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = (name, email) => {
    setUser({
      name: name || email?.split('@')[0] || 'Zen Explorer',
      email: email || 'guest@luminazen.app',
      avatar: '🧘'
    });
    setIsAuthenticated(true);
    setCurrentView('arcade');
  };

  const handleRegister = (name, email) => {
    setUser({
      name: name || email?.split('@')[0] || 'Zen Explorer',
      email: email || 'user@luminazen.app',
      avatar: '🧘'
    });
    setIsAuthenticated(true);
    setCurrentView('arcade');
  };

  const handleGuestAccess = () => {
    setUser({
      name: 'Zen Guest',
      email: 'guest@luminazen.app',
      avatar: '🌿'
    });
    setIsAuthenticated(true);
    setCurrentView('arcade');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setCurrentView('login');
  };

  const handleSelectGame = (gameId) => {
    setCurrentView(gameId);
  };

  const handleGoToArcade = () => {
    setCurrentView('arcade');
    setActiveStandaloneGame(null);
  };

  const handlePlayMiniGame = (game) => {
    setActiveStandaloneGame(game);
  };

  if (!authReady) {
    return (
      <div className="min-h-screen bg-[#FDF2F4] text-[#4A353B] flex items-center justify-center font-sans">
        <div className="text-center p-6 rounded-3xl bg-white/70 backdrop-blur border border-zen-pinkAccent shadow-zen animate-pulse">
          <span className="text-4xl block mb-2">🧘</span>
          <p className="text-sm font-bold font-display text-zen-plum">Entering Lumina Zen Arcade...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#FDF2F4] text-[#4A353B]'} font-sans relative overflow-x-hidden selection:bg-zen-pinkAccent selection:text-zen-plum transition-colors duration-300`}>

      {/* Global Background Glow Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-zen-pinkAccent/30 blur-3xl opacity-60 animate-pulse" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-zen-yellow/20 blur-3xl opacity-50" />
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-zen-tealBg/40 blur-3xl opacity-50" />
      </div>

      {/* Persistent Navbar */}
      {isAuthenticated && currentView !== 'login' && !activeStandaloneGame && (
        <Navbar
          currentView={currentView}
          onGoToArcade={handleGoToArcade}
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isAudioOn={isAudioOn}
          setIsAudioOn={setIsAudioOn}
          user={user}
        />
      )}

      {/* Standalone Full-screen Embedded Game Overlay */}
      {activeStandaloneGame ? (
        <EmbeddedGame
          gameId={activeStandaloneGame.id}
          title={activeStandaloneGame.title}
          onBackToArcade={() => setActiveStandaloneGame(null)}
        />
      ) : (
        /* View Router */
        <div className="relative z-10">
          {!isAuthenticated || currentView === 'login' ? (
            <Screen1_Login
              onLogin={handleLogin}
              onRegister={handleRegister}
              onGuestAccess={handleGuestAccess}
            />
          ) : currentView === 'arcade' ? (
            <Screen2_ArcadeCollection
              onSelectGame={handleSelectGame}
            />
          ) : currentView === 'words_of_wisdom' ? (
            <Screen3_WordsOfWisdom
              onBackToArcade={handleGoToArcade}
              onPlayMiniGame={handlePlayMiniGame}
              isAudioOn={isAudioOn}
              setIsAudioOn={setIsAudioOn}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              isParticlesOn={isParticlesOn}
              setIsParticlesOn={setIsParticlesOn}
            />
          ) : currentView === 'little_big_feelings' ? (
            <Screen4_LittleBigFeelings
              onBackToArcade={handleGoToArcade}
              onPlayMiniGame={handlePlayMiniGame}
              isAudioOn={isAudioOn}
              setIsAudioOn={setIsAudioOn}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              isParticlesOn={isParticlesOn}
              setIsParticlesOn={setIsParticlesOn}
            />
          ) : currentView === 'stick_man' ? (
            <Screen5_StickManToRescue
              onBackToArcade={handleGoToArcade}
              onPlayMiniGame={handlePlayMiniGame}
              isAudioOn={isAudioOn}
              setIsAudioOn={setIsAudioOn}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              isParticlesOn={isParticlesOn}
              setIsParticlesOn={setIsParticlesOn}
            />
          ) : currentView === 'mindscape_defense' ? (
            <Screen_MindscapeDefense
              onBackToArcade={handleGoToArcade}
              onPlayMiniGame={handlePlayMiniGame}
              isAudioOn={isAudioOn}
              setIsAudioOn={setIsAudioOn}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              isParticlesOn={isParticlesOn}
              setIsParticlesOn={setIsParticlesOn}
            />
          ) : currentView === 'feeling_fusion' ? (
            <Screen_PlushMatch
              onBackToArcade={handleGoToArcade}
              onPlayMiniGame={handlePlayMiniGame}
              isAudioOn={isAudioOn}
              setIsAudioOn={setIsAudioOn}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              isParticlesOn={isParticlesOn}
              setIsParticlesOn={setIsParticlesOn}
            />
          ) : currentView === 'myth_vs_fact' ? (
            <Screen3_WordsOfWisdom
              onBackToArcade={handleGoToArcade}
              onPlayMiniGame={handlePlayMiniGame}
              isAudioOn={isAudioOn}
              setIsAudioOn={setIsAudioOn}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              isParticlesOn={isParticlesOn}
              setIsParticlesOn={setIsParticlesOn}
            />
          ) : currentView === 'signal_scout' ? (
            <Screen_SignalCloud
              onBackToArcade={handleGoToArcade}
              onPlayMiniGame={handlePlayMiniGame}
              isAudioOn={isAudioOn}
              setIsAudioOn={setIsAudioOn}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              isParticlesOn={isParticlesOn}
              setIsParticlesOn={setIsParticlesOn}
            />
          ) : (
            <Screen2_ArcadeCollection
              onSelectGame={handleSelectGame}
            />
          )}
        </div>
      )}

      {/* Mini Game Modal Overlay */}
      {activeMiniGame && (
        <MiniGameModal
          game={activeMiniGame}
          onClose={() => setActiveMiniGame(null)}
        />
      )}

    </div>
  );
}

export default App;
