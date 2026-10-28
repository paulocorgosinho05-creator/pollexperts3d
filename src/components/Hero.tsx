import React from 'react';
import { ArrowRight, SlidersHorizontal, Disc3, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onOpenCustomizer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCustomizer }) => {
  return (
    <section
      className="relative min-h-[88vh] flex items-center justify-center overflow-hidden py-16 lg:py-24 bg-grid-pattern border-b border-white/5"
      data-purpose="hero-banner"
    >
      {/* Ambient Light Halos */}
      <div className="absolute -top-40 -left-20 w-[550px] h-[550px] bg-amberGold-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-fuchsia-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center z-10">
        {/* Top Badge / Release Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-obsidian-850 border border-amberGold-500/40 shadow-glow-gold mb-6 animate-pulse">
          <span className="text-amberGold-400 text-xs">◆</span>
          <span className="text-xs font-mono font-semibold tracking-wider text-amberGold-300 uppercase">
            NOVA COLEÇÃO 2026 // TECNOLOGIA 3D PBR
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl text-white uppercase leading-[1.08] font-sans">
          POLLEXPERTS 3D — <br className="hidden sm:inline" />
          <span className="amber-gradient-text">ELEVE O SEU JOGO</span> &amp; SEU ESTILO
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl font-normal leading-relaxed font-sans">
          A primeira plataforma de elite fundindo{' '}
          <span className="text-white font-semibold">Tacos Profissionais de Sinuca Sob Medida</span>, o prestigiado{' '}
          <span className="text-white font-semibold">Mercado CS2 High-Tier</span> e{' '}
          <span className="text-white font-semibold">Identidade Sonora com Áudio Kits</span> personalizados para perfis.
        </p>

        {/* Three Pillars Holographic Badges */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full max-w-4xl" data-purpose="three-pillars-badges">
          {/* Pillar 1 Tag */}
          <a
            className="flex items-center justify-center sm:justify-start gap-3 p-3.5 rounded-xl bg-obsidian-900/90 border border-amberGold-500/30 hover:border-amberGold-400 transition-all hover:-translate-y-1 group backdrop-blur"
            href="#tacos"
          >
            <div className="w-10 h-10 rounded-lg bg-amberGold-500/10 flex items-center justify-center text-amberGold-400 group-hover:bg-amberGold-500 group-hover:text-black transition-colors font-mono font-bold text-base">
              8
            </div>
            <div className="text-left font-mono">
              <p className="text-[11px] uppercase text-amberGold-400 font-semibold">Pilar 01</p>
              <p className="text-xs sm:text-sm font-bold text-white leading-tight font-sans">
                Tacos Sob Medida 3D
              </p>
            </div>
          </a>

          {/* Pillar 2 Tag */}
          <a
            className="flex items-center justify-center sm:justify-start gap-3 p-3.5 rounded-xl bg-obsidian-900/90 border border-cyan-500/30 hover:border-cyan-400 transition-all hover:-translate-y-1 group backdrop-blur"
            href="#skins"
          >
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left font-mono">
              <p className="text-[11px] uppercase text-cyan-400 font-semibold">Pilar 02</p>
              <p className="text-xs sm:text-sm font-bold text-white leading-tight font-sans">
                Skins Lendárias CS2
              </p>
            </div>
          </a>

          {/* Pillar 3 Tag */}
          <a
            className="flex items-center justify-center sm:justify-start gap-3 p-3.5 rounded-xl bg-obsidian-900/90 border border-fuchsia-500/30 hover:border-fuchsia-400 transition-all hover:-translate-y-1 group backdrop-blur"
            href="#musicas"
          >
            <div className="w-10 h-10 rounded-lg bg-fuchsia-500/10 flex items-center justify-center text-fuchsia-400 group-hover:bg-fuchsia-500 group-hover:text-black transition-colors">
              <Disc3 className="w-5 h-5" />
            </div>
            <div className="text-left font-mono">
              <p className="text-[11px] uppercase text-fuchsia-400 font-semibold">Pilar 03</p>
              <p className="text-xs sm:text-sm font-bold text-white leading-tight font-sans">
                Músicas &amp; Hinos de Perfil
              </p>
            </div>
          </a>
        </div>

        {/* Hero Call To Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            className="px-8 py-3.5 rounded-xl bg-amberGold-500 hover:bg-amberGold-400 text-obsidian-950 font-bold text-sm tracking-wide shadow-glow-gold transition-all transform hover:scale-105 flex items-center gap-2 font-mono"
            href="#tacos"
          >
            <span>Explorar Showcase 3D</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            onClick={onOpenCustomizer}
            className="px-8 py-3.5 rounded-xl bg-obsidian-900 hover:bg-obsidian-850 text-white border border-white/15 font-semibold text-sm transition-all hover:border-amberGold-400/50 flex items-center gap-2 font-mono cursor-pointer"
            type="button"
          >
            <SlidersHorizontal className="w-4 h-4 text-amberGold-400" />
            <span>Montar Meu Equipamento</span>
          </button>
        </div>
      </div>
    </section>
  );
};
