import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRightLeft, Bot } from 'lucide-react';
import { CS2Skin } from '../types';

interface TradeOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  skin: CS2Skin;
  mode: 'bot' | 'proposal';
  onAddToCart: (skin: CS2Skin) => void;
}

export const TradeOfferModal: React.FC<TradeOfferModalProps> = ({
  isOpen,
  onClose,
  skin,
  mode,
  onAddToCart
}) => {
  const [offerValue, setOfferValue] = useState(skin.price);
  const [tradeUrl, setTradeUrl] = useState('https://steamcommunity.com/tradeoffer/new/?partner=104928172&token=abc123');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onAddToCart(skin);
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-obsidian-900 border border-cyan-500/30 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl relative font-mono text-xs">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-lg">
            {mode === 'bot' ? <Bot className="w-5 h-5" /> : <ArrowRightLeft className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">
              {mode === 'bot' ? 'Troca Instantânea via Bot P2P' : 'Proposta Direta de Compra'}
            </h3>
            <p className="text-[11px] text-slate-400">
              {skin.weapon} | {skin.skinName}
            </p>
          </div>
        </div>

        {/* Skin Preview Strip */}
        <div className="p-3 rounded-xl bg-obsidian-950 border border-white/10 flex items-center gap-3 mb-4">
          <img
            src={skin.image}
            alt={skin.name}
            className="w-16 h-12 object-contain bg-black/40 rounded p-1"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] text-fuchsia-400 block font-bold">{skin.rarityBadge}</span>
            <p className="font-bold text-white text-xs truncate">{skin.skinName}</p>
            <p className="text-[10px] text-slate-400">Float: {skin.float} • {skin.wear}</p>
          </div>
          <span className="text-amberGold-400 font-bold text-xs shrink-0">
            R$ {skin.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>

        <form onSubmit={handleSendProposal} className="space-y-4">
          {mode === 'proposal' ? (
            <div>
              <label className="text-slate-300 block mb-1">Sua Oferta Sugerida (R$):</label>
              <input
                type="number"
                value={offerValue}
                onChange={e => setOfferValue(Number(e.target.value))}
                min={skin.price * 0.8}
                max={skin.price * 1.2}
                className="w-full bg-obsidian-950 border border-white/10 px-3 py-2 rounded-lg text-white font-bold focus:outline-none focus:border-amberGold-400"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Variação máxima de mercado: ±15% do valor de referência.
              </span>
            </div>
          ) : (
            <div>
              <label className="text-slate-300 block mb-1">Status do Bot Custodiante:</label>
              <div className="p-2.5 rounded-lg bg-obsidian-950 border border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Bot #Pollexperts-Vault-08 Online
                </span>
                <span className="text-slate-400">Trade Lock 0 Dias</span>
              </div>
            </div>
          )}

          <div>
            <label className="text-slate-300 block mb-1">Seu Steam Trade URL:</label>
            <input
              type="text"
              value={tradeUrl}
              onChange={e => setTradeUrl(e.target.value)}
              required
              className="w-full bg-obsidian-950 border border-white/10 px-3 py-2 rounded-lg text-slate-300 text-[11px] focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="p-3 bg-cyan-950/30 border border-cyan-500/20 rounded-xl flex items-center gap-2 text-cyan-300 text-[11px]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Transação garantida pelo protocolo de custódia Pollexperts com confirmação via Steam Guard.</span>
          </div>

          {isSuccess ? (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-emerald-300 text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Oferta enviada ao Bot! Item adicionado ao carrinho.</span>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider transition-all shadow-glow-cyan"
            >
              {mode === 'bot' ? 'Enviar Proposta ao Bot Steam' : 'Submeter Proposta Direta'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
