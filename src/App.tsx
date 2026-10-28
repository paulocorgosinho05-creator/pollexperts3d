/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CueSection } from './components/CueSection';
import { SkinsSection } from './components/SkinsSection';
import { AudioSection } from './components/AudioSection';
import { ComboTeaser } from './components/ComboTeaser';
import { PerksSection } from './components/PerksSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CustomizerModal } from './components/CustomizerModal';
import { SteamModal } from './components/SteamModal';
import { ConciergeModal } from './components/ConciergeModal';
import { TradeOfferModal } from './components/TradeOfferModal';
import { Modal3DViewer } from './components/Modal3DViewer';
import { UserDashboardModal } from './components/UserDashboardModal';
import { CUE_STICKS, CS2_SKINS, AUDIO_TRACKS } from './data/mockData';
import { CartItem, CueStick, CS2Skin, AudioTrack, WishlistItem } from './types';
import { audioSynth } from './utils/audioSynth';
import confetti from 'canvas-confetti';

export default function App() {
  // Initial cart with the 2 luxury items shown in the header cart badge (2)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      cartId: 'item-goku-cue',
      id: CUE_STICKS[0].id,
      type: 'cue',
      name: CUE_STICKS[0].name,
      subtitle: `${CUE_STICKS[0].series} • 145cm Maple Pro`,
      price: CUE_STICKS[0].price,
      image: CUE_STICKS[0].image,
      quantity: 1
    },
    {
      cartId: 'item-butterfly-pink',
      id: CS2_SKINS[0].id,
      type: 'skin',
      name: `${CS2_SKINS[0].weapon} | ${CS2_SKINS[0].skinName}`,
      subtitle: `${CS2_SKINS[0].wear} • Float ${CS2_SKINS[0].float} • ${CS2_SKINS[0].patternName}`,
      price: CS2_SKINS[0].price,
      image: CS2_SKINS[0].image,
      quantity: 1
    }
  ]);

  // Wishlist state for saving items for later
  const [wishlist, setWishlist] = useState<WishlistItem[]>([
    {
      id: CS2_SKINS[1].id, // AWP Dragon Lore initially bookmarked
      type: 'skin',
      name: `${CS2_SKINS[1].weapon} | ${CS2_SKINS[1].skinName}`,
      subtitle: `${CS2_SKINS[1].wear} • Float ${CS2_SKINS[1].float} • ${CS2_SKINS[1].patternName}`,
      price: CS2_SKINS[1].price,
      image: CS2_SKINS[1].image,
      badge: CS2_SKINS[1].rarityBadge
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSteamModalOpen, setIsSteamModalOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isArtisanChatOpen, setIsArtisanChatOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [steamUser, setSteamUser] = useState<{ name: string; avatar: string; steamId: string } | null>(null);

  // 3D Inspector Modal State
  const [modal3D, setModal3D] = useState<{
    isOpen: boolean;
    type: 'cue' | 'skin';
    cueData?: CueStick;
    skinData?: CS2Skin;
  }>({
    isOpen: false,
    type: 'cue'
  });

  // Trade Offer Modal State
  const [tradeModal, setTradeModal] = useState<{
    isOpen: boolean;
    skin: CS2Skin | null;
    mode: 'bot' | 'proposal';
  }>({
    isOpen: false,
    skin: null,
    mode: 'bot'
  });

  // Toast notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Wishlist Helpers
  const isWishlisted = (id: string) => {
    return wishlist.some(item => item.id === id);
  };

  const handleToggleWishlist = (item: WishlistItem) => {
    if (isWishlisted(item.id)) {
      setWishlist(prev => prev.filter(i => i.id !== item.id));
      showToast(`Removido dos favoritos: ${item.name}`);
    } else {
      setWishlist(prev => [...prev, item]);
      showToast(`Salvo nos favoritos: ${item.name}`);
    }
  };

  const handleRemoveFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(i => i.id !== id));
  };

  const handleMoveAllWishlistToCart = () => {
    wishlist.forEach(item => {
      handleAddToCart({
        cartId: `${item.type}-${item.id}-${Date.now()}`,
        id: item.id,
        type: item.type,
        name: item.name,
        subtitle: item.subtitle,
        price: item.price,
        image: item.image,
        quantity: 1
      });
    });
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    showToast(`${wishlist.length} favoritos adicionados ao carrinho!`);
    setIsDashboardOpen(false);
    setIsCartOpen(true);
  };

  const handleOpenInspectFromWishlist = (item: WishlistItem) => {
    setIsDashboardOpen(false);
    if (item.type === 'cue') {
      const cue = CUE_STICKS.find(c => c.id === item.id) || CUE_STICKS[0];
      setModal3D({
        isOpen: true,
        type: 'cue',
        cueData: cue
      });
    } else if (item.type === 'skin') {
      const skin = CS2_SKINS.find(s => s.id === item.id) || CS2_SKINS[0];
      setModal3D({
        isOpen: true,
        type: 'skin',
        skinData: skin
      });
    } else if (item.type === 'audio') {
      const track = AUDIO_TRACKS.find(t => t.id === item.id) || AUDIO_TRACKS[0];
      audioSynth.play(track.synthPreset);
      showToast(`Reproduzindo prévia: ${track.title}`);
    }
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id && i.type === item.type);
      if (existing) {
        return prev.map(i =>
          i.cartId === existing.cartId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, item];
    });
    showToast(`Adicionado ao carrinho: ${item.name}`);
  };

  const handleAddCue = (cue: CueStick) => {
    handleAddToCart({
      cartId: `cue-${Date.now()}`,
      id: cue.id,
      type: 'cue',
      name: cue.name,
      subtitle: `${cue.series} • 145cm`,
      price: cue.price,
      image: cue.image,
      quantity: 1
    });
  };

  const handleAddSkin = (skin: CS2Skin) => {
    handleAddToCart({
      cartId: `skin-${Date.now()}`,
      id: skin.id,
      type: 'skin',
      name: `${skin.weapon} | ${skin.skinName}`,
      subtitle: `${skin.wear} • Float ${skin.float}`,
      price: skin.price,
      image: skin.image,
      quantity: 1
    });
  };

  const handleAddTrack = (track: AudioTrack) => {
    handleAddToCart({
      cartId: `audio-${Date.now()}`,
      id: track.id,
      type: 'audio',
      name: track.title,
      subtitle: `Music Kit • ${track.style}`,
      price: track.price,
      quantity: 1
    });
  };

  const handleUpdateQty = (cartId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(i => {
          if (i.cartId === cartId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems(prev => prev.filter(i => i.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 font-sans selection:bg-amberGold-500 selection:text-black">
      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="fixed top-24 right-4 z-50 bg-amberGold-500 text-black px-4 py-2.5 rounded-xl font-mono text-xs font-bold shadow-glow-gold animate-bounce">
          {toastMsg}
        </div>
      )}

      {/* Main Header */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSteam={() => setIsSteamModalOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        steamUser={steamUser}
      />

      {/* Hero Banner Section */}
      <Hero onOpenCustomizer={() => setIsCustomizerOpen(true)} />

      {/* Pillar 01: Custom Cues Section */}
      <CueSection
        onSelectCue3D={cue =>
          setModal3D({
            isOpen: true,
            type: 'cue',
            cueData: cue
          })
        }
        onAddToCart={handleAddCue}
        isWishlisted={isWishlisted}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Pillar 02: CS2 Skins Marketplace */}
      <SkinsSection
        onInspectSkin={skin =>
          setModal3D({
            isOpen: true,
            type: 'skin',
            skinData: skin
          })
        }
        onTradeWithBot={skin =>
          setTradeModal({
            isOpen: true,
            skin,
            mode: 'bot'
          })
        }
        onDirectProposal={skin =>
          setTradeModal({
            isOpen: true,
            skin,
            mode: 'proposal'
          })
        }
        isWishlisted={isWishlisted}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Pillar 03: Audio Kits & Profile Anthems */}
      <AudioSection
        onCustomAudioHire={() => setIsArtisanChatOpen(true)}
        onAddToCart={handleAddTrack}
        isWishlisted={isWishlisted}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Configurator Teaser */}
      <ComboTeaser
        onOpenStudio={() => setIsCustomizerOpen(true)}
        onOpenArtisan={() => setIsArtisanChatOpen(true)}
      />

      {/* Trust & Perks */}
      <PerksSection />

      {/* Footer */}
      <Footer
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenArtisan={() => setIsArtisanChatOpen(true)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveItem}
        onClear={handleClearCart}
      />

      {/* 3D Customizer Studio Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onAddComboToCart={combo => {
          handleAddToCart(combo);
          setIsCartOpen(true);
        }}
      />

      {/* User Dashboard & Favorites Modal */}
      <UserDashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={item => {
          handleAddToCart(item);
          showToast(`Movido para o carrinho: ${item.name}`);
        }}
        onOpenInspect={handleOpenInspectFromWishlist}
        onMoveAllToCart={handleMoveAllWishlistToCart}
        steamUser={steamUser}
        onOpenSteam={() => {
          setIsDashboardOpen(false);
          setIsSteamModalOpen(true);
        }}
      />

      {/* Steam OpenID Modal */}
      <SteamModal
        isOpen={isSteamModalOpen}
        onClose={() => setIsSteamModalOpen(false)}
        onLoginSuccess={user => {
          setSteamUser(user);
          showToast(`Conectado como ${user.name}`);
        }}
      />

      {/* Concierge Artisan Chat Modal */}
      <ConciergeModal
        isOpen={isArtisanChatOpen}
        onClose={() => setIsArtisanChatOpen(false)}
      />

      {/* CS2 Trade & Proposal Modal */}
      {tradeModal.isOpen && tradeModal.skin && (
        <TradeOfferModal
          isOpen={tradeModal.isOpen}
          onClose={() => setTradeModal({ isOpen: false, skin: null, mode: 'bot' })}
          skin={tradeModal.skin}
          mode={tradeModal.mode}
          onAddToCart={skin => {
            handleAddSkin(skin);
            setIsCartOpen(true);
          }}
        />
      )}

      {/* Full 3D Inspector Modal */}
      <Modal3DViewer
        isOpen={modal3D.isOpen}
        onClose={() => setModal3D({ isOpen: false, type: 'cue' })}
        type={modal3D.type}
        cueData={modal3D.cueData}
        skinData={modal3D.skinData}
        onAddToCart={() => {
          if (modal3D.type === 'cue' && modal3D.cueData) {
            handleAddCue(modal3D.cueData);
          } else if (modal3D.skinData) {
            handleAddSkin(modal3D.skinData);
          }
          setIsCartOpen(true);
        }}
      />
    </div>
  );
}
