export interface CueStick {
  id: string;
  name: string;
  series: string;
  edition: string;
  length: string;
  price: number;
  installments: string;
  rating: number;
  reviewCount: number;
  description: string;
  image: string;
  bannerImage?: string;
  status: string;
  specs: {
    tip: string;
    tipDiameter: string;
    grip: string;
    weight: string;
    certificate: string;
    shaftWood: string;
    joint: string;
  };
  options?: {
    woodTypes: string[];
    weights: string[];
    tipSizes: string[];
  };
}

export interface CS2Skin {
  id: string;
  name: string;
  weapon: string;
  skinName: string;
  patternName: string;
  rarity: 'Covert' | 'Souvenir' | 'Classified' | 'Extraordinary';
  category: 'Faca' | 'Sniper' | 'Rifle' | 'Luvas';
  wear: string;
  float: number;
  price: number;
  tradeLockDays: number;
  patternIndex: string;
  stickers?: string;
  image: string;
  glowColor: 'purple' | 'gold' | 'cyan';
  rarityBadge: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  subtitle: string;
  style: string;
  genre: string;
  bpm: number;
  key: string;
  duration: string;
  durationSec: number;
  price: number;
  exclusiveAvailable: boolean;
  synthPreset: 'cyberpunk' | 'lofi' | 'heavy' | 'trap';
}

export interface CartItem {
  cartId: string;
  id: string;
  type: 'cue' | 'skin' | 'audio' | 'combo';
  name: string;
  subtitle: string;
  price: number;
  image?: string;
  details?: Record<string, string>;
  quantity: number;
}

export interface CustomCombo {
  cueId: string;
  engravingText: string;
  cueWeight: string;
  cueTip: string;
  skinId: string;
  audioTrackId: string;
}

export interface WishlistItem {
  id: string;
  type: 'cue' | 'skin' | 'audio';
  name: string;
  subtitle: string;
  price: number;
  image?: string;
  badge?: string;
  categoryName?: string;
  addedAt?: string;
}

