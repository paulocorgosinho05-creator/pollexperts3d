import React, { useState } from 'react';
import { X, Sparkles, Wand2, Check, Music, Shield, Play, Pause, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CUE_STICKS, CS2_SKINS, AUDIO_TRACKS } from '../data/mockData';
import { CueViewer3D } from './3d/CueViewer3D';
import { audioSynth } from '../utils/audioSynth';
import { CartItem } from '../types';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddComboToCart: (comboItem: CartItem) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  onAddComboToCart
}) => {
  const [selectedCueId, setSelectedCueId] = useState(CUE_STICKS[0].id);
  const [engravingText, setEngravingText] = useState('FALLEN_#1');
  const [selectedWeight, setSelectedWeight] = useState('19.2 oz Ajustável');
  const [selectedTip, setSelectedTip] = useState('11.0 mm (Padrão)');
  const [selectedSkinId, setSelectedSkinId] = useState(CS2_SKINS[0].id);
  const [selectedTrackId, setSelectedTrackId] = useState(AUDIO_TRACKS[0].id);
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'cue' | 'laser' | 'skin' | 'sound'>('cue');

  if (!isOpen) return null;

  const currentCue = CUE_STICKS.find(c => c.id === selectedCueId) || CUE_STICKS[0];
  const currentSkin = CS2_SKINS.find(s => s.id === selectedSkinId) || CS2_SKINS[0];
  const currentTrack = AUDIO_TRACKS.find(t => t.id === selectedTrackId) || AUDIO_TRACKS[0];

  // Pricing math: 15% discount for Combo Supremo
  const baseTotal = currentCue.price + currentSkin.price + currentTrack.price;
  const comboDiscount = baseTotal * 0.15;
  const bundlePrice = baseTotal - comboDiscount;

  const handleToggleAudio = (preset: 'cyberpunk' | 'lofi' | 'heavy' | 'trap') => {
    if (previewPlaying) {
      audioSynth.pause();
      setPreviewPlaying(false);
    } else {
      audioSynth.play(preset);
      setPreviewPlaying(true);
    }
  };

  const handleFinishCombo = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });

    const comboCartItem: CartItem = {
      cartId: `combo-${Date.now()}`,
      id: `combo-custom`,
      type: 'combo',
      name: `COMBO SUPREMO 3D: ${currentCue.name}`,
      subtitle: `Laser: "${engravingText || 'Sem laser'}" + ${currentSkin.weapon} | ${currentSkin.skinName} + Hino: ${currentTrack.title.split('•')[0]}`,
      price: bundlePrice,
      image: currentCue.image,
      quantity: 1,
      details: {
        engraving: engravingText,
        weight: selectedWeight,
        tip: selectedTip,
        skin: `${currentSkin.weapon} | ${currentSkin.skinName}`,
        track: currentTrack.title
      }
    };

    onAddComboToCart(comboCartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-obsidian-900 border border-amberGold-500/30 rounded-3xl max-w-6xl w-full text-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-obsidian-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amberGold-500 text-black flex items-center justify-center font-mono font-black shadow-glow-gold">
              3D
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-amberGold-400 font-bold tracking-widest block">
                ESTÚDIO CRIATIVO POLLEXPERTS
              </span>
              <h2 className="text-lg font-mono font-black text-white flex items-center gap-2">
                Crie seu <span className="amber-gradient-text">Combo Supremo</span> em 3D
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split 2 columns */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
          {/* Left Column: Configurator Steps */}
          <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-white/10 space-y-6">
            {/* Step navigation tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-obsidian-950 rounded-xl border border-white/5 font-mono text-xs">
              <button
                onClick={() => setActiveTab('cue')}
                className={`py-2 px-2 text-center rounded-lg transition-colors truncate ${
                  activeTab === 'cue' ? 'bg-amberGold-500 text-black font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                1. Taco
              </button>
              <button
                onClick={() => setActiveTab('laser')}
                className={`py-2 px-2 text-center rounded-lg transition-colors truncate ${
                  activeTab === 'laser' ? 'bg-amberGold-500 text-black font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                2. Laser
              </button>
              <button
                onClick={() => setActiveTab('skin')}
                className={`py-2 px-2 text-center rounded-lg transition-colors truncate ${
                  activeTab === 'skin' ? 'bg-cyan-500 text-black font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                3. Skin CS2
              </button>
              <button
                onClick={() => setActiveTab('sound')}
                className={`py-2 px-2 text-center rounded-lg transition-colors truncate ${
                  activeTab === 'sound' ? 'bg-fuchsia-600 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                4. Hino
              </button>
            </div>

            {/* Content according to tab */}
            {activeTab === 'cue' && (
              <div className="space-y-4">
                <h3 className="font-mono font-bold text-sm text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amberGold-500"></span>
                  Selecione o Modelo Base do Taco
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  {CUE_STICKS.map(cue => (
                    <div
                      key={cue.id}
                      onClick={() => setSelectedCueId(cue.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedCueId === cue.id
                          ? 'bg-amberGold-500/10 border-amberGold-400 shadow-glow-gold'
                          : 'bg-obsidian-850 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-white text-xs">{cue.name}</span>
                        {selectedCueId === cue.id && (
                          <span className="w-5 h-5 rounded-full bg-amberGold-500 text-black flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mb-2">{cue.series}</p>
                      <span className="text-amberGold-400 font-bold block text-sm">
                        R$ {cue.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/5 space-y-3 font-mono text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1.5 text-[11px]">Peso Desejado:</label>
                    <div className="flex flex-wrap gap-2">
                      {['18.5 oz', '19.0 oz', '19.2 oz Ajustável', '19.5 oz', '20.0 oz'].map(w => (
                        <button
                          key={w}
                          onClick={() => setSelectedWeight(w)}
                          className={`px-3 py-1.5 rounded-lg border text-[11px] transition-colors ${
                            selectedWeight === w
                              ? 'bg-white text-black font-bold border-white'
                              : 'bg-obsidian-850 text-slate-400 border-white/10 hover:text-white'
                          }`}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1.5 text-[11px]">Diâmetro da Ponteira:</label>
                    <div className="flex flex-wrap gap-2">
                      {['10.5 mm', '11.0 mm (Padrão)', '11.5 mm', '12.0 mm'].map(t => (
                        <button
                          key={t}
                          onClick={() => setSelectedTip(t)}
                          className={`px-3 py-1.5 rounded-lg border text-[11px] transition-colors ${
                            selectedTip === t
                              ? 'bg-white text-black font-bold border-white'
                              : 'bg-obsidian-850 text-slate-400 border-white/10 hover:text-white'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'laser' && (
              <div className="space-y-4">
                <h3 className="font-mono font-bold text-sm text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Personalização a Laser na Madeira
                </h3>
                <p className="text-xs text-slate-400">
                  Grave seu nickname gamer, assinatura ou número de série favorito diretamente no corpo do taco com precisão de mícron.
                </p>
                <div className="p-4 rounded-xl bg-obsidian-850 border border-white/10 space-y-3 font-mono">
                  <label className="text-xs text-slate-300 block">Texto da Gravação (máx. 18 caracteres):</label>
                  <input
                    type="text"
                    maxLength={18}
                    value={engravingText}
                    onChange={e => setEngravingText(e.target.value.toUpperCase())}
                    placeholder="EX: FALLEN_#1"
                    className="w-full bg-obsidian-950 border border-amberGold-500/50 px-4 py-2.5 rounded-xl text-amberGold-400 font-bold tracking-widest text-sm focus:outline-none focus:border-amberGold-400"
                  />
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Prévia em tempo real renderizada no 3D ao lado</span>
                    <span>{engravingText.length}/18 caracteres</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skin' && (
              <div className="space-y-4">
                <h3 className="font-mono font-bold text-sm text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  Vincular Skin CS2 de Alta Patente
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  {CS2_SKINS.map(skin => (
                    <div
                      key={skin.id}
                      onClick={() => setSelectedSkinId(skin.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        selectedSkinId === skin.id
                          ? 'bg-cyan-950/30 border-cyan-400 shadow-glow-cyan'
                          : 'bg-obsidian-850 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-white text-xs">{skin.weapon}</span>
                          {selectedSkinId === skin.id && (
                            <span className="w-5 h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center text-[10px] font-bold">
                              ✓
                            </span>
                          )}
                        </div>
                        <p className="text-cyan-300 font-bold text-[11px]">{skin.skinName}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{skin.wear} • Float {skin.float}</p>
                      </div>
                      <span className="text-white font-bold text-xs mt-3 block">
                        R$ {skin.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'sound' && (
              <div className="space-y-4">
                <h3 className="font-mono font-bold text-sm text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-fuchsia-500"></span>
                  Selecione o Hino MVP do Combo
                </h3>
                <div className="space-y-2.5 font-mono text-xs">
                  {AUDIO_TRACKS.map(track => (
                    <div
                      key={track.id}
                      onClick={() => setSelectedTrackId(track.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        selectedTrackId === track.id
                          ? 'bg-fuchsia-950/30 border-fuchsia-400 shadow-glow-purple'
                          : 'bg-obsidian-850 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTrackId(track.id);
                            handleToggleAudio(track.synthPreset);
                          }}
                          className="w-8 h-8 rounded-lg bg-fuchsia-500/20 text-fuchsia-300 flex items-center justify-center text-xs hover:bg-fuchsia-500 hover:text-black transition-colors"
                        >
                          {previewPlaying && selectedTrackId === track.id ? (
                            <Pause className="w-3.5 h-3.5" />
                          ) : (
                            <Play className="w-3.5 h-3.5 ml-0.5" />
                          )}
                        </button>
                        <div>
                          <p className="font-bold text-white text-xs">{track.title}</p>
                          <p className="text-[10px] text-slate-400">{track.style} • BPM {track.bpm}</p>
                        </div>
                      </div>
                      <span className="text-amberGold-400 font-bold text-xs">
                        R$ {track.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: 3D Realtime Preview & Checkout Summary */}
          <div className="lg:col-span-5 p-6 bg-obsidian-950 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase text-slate-400 block mb-2">
                Simulação 3D em Tempo Real
              </span>
              <div className="h-[280px] w-full rounded-2xl overflow-hidden border border-white/10 relative">
                <CueViewer3D
                  cueName={currentCue.name}
                  engravingText={engravingText}
                  woodType={currentCue.specs.shaftWood}
                  tipSize={selectedTip}
                />
              </div>

              {/* Combo Summary Card */}
              <div className="mt-4 p-4 rounded-xl bg-obsidian-900 border border-white/10 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="truncate">{currentCue.name}</span>
                  <span className="text-white">R$ {currentCue.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="truncate">{currentSkin.weapon} | {currentSkin.skinName}</span>
                  <span className="text-white">R$ {currentSkin.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="truncate">{currentTrack.title.split('•')[0]}</span>
                  <span className="text-white">R$ {currentTrack.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex items-center justify-between text-emerald-400 pt-2 border-t border-white/10">
                  <span>Desconto Combo Supremo (15% OFF)</span>
                  <span>- R$ {comboDiscount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex items-center justify-between text-white font-extrabold text-sm pt-1">
                  <span>Preço Total do Combo</span>
                  <span className="text-amberGold-400 text-base">
                    R$ {bundlePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
              <button
                onClick={handleFinishCombo}
                className="w-full py-3.5 px-4 rounded-xl bg-amberGold-500 hover:bg-amberGold-400 text-black font-mono font-black text-xs uppercase tracking-wider transition-all shadow-glow-gold flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Adicionar Combo ao Carrinho (15% OFF)</span>
              </button>
              <p className="text-[10px] text-slate-400 text-center font-mono">
                Produção artesanal sob demanda com certificado digital de autenticidade 3D
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
