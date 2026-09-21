import React, { useState, useRef } from 'react';
import { DEFAULT_CONFIG } from './config/defaultConfig';
import { magicalAudio } from './engines/audioEngine';
import BackgroundParticles from './components/BackgroundParticles';
import TopNav from './components/TopNav';
import JourneyDots from './components/JourneyDots';
import ConfigDrawer from './components/ConfigDrawer';
import MemoryModal from './components/MemoryModal';
import AppreciationModal from './components/AppreciationModal';

import Screen0Landing from './screens/Screen0Landing';
import Screen1Invitation from './screens/Screen1Invitation';
import Screen2Reveal from './screens/Screen2Reveal';
import Screen3Memories from './screens/Screen3Memories';
import Screen4Appreciation from './screens/Screen4Appreciation';
import Screen5Letter from './screens/Screen5Letter';
import Screen6Wishes from './screens/Screen6Wishes';
import Screen7Chamber from './screens/Screen7Chamber';
import Screen8Finale from './screens/Screen8Finale';

export default function App() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [currentLayer, setCurrentLayer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [selectedAppreciation, setSelectedAppreciation] = useState(null);

  const particlesRef = useRef(null);

  const goToLayer = (targetIndex, e = null) => {
    if (targetIndex < 0 || targetIndex > 8) return;
    setCurrentLayer(targetIndex);

    // Layer-specific triggers
    if (targetIndex === 1) {
      magicalAudio.startMusic();
    } else if (targetIndex === 2) {
      magicalAudio.playChime();
      particlesRef.current?.burstConfetti(window.innerWidth / 2, window.innerHeight / 3, 65);
      particlesRef.current?.burstSparks(window.innerWidth / 2, window.innerHeight / 2, 40, 'gold');
    } else if (targetIndex === 8) {
      particlesRef.current?.burstSparks(window.innerWidth / 2, window.innerHeight / 3, 40, 'magic');
    }
  };

  const handleToggleAudio = () => {
    const muted = magicalAudio.toggleMute();
    setIsMuted(muted);
  };

  const handleSaveConfig = (newSettings) => {
    setConfig((prev) => ({
      ...prev,
      friendName: newSettings.friendName,
      yourName: newSettings.yourName,
      audio: {
        ...prev.audio,
        customMusicUrl: newSettings.customMusicUrl
      }
    }));
    setIsConfigOpen(false);
    magicalAudio.init(newSettings.customMusicUrl);
    magicalAudio.playChime();
    particlesRef.current?.burstSparks(window.innerWidth - 80, 60, 25, 'gold');
  };

  return (
    <div className="app-container">
      {/* Background Particle & Wand Trail Canvas */}
      <BackgroundParticles ref={particlesRef} />

      {/* Top Magical Header & Navigation */}
      <TopNav
        currentLayer={currentLayer}
        onNavigate={(target, e) => {
          magicalAudio.init();
          magicalAudio.startMusic();
          magicalAudio.playChime();
          goToLayer(target, e);
        }}
        isMuted={isMuted}
        onToggleAudio={handleToggleAudio}
        onOpenConfig={() => setIsConfigOpen((prev) => !prev)}
      />

      {/* Progress Dots Indicator */}
      <JourneyDots
        currentLayer={currentLayer}
        onNavigate={(target, e) => {
          magicalAudio.init();
          magicalAudio.playChime();
          goToLayer(target, e);
        }}
      />

      {/* Main Journey Layers Container */}
      <main id="layer-container">
        {/* Screen 0: Landing */}
        <Screen0Landing
          isActive={currentLayer === 0}
          config={config}
          onEnterMagic={(e) => {
            magicalAudio.init();
            magicalAudio.startMusic();
            magicalAudio.playWandSpark();
            particlesRef.current?.burstSparks(
              e?.clientX || window.innerWidth / 2,
              e?.clientY || window.innerHeight / 2,
              45,
              'gold'
            );
            goToLayer(1, e);
          }}
          onSignpostClick={(e) => {
            magicalAudio.playChime();
            particlesRef.current?.burstSparks(e.clientX, e.clientY, 18, 'gold');
          }}
        />

        {/* Screen 1: Invitation Letter */}
        <Screen1Invitation
          isActive={currentLayer === 1}
          config={config}
          onOpenLetter={(e) => {
            magicalAudio.playSealStamp();
            particlesRef.current?.burstSparks(e.clientX, e.clientY, 40, 'gold');
            setTimeout(() => {
              magicalAudio.playChime();
              goToLayer(2, e);
            }, 400);
          }}
        />

        {/* Screen 2: Birthday Reveal */}
        <Screen2Reveal
          isActive={currentLayer === 2}
          config={config}
          onBlowCandle={(e) => {
            magicalAudio.playBlowCandle();
            particlesRef.current?.burstSparks(
              e?.clientX || window.innerWidth / 2,
              e?.clientY || window.innerHeight / 2,
              18,
              'fire'
            );
          }}
          onBlowAllCandles={(e) => {
            magicalAudio.playBlowCandle();
            particlesRef.current?.burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 75);
            particlesRef.current?.burstSparks(
              e?.clientX || window.innerWidth / 2,
              e?.clientY || window.innerHeight / 2,
              35,
              'fire'
            );
          }}
          onBeginJourney={(e) => {
            magicalAudio.playPageTurn();
            particlesRef.current?.burstSparks(e.clientX, e.clientY, 30, 'gold');
            goToLayer(3, e);
          }}
        />

        {/* Screen 3: Memories Gallery */}
        <Screen3Memories
          isActive={currentLayer === 3}
          config={config}
          onSelectMemory={(memory, e) => {
            magicalAudio.playChime();
            particlesRef.current?.burstSparks(e.clientX, e.clientY, 20, 'gold');
            setSelectedMemory(memory);
          }}
          onScrollPageTurn={() => magicalAudio.playPageTurn()}
          onNextScreen={(e) => {
            magicalAudio.playPageTurn();
            particlesRef.current?.burstSparks(e.clientX, e.clientY, 30, 'gold');
            goToLayer(4, e);
          }}
        />

        {/* Screen 4: Appreciation Cards */}
        <Screen4Appreciation
          isActive={currentLayer === 4}
          config={config}
          onSelectCard={(card, e) => {
            magicalAudio.playChime();
            particlesRef.current?.burstSparks(e.clientX, e.clientY, 25, 'gold');
            setSelectedAppreciation(card);
          }}
          onNextScreen={(e) => {
            magicalAudio.playPageTurn();
            particlesRef.current?.burstSparks(e.clientX, e.clientY, 30, 'gold');
            goToLayer(5, e);
          }}
        />

        {/* Screen 5: Typewriter Letter */}
        <Screen5Letter
          isActive={currentLayer === 5}
          config={config}
          onWandSpark={() => magicalAudio.playWandSpark()}
          onSealLetter={(e) => {
            magicalAudio.playSealStamp();
            particlesRef.current?.burstSparks(e.clientX, e.clientY, 40, 'gold');
          }}
          onNextScreen={(e) => {
            magicalAudio.playChime();
            particlesRef.current?.burstSparks(e.clientX, e.clientY, 30, 'magic');
            goToLayer(6, e);
          }}
        />

        {/* Screen 6: Wishes Section */}
        <Screen6Wishes
          isActive={currentLayer === 6}
          config={config}
          onWishClick={(item, e) => {
            magicalAudio.playChime();
            particlesRef.current?.burstSparks(e.clientX, e.clientY, 30, 'gold');
          }}
          onNextScreen={(e) => {
            magicalAudio.playDoorUnlock();
            particlesRef.current?.burstSparks(e.clientX, e.clientY, 35, 'gold');
            goToLayer(7, e);
          }}
        />

        {/* Screen 7: Secret Chamber */}
        <Screen7Chamber
          isActive={currentLayer === 7}
          config={config}
          onUnlockChamber={(e) => {
            magicalAudio.playDoorUnlock();
            particlesRef.current?.burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 90);
            particlesRef.current?.burstSparks(window.innerWidth / 2, window.innerHeight / 2, 60, 'magic');
            setTimeout(() => {
              magicalAudio.playChime();
            }, 700);
          }}
          onNextScreen={(e) => {
            magicalAudio.playChime();
            particlesRef.current?.burstSparks(e.clientX, e.clientY, 35, 'gold');
            goToLayer(8, e);
          }}
        />

        {/* Screen 8: Finale */}
        <Screen8Finale
          isActive={currentLayer === 8}
          config={config}
          onReplay={(e) => {
            magicalAudio.playChime();
            particlesRef.current?.burstSparks(e.clientX, e.clientY, 30, 'gold');
            goToLayer(0, e);
          }}
          onReopenLetter={(e) => {
            magicalAudio.playPageTurn();
            particlesRef.current?.burstSparks(e.clientX, e.clientY, 30, 'gold');
            goToLayer(5, e);
          }}
        />
      </main>

      {/* Fullscreen Memory Detail Modal */}
      <MemoryModal
        memory={selectedMemory}
        onClose={() => setSelectedMemory(null)}
      />

      {/* Appreciation Card Detail Modal */}
      <AppreciationModal
        card={selectedAppreciation}
        onClose={() => setSelectedAppreciation(null)}
      />

      {/* Personalization Settings Drawer */}
      <ConfigDrawer
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
      />
    </div>
  );
}
