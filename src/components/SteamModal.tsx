import React, { useState } from 'react';
import { X, ShieldCheck, Check, KeyRound, ExternalLink } from 'lucide-react';

interface SteamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; avatar: string; steamId: string }) => void;
}

export const SteamModal: React.FC<SteamModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [accountName, setAccountName] = useState('fallen_god_cs2');
  const [guardCode, setGuardCode] = useState('');
  const [tradeUrl, setTradeUrl] = useState('https://steamcommunity.com/tradeoffer/new/?partner=104928172&token=abc123');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: accountName || 'SteamUser_77',
        avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=120&auto=format&fit=crop&q=80',
        steamId: '76561198012345678'
      });
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#171a21] border border-cyan-500/30 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl relative font-sans">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Steam Logo Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white border border-white/10">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312l2.67-3.876a3.5 3.5 0 0 1-.226-.736L6.5 15a4.5 4.5 0 0 1-.5-2c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5c0 .358-.042.707-.123 1.042l3.414 2.458C19.78 14.83 20.5 13.01 20.5 11c0-4.694-3.806-8.5-8.5-8.5z"/>
            </svg>
          </div>
          <div>
            <h3 className="font-mono font-bold text-base text-white">Autenticação Steam OpenID</h3>
            <p className="text-xs text-slate-400 font-mono">Conexão Segura com a Valve API</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="text-slate-300 block mb-1.5">Nome de Usuário Steam:</label>
            <input
              type="text"
              value={accountName}
              onChange={e => setAccountName(e.target.value)}
              required
              className="w-full bg-[#0e1115] border border-white/10 px-3 py-2.5 rounded-lg text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-slate-300 block mb-1.5 flex items-center justify-between">
              <span>Steam Guard Mobile Token:</span>
              <span className="text-cyan-400 text-[10px]">Autenticador 2FA</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ex: R987K (Opcional)"
                value={guardCode}
                onChange={e => setGuardCode(e.target.value.toUpperCase())}
                maxLength={5}
                className="w-full bg-[#0e1115] border border-white/10 px-3 py-2.5 rounded-lg text-white tracking-widest uppercase focus:outline-none focus:border-cyan-400"
              />
              <KeyRound className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
            </div>
          </div>

          <div>
            <label className="text-slate-300 block mb-1.5 flex items-center justify-between">
              <span>Steam Trade URL (URL de Troca):</span>
              <a
                href="https://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 text-[10px] hover:underline flex items-center gap-1"
              >
                Onde encontrar? <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </label>
            <input
              type="text"
              value={tradeUrl}
              onChange={e => setTradeUrl(e.target.value)}
              className="w-full bg-[#0e1115] border border-white/10 px-3 py-2.5 rounded-lg text-slate-300 text-[11px] focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="p-3 bg-cyan-950/40 border border-cyan-500/20 rounded-xl text-cyan-300 text-[11px] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-400" />
            <span>Nenhum dado sensível de login é armazenado. Bot oficial Pollexperts com Trade Protection.</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-glow-cyan flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? 'Autenticando na Steam...' : 'Entrar com Steam'}
          </button>
        </form>
      </div>
    </div>
  );
};
