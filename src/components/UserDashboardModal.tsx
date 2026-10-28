import React, { useState } from 'react';
import {
  X,
  Heart,
  ShoppingCart,
  Trash2,
  Eye,
  Play,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Layers,
  ArrowRight,
  SlidersHorizontal,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { WishlistItem, CartItem, CueStick, CS2Skin, AudioTrack } from '../types';
import { CUE_STICKS, CS2_SKINS, AUDIO_TRACKS } from '../data/mockData';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: WishlistItem[];
  onRemoveFromWishlist: (id: string) => void;
  onAddToCart: (item: CartItem) => void;
  onOpenInspect: (item: WishlistItem) => void;
  onMoveAllToCart: () => void;
  steamUser: { name: string; avatar: string; steamId: string } | null;
  onOpenSteam: () => void;
}

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onOpenInspect,
  onMoveAllToCart,
  steamUser,
  onOpenSteam
}) => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'profile' | 'inventory'>('favorites');
  const [filterType, setFilterType] = useState<'all' | 'cue' | 'skin' | 'audio'>('all');
  const [copiedTrade, setCopiedTrade] = useState(false);

  if (!isOpen) return null;

  const filteredItems = wishlist.filter(item => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  const totalValue = wishlist.reduce((sum, item) => sum + item.price, 0);

  const handleAddToCartFromWishlist = (item: WishlistItem) => {
    const cartItem: CartItem = {
      cartId: `${item.type}-${item.id}-${Date.now()}`,
      id: item.id,
      type: item.type,
      name: item.name,
      subtitle: item.subtitle,
      price: item.price,
      image: item.image,
      quantity: 1
    };
    onAddToCart(cartItem);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 font-sans">
      <div className="bg-obsidian-900 border border-amberGold-500/30 rounded-3xl max-w-5xl w-full text-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header / User Profile Banner (inspired by Epic Games & Steam launcher) */}
        <div className="px-6 py-5 border-b border-white/10 bg-gradient-to-r from-obsidian-950 via-obsidian-900 to-obsidian-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amberGold-600 via-amberGold-400 to-amber-200 p-0.5 shadow-glow-gold">
                <div className="w-full h-full rounded-2xl bg-obsidian-950 flex items-center justify-center font-mono font-black text-amberGold-400 text-xl overflow-hidden">
                  {steamUser?.avatar ? (
                    <img
                      src={steamUser.avatar}
                      alt={steamUser.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    '3D'
                  )}
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-black flex items-center justify-center" title="Online no Steam" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono font-bold text-lg text-white">
                  {steamUser ? steamUser.name : 'Colecionador Pollexperts #08'}
                </h3>
                <span className="px-2 py-0.5 rounded bg-amberGold-500/10 border border-amberGold-500/30 text-amberGold-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                  VIP ELITE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  {steamUser ? `Steam ID: ${steamUser.steamId}` : 'Steam Guard Ativo • 0% Taxas de Custódia'}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!steamUser && (
              <button
                onClick={onOpenSteam}
                className="px-3.5 py-1.5 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 text-xs font-mono text-cyan-400 hover:border-cyan-400 transition-colors cursor-pointer"
              >
                Vincular Steam
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-white/10 bg-obsidian-950 flex items-center gap-3 font-mono text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`py-3.5 px-4 font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'favorites'
                ? 'border-amberGold-400 text-amberGold-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>Lista de Desejos / Favoritos</span>
            <span className="px-2 py-0.5 rounded-full bg-white/10 text-[11px] font-bold text-white">
              {wishlist.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-3.5 px-4 font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'inventory'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Meus Equipamentos CS2 &amp; Cues</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3.5 px-4 font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'profile'
                ? 'border-amberGold-400 text-amberGold-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Configurações &amp; Trade URL</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'favorites' && (
            <div className="space-y-6">
              {/* Telemetry Summary Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-obsidian-850 border border-white/5 font-mono">
                  <span className="text-[11px] text-slate-400 block uppercase">Itens Salvos</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-black text-white">{wishlist.length}</span>
                    <span className="text-xs text-slate-400">itens monitorados</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-obsidian-850 border border-white/5 font-mono">
                  <span className="text-[11px] text-slate-400 block uppercase">Valor Total da Coleção</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-black text-amberGold-400">
                      R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-obsidian-850 border border-white/5 font-mono flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block uppercase">Ação Rápida</span>
                    <span className="text-xs text-emerald-400 font-bold block mt-1">
                      Desconto de 5% no PIX Garantido
                    </span>
                  </div>
                  {wishlist.length > 0 && (
                    <button
                      onClick={onMoveAllToCart}
                      className="mt-2 py-2 px-3 rounded-xl bg-amberGold-500 hover:bg-amberGold-400 text-black text-xs font-bold transition-all shadow-glow-gold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Mover Todos para o Carrinho</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <button
                    onClick={() => setFilterType('all')}
                    className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                      filterType === 'all'
                        ? 'bg-white text-black font-bold border-white'
                        : 'bg-obsidian-850 text-slate-400 border-white/5 hover:text-white'
                    }`}
                  >
                    Todos ({wishlist.length})
                  </button>
                  <button
                    onClick={() => setFilterType('cue')}
                    className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                      filterType === 'cue'
                        ? 'bg-amberGold-500 text-black font-bold border-amberGold-400'
                        : 'bg-obsidian-850 text-slate-400 border-white/5 hover:text-white'
                    }`}
                  >
                    Tacos ({wishlist.filter(i => i.type === 'cue').length})
                  </button>
                  <button
                    onClick={() => setFilterType('skin')}
                    className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                      filterType === 'skin'
                        ? 'bg-cyan-500 text-black font-bold border-cyan-400'
                        : 'bg-obsidian-850 text-slate-400 border-white/5 hover:text-white'
                    }`}
                  >
                    Skins CS2 ({wishlist.filter(i => i.type === 'skin').length})
                  </button>
                  <button
                    onClick={() => setFilterType('audio')}
                    className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                      filterType === 'audio'
                        ? 'bg-fuchsia-600 text-white font-bold border-fuchsia-400'
                        : 'bg-obsidian-850 text-slate-400 border-white/5 hover:text-white'
                    }`}
                  >
                    Áudio Kits ({wishlist.filter(i => i.type === 'audio').length})
                  </button>
                </div>

                <span className="text-xs text-slate-400 font-mono">
                  Itens salvos com sincronização de preço em tempo real
                </span>
              </div>

              {/* Wishlist Items List */}
              {filteredItems.length === 0 ? (
                <div className="py-16 text-center rounded-2xl bg-obsidian-850/50 border border-white/5 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 text-slate-500 flex items-center justify-center mx-auto">
                    <Heart className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-mono font-bold text-base text-white">
                      Nenhum item salvo nesta categoria
                    </h4>
                    <p className="text-xs text-slate-400 font-sans max-w-sm mx-auto mt-1">
                      Clique no ícone de coração nos Tacos de Sinuca, Skins CS2 ou Áudio Kits para salvá-los e acompanhar preços aqui.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredItems.map(item => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-obsidian-850 border border-white/10 hover:border-amberGold-500/40 transition-all flex flex-col justify-between group"
                    >
                      <div className="flex gap-4">
                        {item.image ? (
                          <div className="w-20 h-20 rounded-xl bg-black/60 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center p-1.5">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-20 rounded-xl bg-fuchsia-950/40 border border-fuchsia-500/30 shrink-0 flex items-center justify-center text-fuchsia-400">
                            <Sparkles className="w-8 h-8" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0 font-mono">
                          <div className="flex items-start justify-between gap-2">
                            <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-amberGold-400 font-bold uppercase tracking-wider">
                              {item.badge || (item.type === 'cue' ? 'Taco 145cm' : item.type === 'skin' ? 'Skin CS2' : 'Áudio Kit')}
                            </span>
                            <button
                              onClick={() => onRemoveFromWishlist(item.id)}
                              className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                              title="Remover dos favoritos"
                            >
                              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                            </button>
                          </div>

                          <h4 className="font-bold text-sm text-white mt-1.5 truncate">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5 font-sans">
                            {item.subtitle}
                          </p>

                          <div className="mt-2 text-base font-bold text-amberGold-400">
                            R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </div>
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 font-mono text-xs">
                        <button
                          onClick={() => handleAddToCartFromWishlist(item)}
                          className="flex-1 py-2 px-3 rounded-xl bg-amberGold-500 hover:bg-amberGold-400 text-black font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Mover p/ Carrinho</span>
                        </button>
                        <button
                          onClick={() => onOpenInspect(item)}
                          className="py-2 px-3 rounded-xl bg-obsidian-800 hover:bg-obsidian-750 text-white border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                          title="Inspecionar no modelo 3D ou ouvir prévia"
                        >
                          <Eye className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="hidden sm:inline">Inspecionar</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-obsidian-850 border border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white">Inventário CS2 Conectado</h4>
                  <p className="text-slate-400 text-[11px] mt-0.5">Sincronizado diretamente via Steam Community Web API</p>
                </div>
                <span className="px-3 py-1 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[11px] font-bold">
                  Autenticado 100%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-obsidian-950 border border-white/5">
                  <span className="text-slate-400 text-[10px] block">Tacos Registrados</span>
                  <span className="text-lg font-bold text-white mt-1 block">1 Taco Sob Medida</span>
                  <span className="text-[10px] text-amberGold-400">Goku Saiyan Pro #08/50</span>
                </div>
                <div className="p-3.5 rounded-xl bg-obsidian-950 border border-white/5">
                  <span className="text-slate-400 text-[10px] block">Itens CS2 em Custódia</span>
                  <span className="text-lg font-bold text-white mt-1 block">2 Itens High-Tier</span>
                  <span className="text-[10px] text-cyan-400">Butterfly P2 &amp; Dragon Lore</span>
                </div>
                <div className="p-3.5 rounded-xl bg-obsidian-950 border border-white/5">
                  <span className="text-slate-400 text-[10px] block">Hinos de Perfil Ativos</span>
                  <span className="text-lg font-bold text-white mt-1 block">Nebula Phantom</span>
                  <span className="text-[10px] text-fuchsia-400">Masterização 96kHz</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-4 font-mono text-xs max-w-xl">
              <h4 className="font-bold text-sm text-white">Dados de Troca &amp; Notificações</h4>
              <div>
                <label className="text-slate-400 block mb-1">Steam Trade Offer URL:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value="https://steamcommunity.com/tradeoffer/new/?partner=104928172&token=abc123"
                    className="flex-1 bg-obsidian-950 border border-white/10 px-3 py-2 rounded-xl text-slate-300 text-[11px]"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText("https://steamcommunity.com/tradeoffer/new/?partner=104928172&token=abc123");
                      setCopiedTrade(true);
                      setTimeout(() => setCopiedTrade(false), 2000);
                    }}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors cursor-pointer"
                  >
                    {copiedTrade ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-850 border border-white/5 space-y-2">
                <span className="font-bold text-white text-xs block">Alertas de Preço da Lista de Desejos</span>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  Você receberá notificações instantâneas no Steam ou WhatsApp quando qualquer item favoritado entrar em promoção ou tiver float verificado.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
