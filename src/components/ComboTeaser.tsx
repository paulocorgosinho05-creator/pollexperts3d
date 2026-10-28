import React from 'react';
import { Wand2, MessageSquare } from 'lucide-react';

interface ComboTeaserProps {
  onOpenStudio: () => void;
  onOpenArtisan: () => void;
}

export const ComboTeaser: React.FC<ComboTeaserProps> = ({
  onOpenStudio,
  onOpenArtisan
}) => {
  return (
    <section
      className="py-20 bg-obsidian-950 relative border-b border-white/5"
      data-purpose="customizer-callout"
      id="customizador"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-obsidian-850 border border-amberGold-500/30 p-8 sm:p-14 overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-amberGold-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <span className="px-3 py-1 rounded bg-amberGold-500/10 border border-amberGold-500/30 text-amberGold-400 font-mono text-xs font-bold tracking-widest uppercase mb-4 inline-block">
              ESTÚDIO CRIATIVO POLLEXPERTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight font-sans">
              Crie seu <span className="amber-gradient-text">Combo Supremo</span> em 3D
            </h2>
            <p className="text-slate-300 mt-4 text-base leading-relaxed font-sans">
              Monte um kit customizado com seu Taco de Sinuca com gravação a laser do seu nickname, adicione sua skin de faca CS2 favorita e defina a faixa musical que tocará ao acessar sua sala virtual.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center font-mono">
              <button
                onClick={onOpenStudio}
                className="py-3.5 px-8 rounded-xl bg-amberGold-500 hover:bg-amberGold-400 text-black font-extrabold text-sm tracking-wider uppercase transition-all shadow-glow-gold flex items-center gap-2 cursor-pointer"
                type="button"
              >
                <Wand2 className="w-4 h-4" />
                <span>Abrir Estúdio 3D</span>
              </button>
              <button
                onClick={onOpenArtisan}
                className="py-3.5 px-6 rounded-xl bg-obsidian-800 hover:bg-obsidian-750 text-white font-bold text-sm border border-white/10 transition-colors flex items-center gap-2 cursor-pointer"
                type="button"
              >
                <MessageSquare className="w-4 h-4 text-amberGold-400" />
                <span>Falar com um Artesão</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
