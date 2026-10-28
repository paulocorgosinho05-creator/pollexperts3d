import React from 'react';
import { X, Sparkles, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CueViewer3D } from './3d/CueViewer3D';
import { KnifeViewer3D } from './3d/KnifeViewer3D';
import { CueStick, CS2Skin } from '../types';

interface Modal3DViewerProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'cue' | 'skin';
  cueData?: CueStick;
  skinData?: CS2Skin;
  onAddToCart: () => void;
}

export const Modal3DViewer: React.FC<Modal3DViewerProps> = ({
  isOpen,
  onClose,
  type,
  cueData,
  skinData,
  onAddToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md">
      <div className="bg-obsidian-900 border border-amberGold-500/30 rounded-3xl max-w-4xl w-full text-white shadow-2xl overflow-hidden flex flex-col font-sans">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-obsidian-950">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amberGold-500/10 flex items-center justify-center text-amberGold-400 font-mono font-bold text-xs">
              3D
            </div>
            <div>
              <h3 className="font-mono font-bold text-sm text-white">
                {type === 'cue' ? cueData?.name || 'Taco de Sinuca 3D' : `${skinData?.weapon} | ${skinData?.skinName}`}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {type === 'cue' ? 'Renderizador Fotorrealista PBR 360°' : 'Inspeção Source 2 Shaders em Tempo Real'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3D Viewport */}
        <div className="p-4 sm:p-6 bg-obsidian-950">
          {type === 'cue' ? (
            <CueViewer3D
              cueName={cueData?.name}
              engravingText="GOKU #08/50"
              woodType={cueData?.specs.shaftWood}
              tipSize={cueData?.specs.tipDiameter}
            />
          ) : skinData ? (
            <KnifeViewer3D skin={skinData} />
          ) : null}
        </div>

        {/* Action Bar */}
        <div className="px-6 py-4 border-t border-white/10 bg-obsidian-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Preço Oficial:</span>
            <span className="text-xl font-bold text-amberGold-400">
              R$ {(type === 'cue' ? cueData?.price || 0 : skinData?.price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onAddToCart();
                onClose();
              }}
              className="flex-1 sm:flex-none py-2.5 px-6 rounded-xl bg-amberGold-500 hover:bg-amberGold-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-glow-gold flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Adicionar ao Carrinho</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
