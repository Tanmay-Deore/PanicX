import { useState, useEffect } from 'react';
import { PanicHeader } from './components/PanicHeader';
import { HeroSection } from './components/HeroSection';
import { MarketDashboard } from './components/MarketDashboard';
import { OrderBookNightmare } from './components/OrderBookNightmare';
import { PortfolioFromHell } from './components/PortfolioFromHell';
import { PanicMeter } from './components/PanicMeter';
import { CryptoWeather } from './components/CryptoWeather';
import { FakeStats } from './components/FakeStats';
import { PanicAI } from './components/PanicAI';
import { ChaosSettingsModal } from './components/ChaosSettingsModal';
import { CursedNavigation } from './components/CursedNavigation';
import { FloatingNotificationManager } from './components/FloatingNotificationManager';
import { IdleDetector } from './components/IdleDetector';
import { EasterEggManager } from './components/EasterEggManager';
import { PageLoadAnimation } from './components/PageLoadAnimation';
import { PanicModeOverlay } from './components/PanicModeOverlay';
import { SpinningModal } from './components/hostile/SpinningModal';
import { PanicCore3D } from './components/3d/PanicCore3D';

import { INITIAL_COINS, INITIAL_ORDER_BOOK, INITIAL_PORTFOLIO } from './utils/mockData';
import type { ChaosSettings, NotificationItem, CoinData } from './types';
import { sound } from './utils/soundEngine';
import { Cpu, Sparkles } from 'lucide-react';

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPanicMode, setIsPanicMode] = useState(false);
  const [panicLevel, setPanicLevel] = useState(73);
  const [coins, setCoins] = useState<CoinData[]>(INITIAL_COINS);
  const [selectedCoin, setSelectedCoin] = useState<CoinData>(INITIAL_COINS[0]);
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [escapedCount] = useState(12);
  const [clickCount, setClickCount] = useState(0);

  const [settings, setSettings] = useState<ChaosSettings>({
    buttonResistance: 65,
    marketDrama: 80,
    uiConfusion: 90,
    chartAnxiety: 75,
    notificationAggression: 50,
    sarcasm: 95,
    animationChaos: 70,
    soundAnnoyance: 40,
    tooltipVerbosity: 85,
    userRegret: 73,
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [aiQuote, setAiQuote] = useState<string | null>(null);
  const [cinematicModal, setCinematicModal] = useState<{ isOpen: boolean; title: string }>({
    isOpen: false,
    title: '',
  });

  // Simulated ticking market prices
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins((prevCoins) =>
        prevCoins.map((c) => {
          const deltaPercent = (Math.random() - 0.48) * 0.8;
          const newPrice = Math.max(0.00001, c.price * (1 + deltaPercent / 100));
          return {
            ...c,
            price: newPrice,
            change24h: c.change24h + deltaPercent * 0.1,
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Update selected coin price when ticker ticks
  useEffect(() => {
    const updated = coins.find((c) => c.id === selectedCoin.id);
    if (updated) setSelectedCoin(updated);
  }, [coins, selectedCoin.id]);

  const addNotification = (
    title: string,
    message: string,
    type: NotificationItem['type'] = 'info'
  ) => {
    sound.playHover();
    const directions: NotificationItem['direction'][] = ['top', 'bottom', 'left', 'right', 'diagonal'];
    const dir = directions[Math.floor(Math.random() * directions.length)];
    const newItem: NotificationItem = {
      id: Math.random().toString(),
      title,
      message,
      type,
      direction: dir,
      timestamp: new Date().toLocaleTimeString(),
    };

    setNotifications((prev) => [newItem, ...prev.slice(0, 3)]);
  };

  const handleDismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleTogglePanicMode = () => {
    sound.playBoom();
    const nextState = !isPanicMode;
    setIsPanicMode(nextState);
    if (nextState) {
      setPanicLevel(100);
      setAiQuote('You asked for this. Deploying emotional support subroutines...');
      addNotification('PANIC MODE ACTIVATED', 'Everything is red. Relax, it is simulated.', 'panic');
    } else {
      setPanicLevel(73);
      setAiQuote('Panic Mode deactivated. You survived.');
      addNotification('PANIC MODE EXITED', 'Stability restored... sort of.', 'info');
    }
  };

  const handleTriggerCinematic = (routeName: string) => {
    setCinematicModal({ isOpen: true, title: `TRANSITION TO ${routeName.toUpperCase()}` });
    setAiQuote(`You could have just opened the ${routeName} page.`);
  };

  const handleGlobalClick = () => {
    setClickCount((prev) => prev + 1);
  };

  return (
    <div
      onClick={handleGlobalClick}
      className={`min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-black relative overflow-x-hidden ${
        isPanicMode ? 'micro-jitter' : ''
      }`}
    >
      {/* 1. Page Load Animation */}
      {!isLoaded && <PageLoadAnimation onComplete={() => setIsLoaded(true)} />}

      {/* 2. Panic Mode Overlay */}
      <PanicModeOverlay isPanicMode={isPanicMode} onExitPanicMode={handleTogglePanicMode} />

      {/* 3. Floating Notification Manager */}
      <FloatingNotificationManager
        notifications={notifications}
        onDismiss={handleDismissNotification}
      />

      {/* 4. Idle Detector */}
      <IdleDetector onIdleTrigger={(msg) => setAiQuote(msg)} />

      {/* 5. Easter Egg Manager */}
      <EasterEggManager
        onUnlockEgg={(title, msg) => {
          addNotification(title, msg, 'ai');
          setAiQuote(msg);
        }}
      />

      {/* 6. Main Terminal Header */}
      <PanicHeader
        onOpenSettings={() => {
          sound.playPopupOpen();
          setIsSettingsOpen(true);
        }}
        onTogglePanicMode={handleTogglePanicMode}
        isPanicMode={isPanicMode}
        panicLevel={panicLevel}
        onLogoClick={() => {
          sound.playClick();
          setAiQuote('Please stop clicking the logo. This is becoming a pattern.');
          addNotification('EASTER EGG #2', 'You clicked the PANICX logo.', 'info');
        }}
      />

      {/* Simulated Demo Mode Banner */}
      <div className="w-full bg-cyan-950/80 border-b border-cyan-500/30 py-1 px-4 text-center text-xs font-mono text-cyan-300 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>SIMULATED / DEMO TRADING TERMINAL — NO REAL-MONEY FUNCTIONALITY</span>
      </div>

      <main className="max-w-7xl mx-auto px-4 pb-16 space-y-8">
        {/* Hero Section */}
        <HeroSection
          onTriggerToast={(title, msg, type) => addNotification(title, msg, type)}
          onCoinClick={() => {
            addNotification('EASTER EGG #5', 'You found the expensive button.', 'info');
            setAiQuote('You clicked the 3D coin. Was it satisfying?');
          }}
        />

        {/* Cursed Navigation Bar */}
        <CursedNavigation
          activeRoute={activeRoute}
          onNavigate={(route) => setActiveRoute(route)}
          onTriggerCinematic={handleTriggerCinematic}
        />

        {/* Core Widgets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Market Dashboard (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <MarketDashboard
              coins={coins}
              selectedCoin={selectedCoin}
              onSelectCoin={(c) => setSelectedCoin(c)}
              onWhyClick={() => {
                addNotification('EASTER EGG #7', 'Exactly. Why indeed.', 'info');
                setAiQuote('You clicked WHY. That is the ultimate question.');
              }}
            />

            {/* Simulated Order Book & Portfolio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <OrderBookNightmare entries={INITIAL_ORDER_BOOK} />
              <PortfolioFromHell holdings={INITIAL_PORTFOLIO} />
            </div>
          </div>

          {/* Right Sidebar Controls & Panic Core (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* 3D Panic Core Reactor Card */}
            <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 space-y-3 flex flex-col items-center justify-center text-center">
              <div className="flex items-center justify-between w-full text-xs font-mono text-cyan-400 border-b border-cyan-500/20 pb-2">
                <span>THE PANIC CORE 3D</span>
                <span className="text-pink-400 font-bold">
                  {isPanicMode ? 'ACCELERATED' : 'ACTIVE'}
                </span>
              </div>
              <div className="w-full h-64">
                <PanicCore3D panicLevel={panicLevel} isPanicMode={isPanicMode} />
              </div>
              <p className="text-xs font-mono text-slate-400 italic">
                "Continuously rotating cryptographic reactor."
              </p>
            </div>

            {/* Panic Meter */}
            <PanicMeter
              panicLevel={panicLevel}
              onPanicChange={(val) => setPanicLevel(val)}
            />

            {/* Crypto Weather */}
            <CryptoWeather />

            {/* Fake Interface Statistics */}
            <FakeStats escapedCount={escapedCount} clickCount={clickCount} />
          </div>
        </div>
      </main>

      {/* Judgmental Panic AI */}
      <PanicAI lastActionMessage={aiQuote} />

      {/* Settings From Hell Modal */}
      <ChaosSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(newSettings) => setSettings(newSettings)}
        onSarcasmTrigger={(msg) => setAiQuote(msg)}
      />

      {/* Cinematic Transition Modal */}
      <SpinningModal
        isOpen={cinematicModal.isOpen}
        onClose={() => setCinematicModal({ isOpen: false, title: '' })}
        title={cinematicModal.title}
      >
        <div className="text-center py-6 space-y-4 font-mono">
          <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-400 text-cyan-400">
            <Cpu className="w-8 h-8 animate-spin" />
          </div>
          <p className="text-sm text-slate-200">
            Executing unnecessary cinematic camera sweep...
          </p>
          <div className="text-xs text-cyan-400 italic">
            "You could have just opened the page."
          </div>
          <button
            onClick={() => setCinematicModal({ isOpen: false, title: '' })}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs cursor-pointer shadow-lg hover:scale-105 transition-all"
          >
            [ Complete Transition ]
          </button>
        </div>
      </SpinningModal>

      {/* Footer */}
      <footer className="w-full border-t border-slate-900 bg-slate-950/90 py-8 px-4 text-center text-xs font-mono text-slate-400 space-y-2">
        <div className="flex items-center justify-center gap-2 font-bold text-slate-300">
          <span>YOU SURVIVED PANICX.</span>
          <span className="text-cyan-400 italic">"Barely."</span>
        </div>
        <p>PANICX Simulated Cryptocurrency Trading Terminal • Intentionally Horrible UX Showcase</p>
      </footer>
    </div>
  );
}
