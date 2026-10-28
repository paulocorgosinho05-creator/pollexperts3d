import React, { useState, useEffect } from 'react';
import { Headphones, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, Sparkles } from 'lucide-react';
import { AUDIO_TRACKS } from '../data/mockData';
import { audioSynth } from '../utils/audioSynth';
import { AudioTrack, WishlistItem } from '../types';

interface AudioSectionProps {
  onCustomAudioHire: () => void;
  onAddToCart: (track: AudioTrack) => void;
  isWishlisted: (id: string) => boolean;
  onToggleWishlist: (item: WishlistItem) => void;
}

export const AudioSection: React.FC<AudioSectionProps> = ({
  onCustomAudioHire,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressSec, setProgressSec] = useState(74);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [freqBars, setFreqBars] = useState<number[]>([12, 20, 32, 18, 28, 36, 14, 22, 38, 26, 18, 30, 24, 16, 28, 12]);

  const currentTrack = AUDIO_TRACKS[currentTrackIndex];
  const isCurrentWishlisted = isWishlisted(currentTrack.id);

  useEffect(() => {
    let timer: number;
    if (isPlaying) {
      timer = window.setInterval(() => {
        const bars = audioSynth.getFrequencyBars();
        setFreqBars(bars);
        setProgressSec(prev => (prev + 1) % currentTrack.durationSec);
      }, 250);
    } else {
      setFreqBars([8, 12, 16, 10, 14, 20, 12, 16, 22, 14, 10, 16, 12, 8, 14, 8]);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentTrack.durationSec]);

  const togglePlay = () => {
    if (isPlaying) {
      audioSynth.pause();
      setIsPlaying(false);
    } else {
      audioSynth.play(currentTrack.synthPreset);
      setIsPlaying(true);
    }
  };

  const handleSelectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    const newTrack = AUDIO_TRACKS[index];
    audioSynth.play(newTrack.synthPreset);
    setIsPlaying(true);
    setProgressSec(0);
  };

  const handleNext = () => {
    const nextIdx = (currentTrackIndex + 1) % AUDIO_TRACKS.length;
    handleSelectTrack(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentTrackIndex - 1 + AUDIO_TRACKS.length) % AUDIO_TRACKS.length;
    handleSelectTrack(prevIdx);
  };

  const handleVolumeChange = (v: number) => {
    setVolume(v);
    setIsMuted(v === 0);
    audioSynth.setVolume(v);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      audioSynth.setVolume(volume || 0.8);
    } else {
      setIsMuted(true);
      audioSynth.setVolume(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleToggleCurrentTrack = () => {
    onToggleWishlist({
      id: currentTrack.id,
      type: 'audio',
      name: currentTrack.title,
      subtitle: `${currentTrack.subtitle} • BPM ${currentTrack.bpm} • ${currentTrack.key}`,
      price: currentTrack.price,
      badge: 'Music Kit'
    });
  };

  return (
    <section
      className="py-20 lg:py-28 relative bg-obsidian-900/40 border-b border-white/5"
      data-purpose="profile-audio-pillar"
      id="musicas"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Meta Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-fuchsia-400 font-mono text-xs font-semibold tracking-wider uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-fuchsia-500"></span> PILAR 03 • AUDIÓFILO GAMER &amp; PROFILE ANTHEMS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-sans">
              Músicas de Perfil{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-amberGold-400">
                &amp; Music Kits
              </span>
            </h2>
            <p className="mt-2 text-slate-400 max-w-xl text-sm sm:text-base font-sans">
              Identidade sonora única para o seu perfil no Steam, canais Discord e introduções de stream. Hinos de MVP customizados com masterização binaural e visualizadores dinâmicos.
            </p>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-obsidian-850 border border-white/10 text-slate-300 font-mono text-xs flex items-center">
            <Headphones className="w-4 h-4 text-fuchsia-400 mr-1.5" />
            <span>Áudio lossless 24-bit / 96kHz</span>
          </span>
        </div>

        {/* Interactive Audio Center Component */}
        <div
          className="rounded-3xl bg-gradient-to-br from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-fuchsia-500/20 p-6 sm:p-10 shadow-2xl relative overflow-hidden"
          data-purpose="music-player-showcase"
        >
          {/* Glowing Backdrop */}
          <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Holographic Waveform & Playing Info */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-fuchsia-500/20 border border-fuchsia-500/40 text-fuchsia-300 font-mono text-[11px] font-bold tracking-widest uppercase">
                    EM REPRODUÇÃO NO PROFILE
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    BPM: {currentTrack.bpm} • KEY: {currentTrack.key}
                  </span>
                </div>

                {/* Heart Button for Active Deck */}
                <button
                  onClick={handleToggleCurrentTrack}
                  aria-label="Salvar Hino nos Favoritos"
                  className={`p-2 rounded-xl border backdrop-blur transition-all cursor-pointer flex items-center gap-1.5 ${
                    isCurrentWishlisted
                      ? 'bg-rose-500/20 border-rose-500 text-rose-400 shadow-glow-purple'
                      : 'bg-obsidian-900 border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-400/40'
                  }`}
                  title={isCurrentWishlisted ? 'Remover dos Favoritos' : 'Salvar nos Favoritos'}
                >
                  <Heart className={`w-4 h-4 ${isCurrentWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span className="text-[11px] font-mono hidden sm:inline">
                    {isCurrentWishlisted ? 'Favoritado' : 'Salvar'}
                  </span>
                </button>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-mono leading-tight">
                {currentTrack.title}
              </h3>
              <p className="text-sm text-slate-400 mt-2 font-sans">
                {currentTrack.subtitle}. Inclui stingers de início de round, contagem regressiva de bomba e hino triunfal de clutch 1v5.
              </p>

              {/* Holographic Animated Sound Frequency Waves */}
              <div className="mt-8 p-6 rounded-2xl bg-black/60 border border-white/10 flex flex-col gap-4">
                <div className="flex items-end justify-between h-14 px-2 gap-1.5 sm:gap-2">
                  {freqBars.map((height, i) => {
                    const colors = [
                      'bg-fuchsia-500',
                      'bg-fuchsia-400',
                      'bg-pink-400',
                      'bg-amberGold-400',
                      'bg-cyan-400',
                      'bg-fuchsia-400',
                      'bg-pink-500',
                      'bg-amberGold-500',
                      'bg-cyan-300',
                      'bg-fuchsia-500',
                      'bg-pink-400',
                      'bg-amberGold-400',
                      'bg-fuchsia-400',
                      'bg-cyan-400',
                      'bg-fuchsia-600',
                      'bg-pink-500'
                    ];
                    return (
                      <div
                        key={i}
                        className={`w-1.5 sm:w-2 rounded-full transition-all duration-150 ${colors[i % colors.length]}`}
                        style={{ height: `${height}px` }}
                      />
                    );
                  })}
                </div>

                {/* Seek Bar */}
                <div className="space-y-1.5">
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const ratio = (e.clientX - rect.left) / rect.width;
                      setProgressSec(Math.floor(ratio * currentTrack.durationSec));
                    }}
                    className="w-full bg-white/10 h-2 rounded-full overflow-hidden cursor-pointer relative"
                  >
                    <div
                      className="bg-gradient-to-r from-fuchsia-500 to-amberGold-400 h-full rounded-full transition-all"
                      style={{ width: `${(progressSec / currentTrack.durationSec) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>{formatTime(progressSec)}</span>
                    <span>{currentTrack.duration}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handlePrev}
                      aria-label="Anterior"
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                      type="button"
                    >
                      <SkipBack className="w-5 h-5" />
                    </button>
                    <button
                      onClick={togglePlay}
                      aria-label="Tocar ou Pausar"
                      className="w-11 h-11 rounded-full bg-fuchsia-500 hover:bg-fuchsia-400 text-white flex items-center justify-center transition-all shadow-glow-purple cursor-pointer active:scale-95"
                      type="button"
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Próxima"
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                      type="button"
                    >
                      <SkipForward className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300 font-mono text-xs">
                    <button onClick={toggleMute} className="text-fuchsia-400 hover:text-fuchsia-300">
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={e => handleVolumeChange(parseFloat(e.target.value))}
                      className="w-20 accent-fuchsia-500 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer hidden sm:inline"
                    />
                    <span className="hidden sm:inline">100% STEREO MASTER</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Audio Playlist / Custom Order List */}
            <div className="lg:col-span-5 flex flex-col gap-3 font-mono">
              <h4 className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">
                Catálogo de Hinos Populares
              </h4>

              {AUDIO_TRACKS.map((track, idx) => {
                const isSelected = idx === currentTrackIndex;
                const trackWishlisted = isWishlisted(track.id);

                return (
                  <div
                    key={track.id}
                    onClick={() => handleSelectTrack(idx)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-obsidian-900 border-fuchsia-500/50 shadow-glow-purple'
                        : 'bg-obsidian-900 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${
                          isSelected ? 'bg-fuchsia-500 text-white' : 'bg-fuchsia-500/20 text-fuchsia-400'
                        }`}
                      >
                        {isSelected && isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{track.title}</p>
                        <p className="text-[10px] text-slate-400">{track.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist({
                            id: track.id,
                            type: 'audio',
                            name: track.title,
                            subtitle: `${track.subtitle} • BPM ${track.bpm}`,
                            price: track.price,
                            badge: 'Music Kit'
                          });
                        }}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          trackWishlisted
                            ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                            : 'bg-white/5 border-white/5 text-slate-400 hover:text-rose-400'
                        }`}
                        title={trackWishlisted ? 'Remover dos Favoritos' : 'Salvar nos Favoritos'}
                      >
                        <Heart className={`w-3.5 h-3.5 ${trackWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>

                      <span className="text-xs text-amberGold-400 font-bold min-w-16 text-right">
                        R$ {track.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Custom Anthem Composer Banner */}
              <div className="mt-2 p-4 rounded-xl bg-gradient-to-r from-fuchsia-950/40 to-amber-950/40 border border-amberGold-500/20 text-center">
                <p className="text-xs font-bold text-white mb-1">Quer um Hino 100% Exclusivo?</p>
                <p className="text-[11px] text-slate-300 font-sans mb-3">
                  Produzimos a sua trilha sonora oficial para canais, streams e perfil gamer.
                </p>
                <button
                  onClick={onCustomAudioHire}
                  className="inline-block py-2 px-4 rounded-lg bg-amberGold-500 hover:bg-amberGold-400 text-black text-xs font-bold tracking-wide transition-colors cursor-pointer"
                  type="button"
                >
                  Contratar Produção de Áudio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
