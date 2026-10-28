import React, { useState } from 'react';
import { ShieldCheck, Eye, Heart } from 'lucide-react';
import { CS2_SKINS } from '../data/mockData';
import { CS2Skin, WishlistItem } from '../types';

interface SkinsSectionProps {
  onInspectSkin: (skin: CS2Skin) => void;
  onTradeWithBot: (skin: CS2Skin) => void;
  onDirectProposal: (skin: CS2Skin) => void;
  isWishlisted: (id: string) => boolean;
  onToggleWishlist: (item: WishlistItem) => void;
}

export const SkinsSection: React.FC<SkinsSectionProps> = ({
  onInspectSkin,
  onTradeWithBot,
  onDirectProposal,
  isWishlisted,
  onToggleWishlist
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'covert' | 'knives' | 'snipers'>('all');

  const filteredSkins = CS2_SKINS.filter(skin => {
    if (activeFilter === 'knives') return skin.category === 'Faca';
    if (activeFilter === 'snipers') return skin.category === 'Sniper';
    if (activeFilter === 'covert') return skin.rarity === 'Covert' || skin.rarity === 'Souvenir';
    return true;
  });

  return (
    <section
      className="py-20 lg:py-28 relative bg-obsidian-950 border-b border-white/5"
      data-purpose="cs2-skins-pillar"
      id="skins"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Meta Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold tracking-wider uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span> PILAR 02 • COUNTER-STRIKE 2 VAULT
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-sans">
              Skins Lendárias{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                CS2 Marketplace
              </span>
            </h2>
            <p className="mt-2 text-slate-400 max-w-xl text-sm sm:text-base font-sans">
              Negociação instantânea peer-to-peer com taxas zero de custódia, inspeção com shaders Source 2 em 3D e itens autênticos Factory New de raridade máxima.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setActiveFilter(activeFilter === 'covert' ? 'all' : 'covert')}
              className={`px-4 py-2 font-bold rounded-lg border transition-colors cursor-pointer ${
                activeFilter === 'covert'
                  ? 'bg-cyan-500 text-black border-cyan-400'
                  : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20'
              }`}
              type="button"
            >
              Filtrar: Raras / Covert
            </button>
            <button
              onClick={() => setActiveFilter(activeFilter === 'knives' ? 'all' : 'knives')}
              className={`px-4 py-2 font-semibold rounded-lg border transition-colors cursor-pointer ${
                activeFilter === 'knives'
                  ? 'bg-white text-black border-white'
                  : 'bg-obsidian-850 border-white/10 text-slate-300 hover:text-white'
              }`}
              type="button"
            >
              Facas de Elite
            </button>
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 font-semibold rounded-lg border transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white text-black border-white'
                  : 'bg-obsidian-850 border-white/10 text-slate-300 hover:text-white'
              }`}
              type="button"
            >
              Mais Populares
            </button>
          </div>
        </div>

        {/* CS2 Skin Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredSkins.map(skin => {
            const isPink = skin.glowColor === 'purple';
            const isSouvenir = skin.glowColor === 'gold';
            const wishlisted = isWishlisted(skin.id);

            const handleToggle = () => {
              onToggleWishlist({
                id: skin.id,
                type: 'skin',
                name: `${skin.weapon} | ${skin.skinName}`,
                subtitle: `${skin.wear} • Float ${skin.float} • ${skin.patternName}`,
                price: skin.price,
                image: skin.image,
                badge: skin.rarityBadge
              });
            };

            return (
              <article
                key={skin.id}
                className={`rounded-2xl bg-obsidian-850 border overflow-hidden shadow-2xl transition-all flex flex-col justify-between group ${
                  isPink
                    ? 'border-fuchsia-500/25 hover:border-fuchsia-400/50'
                    : isSouvenir
                    ? 'border-amberGold-500/25 hover:border-amberGold-400/50'
                    : 'border-cyan-500/25 hover:border-cyan-400/50'
                }`}
              >
                <div className="relative overflow-hidden bg-black/60">
                  {/* Rarity Ribbon */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded font-mono text-xs font-black tracking-wider uppercase backdrop-blur ${
                        isPink
                          ? 'bg-fuchsia-600/90 text-white shadow-glow-purple'
                          : isSouvenir
                          ? 'bg-amberGold-600/90 text-black shadow-glow-gold'
                          : 'bg-cyan-600/90 text-white shadow-glow-cyan'
                      }`}
                    >
                      {skin.rarityBadge}
                    </span>
                    <span className="px-2 py-1 rounded bg-black/70 text-slate-300 font-mono text-[11px] border border-white/10">
                      {skin.wear} • {skin.float}
                    </span>
                  </div>

                  {/* Overlays: Wishlist Heart & Quick Inspect */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                    <button
                      onClick={handleToggle}
                      aria-label="Salvar nos Favoritos"
                      className={`w-9 h-9 rounded-full backdrop-blur border flex items-center justify-center transition-all cursor-pointer ${
                        wishlisted
                          ? 'bg-rose-500/20 border-rose-500 text-rose-400 shadow-glow-purple'
                          : 'bg-black/70 border-white/20 text-slate-300 hover:text-rose-400 hover:border-rose-400/50'
                      }`}
                      title={wishlisted ? 'Remover dos Favoritos' : 'Salvar nos Favoritos'}
                      type="button"
                    >
                      <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                    <button
                      onClick={() => onInspectSkin(skin)}
                      aria-label="Inspecionar Modelo 3D"
                      className="w-9 h-9 rounded-full bg-black/70 border border-white/20 text-slate-200 hover:text-cyan-400 hover:border-cyan-400 flex items-center justify-center transition-colors cursor-pointer"
                      type="button"
                      title="Inspecionar 3D"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Skin Image */}
                  <img
                    alt={skin.name}
                    className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    src={skin.image}
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Skin Info & Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 font-mono">
                    <div>
                      <p
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          isPink ? 'text-fuchsia-400' : isSouvenir ? 'text-amberGold-400' : 'text-cyan-400'
                        }`}
                      >
                        {skin.patternName}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                        {skin.weapon} | {skin.skinName}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Preço de Mercado</span>
                      <span
                        className={`text-2xl font-black ${
                          isSouvenir ? 'text-amberGold-400' : 'text-white'
                        }`}
                      >
                        R$ {skin.price.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      Trade Lock: {skin.tradeLockDays} Dias
                    </span>
                    <span className="text-slate-300">
                      {skin.stickers || `Padrão de Fase ${skin.patternIndex}`}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 font-mono">
                    {isPink ? (
                      <>
                        <button
                          onClick={() => onTradeWithBot(skin)}
                          className="py-2.5 px-4 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-glow-purple flex items-center justify-center gap-2 cursor-pointer"
                          type="button"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312l2.67-3.876a3.5 3.5 0 0 1-.226-.736L6.5 15a4.5 4.5 0 0 1-.5-2c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5c0 .358-.042.707-.123 1.042l3.414 2.458C19.78 14.83 20.5 13.01 20.5 11c0-4.694-3.806-8.5-8.5-8.5z"/>
                          </svg>
                          <span>Trocar com Bot</span>
                        </button>
                        <button
                          onClick={() => onInspectSkin(skin)}
                          className="py-2.5 px-4 rounded-xl bg-obsidian-800 hover:bg-obsidian-750 border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                          type="button"
                        >
                          <Eye className="w-4 h-4 text-cyan-400" />
                          <span>Inspecionar 3D</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => onDirectProposal(skin)}
                          className="py-2.5 px-4 rounded-xl bg-amberGold-500 hover:bg-amberGold-400 text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-glow-gold flex items-center justify-center gap-2 cursor-pointer"
                          type="button"
                        >
                          <span>Proposta Direta</span>
                        </button>
                        <button
                          onClick={() => onInspectSkin(skin)}
                          className="py-2.5 px-4 rounded-xl bg-obsidian-800 hover:bg-obsidian-750 border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                          type="button"
                        >
                          <Eye className="w-4 h-4 text-amberGold-400" />
                          <span>Visualizador 3D</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
