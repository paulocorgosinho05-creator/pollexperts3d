import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Crosshair, Music, Heart, User } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSteam: () => void;
  onOpenCustomizer: () => void;
  onOpenDashboard: () => void;
  steamUser: { name: string; avatar: string; steamId: string } | null;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSteam,
  onOpenCustomizer,
  onOpenDashboard,
  steamUser
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-obsidian-950/85 border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a className="flex items-center gap-3 group" href="#">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amberGold-600 via-amberGold-400 to-amber-200 flex items-center justify-center font-mono font-black text-black shadow-glow-gold transition-transform group-hover:scale-105">
            3D
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-wider text-white font-mono flex items-center gap-1">
              POLLEXPERTS
              <span className="text-amberGold-400 text-sm font-black px-1 py-0.5 rounded bg-amberGold-500/10 border border-amberGold-500/30">
                3D
              </span>
            </span>
            <span className="text-[10px] tracking-widest text-slate-400 uppercase font-mono">
              Custom Cues • CS2 Skins • Audio
            </span>
          </div>
        </a>

        {/* Desktop Navigation Menu */}
        <nav aria-label="Navegação Principal" className="hidden xl:flex items-center gap-8 font-medium text-sm text-slate-300 font-sans">
          <a
            className="hover:text-amberGold-400 transition-colors flex items-center gap-1.5"
            href="#tacos"
          >
            <span className="text-xs text-amberGold-500">✦</span> Tacos Customizados
          </a>
          <a
            className="hover:text-amberGold-400 transition-colors flex items-center gap-1.5"
            href="#skins"
          >
            <Crosshair className="w-3.5 h-3.5 text-cyan-400" /> Skins CS2
          </a>
          <a
            className="hover:text-amberGold-400 transition-colors flex items-center gap-1.5"
            href="#musicas"
          >
            <Music className="w-3.5 h-3.5 text-fuchsia-400" /> Músicas de Perfil
          </a>
          <button
            onClick={onOpenDashboard}
            className="hover:text-amberGold-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Heart className={`w-3.5 h-3.5 ${wishlistCount > 0 ? 'text-rose-400 fill-rose-500/30' : 'text-slate-400'}`} />
            <span>Favoritos</span>
            {wishlistCount > 0 && (
              <span className="text-[11px] font-mono px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {wishlistCount}
              </span>
            )}
          </button>
          <button
            onClick={onOpenCustomizer}
            className="text-amberGold-400 hover:text-amberGold-300 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amberGold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amberGold-500"></span>
            </span>
            Criador Personalizado
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Wishlist Button */}
          <button
            onClick={onOpenDashboard}
            aria-label="Meus Favoritos"
            className="relative p-2.5 rounded-lg bg-obsidian-900 border border-white/10 text-slate-300 hover:text-rose-400 transition-colors cursor-pointer group"
            title="Abrir Lista de Desejos / Favoritos"
            type="button"
          >
            <Heart className={`w-4 h-4 transition-transform group-hover:scale-110 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-mono font-bold flex items-center justify-center shadow-sm">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Steam Login / User Dashboard Integration */}
          {steamUser ? (
            <button
              onClick={onOpenDashboard}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 text-slate-200 transition-all hover:border-amberGold-500/40 cursor-pointer"
              title="Abrir Painel do Colecionador"
              type="button"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-emerald-300 font-mono truncate max-w-28">{steamUser.name}</span>
            </button>
          ) : (
            <button
              onClick={onOpenSteam}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 text-slate-200 transition-all hover:border-amberGold-500/40 cursor-pointer"
              type="button"
            >
              <svg className="w-4 h-4 fill-slate-300" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312l2.67-3.876a3.5 3.5 0 0 1-.226-.736L6.5 15a4.5 4.5 0 0 1-.5-2c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5c0 .358-.042.707-.123 1.042l3.414 2.458C19.78 14.83 20.5 13.01 20.5 11c0-4.694-3.806-8.5-8.5-8.5z"/>
              </svg>
              <span>Entrar com Steam</span>
            </button>
          )}

          {/* Cart Quick View */}
          <button
            onClick={onOpenCart}
            aria-label="Carrinho de Compras"
            className="relative p-2.5 rounded-lg bg-obsidian-900 border border-white/10 text-slate-300 hover:text-amberGold-400 transition-colors cursor-pointer"
            type="button"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amberGold-500 text-black text-[11px] font-mono font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir Menu"
            className="xl:hidden p-2.5 rounded-lg bg-obsidian-900 border border-white/10 text-slate-300 hover:text-white"
            type="button"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-obsidian-950 border-b border-white/10 px-4 py-4 space-y-3 font-sans text-sm">
          <a
            onClick={() => setMobileMenuOpen(false)}
            href="#tacos"
            className="block py-2 text-slate-200 hover:text-amberGold-400"
          >
            Tacos Customizados
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            href="#skins"
            className="block py-2 text-slate-200 hover:text-cyan-400"
          >
            Skins CS2
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            href="#musicas"
            className="block py-2 text-slate-200 hover:text-fuchsia-400"
          >
            Músicas de Perfil
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDashboard();
            }}
            className="block w-full text-left py-2 text-rose-400 font-mono text-xs flex items-center justify-between"
          >
            <span>Lista de Desejos / Favoritos</span>
            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">
              {wishlistCount}
            </span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCustomizer();
            }}
            className="block w-full text-left py-2 text-amberGold-400 font-semibold"
          >
            Criador Personalizado 3D
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (steamUser) onOpenDashboard();
              else onOpenSteam();
            }}
            className="block w-full text-left py-2 text-cyan-400 font-mono text-xs"
          >
            {steamUser ? `Painel: ${steamUser.name}` : 'Entrar com Steam'}
          </button>
        </div>
      )}
    </header>
  );
};
