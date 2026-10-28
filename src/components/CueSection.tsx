import React from 'react';
import { Star, Zap, Eye, Target, Hand, Scale, Award, Heart } from 'lucide-react';
import { CUE_STICKS } from '../data/mockData';
import { CueStick, WishlistItem } from '../types';

interface CueSectionProps {
  onSelectCue3D: (cue: CueStick) => void;
  onAddToCart: (cue: CueStick) => void;
  isWishlisted: (id: string) => boolean;
  onToggleWishlist: (item: WishlistItem) => void;
}

export const CueSection: React.FC<CueSectionProps> = ({
  onSelectCue3D,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  const gokuCue = CUE_STICKS[0];
  const emeraldCue = CUE_STICKS[1];

  const isGokuWishlisted = isWishlisted(gokuCue.id);
  const isEmeraldWishlisted = isWishlisted(emeraldCue.id);

  const handleToggleGoku = () => {
    onToggleWishlist({
      id: gokuCue.id,
      type: 'cue',
      name: gokuCue.name,
      subtitle: `${gokuCue.series} • 145cm Maple Canadense`,
      price: gokuCue.price,
      image: gokuCue.image,
      badge: 'Série Limitada #08/50'
    });
  };

  const handleToggleEmerald = () => {
    onToggleWishlist({
      id: emeraldCue.id,
      type: 'cue',
      name: emeraldCue.name,
      subtitle: `${emeraldCue.series} • 145cm Fibra de Carbono`,
      price: emeraldCue.price,
      image: emeraldCue.image,
      badge: 'Linha Emerald Cyber'
    });
  };

  return (
    <section
      className="py-20 lg:py-28 relative bg-obsidian-900/60 border-b border-white/5"
      data-purpose="custom-cues-pillar"
      id="tacos"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Meta Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-amberGold-400 font-mono text-xs font-semibold tracking-wider uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-amberGold-500"></span> PILAR 01 • BILLIARDS &amp; POOL CRAFT
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-sans">
              Tacos de Sinuca <span className="amber-gradient-text">Customizados</span>
            </h2>
            <p className="mt-2 text-slate-400 max-w-xl text-sm sm:text-base font-sans">
              Projetados no padrão torneio internacional com 145cm, madeiras nobres tratadas a vácuo, acabamento em carbono aeronáutico e estampas exclusivas anime &amp; guerreiro.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              STATUS: <strong className="text-emerald-400">DISPONÍVEL SOB ENCOMENDA</strong>
            </span>
          </div>
        </div>

        {/* Feature Big Card (Dragon Ball / Goku Cue Showcase) */}
        <div className="rounded-2xl bg-obsidian-850 border border-amberGold-500/25 overflow-hidden shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Cue Full Art Visual Presentation */}
            <div className="lg:col-span-8 relative bg-black/40 overflow-hidden flex items-center justify-center p-3 sm:p-6 group">
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent z-10 pointer-events-none" />
              
              {/* Heart Wishlist Button */}
              <div className="absolute top-6 right-6 z-20">
                <button
                  onClick={handleToggleGoku}
                  aria-label="Salvar nos Favoritos"
                  className={`w-10 h-10 rounded-full backdrop-blur border flex items-center justify-center transition-all cursor-pointer ${
                    isGokuWishlisted
                      ? 'bg-rose-500/20 border-rose-500 text-rose-400 shadow-glow-purple'
                      : 'bg-black/70 border-white/20 text-slate-300 hover:text-rose-400 hover:border-rose-400/50'
                  }`}
                  title={isGokuWishlisted ? 'Remover dos Favoritos' : 'Salvar nos Favoritos'}
                >
                  <Heart className={`w-5 h-5 ${isGokuWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              <img
                alt="Custom Pool Cue Goku Limited Edition Dragon Ball Edição de Colecionador"
                className="w-full h-auto object-contain max-h-[620px] transition-transform duration-700 group-hover:scale-[1.02]"
                loading="lazy"
                src={gokuCue.image}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                <span className="px-3 py-1 rounded bg-black/80 backdrop-blur border border-amberGold-500/50 text-[11px] font-mono text-amberGold-400 font-bold tracking-widest uppercase">
                  {gokuCue.edition}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-black/60 text-[10px] font-mono text-slate-300">
                  COMPRIMENTO: {gokuCue.length}
                </span>
              </div>
            </div>

            {/* Cue Specs, Material breakdown & Purchase details */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 bg-obsidian-850">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase text-slate-400">{gokuCue.series}</span>
                  <div className="flex text-amberGold-400 text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 font-mono">
                  {gokuCue.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6 font-sans">
                  {gokuCue.description}
                </p>

                {/* Technical Specification Badges */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-obsidian-900 border border-white/5 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Target className="w-4 h-4 text-amberGold-400" /> Ponteira
                    </span>
                    <span className="text-white font-semibold">{gokuCue.specs.tip}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-obsidian-900 border border-white/5 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Hand className="w-4 h-4 text-amberGold-400" /> Empunhadura
                    </span>
                    <span className="text-white font-semibold">{gokuCue.specs.grip}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-obsidian-900 border border-white/5 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-amberGold-400" /> Peso Calibrado
                    </span>
                    <span className="text-white font-semibold">{gokuCue.specs.weight}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-obsidian-900 border border-white/5 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amberGold-400" /> Certificado 3D
                    </span>
                    <span className="text-emerald-400 font-semibold">{gokuCue.specs.certificate}</span>
                  </div>
                </div>
              </div>

              {/* Price and Buy Action */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-baseline justify-between mb-4 font-mono">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase block">Preço sob demanda</span>
                    <span className="text-2xl font-bold text-amberGold-400">
                      R$ {gokuCue.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">ou {gokuCue.installments}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onAddToCart(gokuCue)}
                    className="flex-1 py-3 px-4 rounded-xl bg-amberGold-500 hover:bg-amberGold-400 text-black font-bold text-sm tracking-wide transition-all shadow-glow-gold flex items-center justify-center gap-2 font-mono cursor-pointer"
                    type="button"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Encomendar Custom</span>
                  </button>
                  <button
                    onClick={() => onSelectCue3D(gokuCue)}
                    aria-label="Visualizar em 3D interativo"
                    className="p-3 rounded-xl bg-obsidian-800 hover:bg-obsidian-750 text-white border border-white/10 transition-colors cursor-pointer"
                    type="button"
                    title="Inspecionar Modelo 3D"
                  >
                    <Eye className="w-5 h-5 text-amberGold-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Custom Cue Banner Strip */}
          <div className="border-t border-white/10 bg-obsidian-950 p-4 sm:p-6" data-purpose="secondary-cue-preview">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  Linha Emerald Cyber • Acabamento PBR Alta Precisão
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleEmerald}
                  aria-label="Salvar Linha Emerald nos Favoritos"
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isEmeraldWishlisted
                      ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-rose-400'
                  }`}
                  title={isEmeraldWishlisted ? 'Remover dos Favoritos' : 'Salvar nos Favoritos'}
                >
                  <Heart className={`w-4 h-4 ${isEmeraldWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
                <span className="text-xs font-mono text-slate-400">Eixo em Grafite com Detalhes Tribais</span>
                <button
                  onClick={() => onSelectCue3D(emeraldCue)}
                  className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-emerald-400 font-mono text-xs border border-emerald-500/30 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" /> 3D View
                </button>
              </div>
            </div>
            <div
              onClick={() => onSelectCue3D(emeraldCue)}
              className="relative w-full overflow-x-auto rounded-lg bg-black/60 p-2 border border-white/5 cursor-pointer group"
            >
              <img
                alt="Taco de Sinuca Modelo Esmeralda Cyber com Detalhes Geométricos e Madeira Polimerizada"
                className="w-full h-auto min-w-[700px] object-cover max-h-16 rounded group-hover:opacity-90 transition-opacity"
                loading="lazy"
                src={emeraldCue.image}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
