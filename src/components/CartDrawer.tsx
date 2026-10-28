import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, QrCode, ShieldCheck, CheckCircle2, Copy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (cartId: string, delta: number) => void;
  onRemove: (cartId: string) => void;
  onClear: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemove,
  onClear
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [showPixModal, setShowPixModal] = useState(false);
  const [pixPaid, setPixPaid] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const couponAmount = rawSubtotal * couponDiscount;
  const pixDiscount = (rawSubtotal - couponAmount) * 0.05;
  const finalTotal = Math.max(0, rawSubtotal - couponAmount - pixDiscount);

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'POLLEXPERTS10') {
      setCouponDiscount(0.1);
      setCouponSuccess('Cupom POLLEXPERTS10 aplicado: 10% OFF extra!');
      setCouponError('');
    } else if (couponCode.trim().toUpperCase() === 'CS2VIP') {
      setCouponDiscount(0.07);
      setCouponSuccess('Cupom CS2VIP aplicado: 7% OFF!');
      setCouponError('');
    } else {
      setCouponError('Cupom inválido. Experimente "POLLEXPERTS10"');
      setCouponSuccess('');
    }
  };

  const handleSimulatePixPayment = () => {
    setPixPaid(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      onClear();
      setShowPixModal(false);
      setPixPaid(false);
      onClose();
    }, 2800);
  };

  const dummyPixCode = `00020126580014br.gov.bcb.pix0136pollexperts3d-financeiro@pollexperts.com520400005303986540${finalTotal.toFixed(2)}5802BR5916POLLEXPERTS 3D6009SAO PAULO62070503***6304`;

  const copyPixCode = () => {
    navigator.clipboard?.writeText(dummyPixCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-obsidian-900 border-l border-white/10 text-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amberGold-500/10 flex items-center justify-center text-amberGold-400 font-mono font-bold text-sm">
                3D
              </div>
              <div>
                <h3 className="font-mono font-bold text-base text-white">Seu Carrinho VIP</h3>
                <p className="text-xs text-slate-400 font-mono">
                  {items.length} {items.length === 1 ? 'item selecionado' : 'itens selecionados'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-slate-400 font-mono text-sm mb-4">Seu carrinho está vazio.</p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-amberGold-500 text-black font-mono font-bold text-xs uppercase"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              items.map(item => (
                <div
                  key={item.cartId}
                  className="p-4 rounded-xl bg-obsidian-850 border border-white/5 flex gap-3.5 hover:border-amberGold-500/30 transition-all"
                >
                  {item.image && (
                    <div className="w-16 h-16 rounded-lg bg-black/50 overflow-hidden shrink-0 border border-white/10 flex items-center justify-center p-1">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-mono font-bold text-xs text-white leading-tight truncate">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => onRemove(item.cartId)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                        title="Remover"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono truncate mt-0.5">
                      {item.subtitle}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-obsidian-950 px-2 py-0.5 rounded-md border border-white/5 font-mono text-xs">
                        <button
                          onClick={() => onUpdateQty(item.cartId, -1)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white font-bold px-1">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.cartId, 1)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-mono font-bold text-sm text-amberGold-400">
                        R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Coupon Box */}
            {items.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    placeholder="Código de cupom (ex: POLLEXPERTS10)"
                    className="flex-1 bg-obsidian-950 border border-white/10 px-3 py-2 rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amberGold-400"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-mono font-semibold transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-rose-400 mt-1 font-mono">{couponError}</p>}
                {couponSuccess && <p className="text-[11px] text-emerald-400 mt-1 font-mono">{couponSuccess}</p>}
              </div>
            )}
          </div>

          {/* Footer Total & Actions */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-obsidian-950">
              <div className="space-y-1.5 font-mono text-xs mb-4">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>R$ {rawSubtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Desconto Cupom ({(couponDiscount * 100).toFixed(0)}%)</span>
                    <span>- R$ {couponAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                )}
                <div className="flex justify-between text-cyan-400">
                  <span>Desconto PIX Especial (5% OFF)</span>
                  <span>- R$ {pixDiscount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-base pt-2 border-t border-white/10">
                  <span>Total com PIX</span>
                  <span className="text-amberGold-400">
                    R$ {finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 text-right">
                  ou até 12x de R$ {((rawSubtotal - couponAmount) / 12 * 1.09).toFixed(2)} no cartão
                </p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setShowPixModal(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-amberGold-500 hover:bg-amberGold-400 text-black font-mono font-extrabold text-xs uppercase tracking-wider transition-all shadow-glow-gold flex items-center justify-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Pagar com PIX Imediato (5% OFF)</span>
                </button>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Garantia Autêntica Pollexperts • SSL 256-Bit</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PIX Instant Modal */}
      {showPixModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-obsidian-900 border border-amberGold-500/40 rounded-2xl max-w-md w-full p-6 text-white relative shadow-2xl">
            <button
              onClick={() => setShowPixModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-amberGold-500/10 text-amberGold-400 flex items-center justify-center mx-auto mb-3">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="font-mono font-black text-xl text-white">
                Pagamento via PIX 5% OFF
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Aprovação automática em até 10 segundos
              </p>

              <div className="my-5 p-4 rounded-xl bg-white flex flex-col items-center justify-center mx-auto w-48 h-48 shadow-lg">
                {/* Visual QR Code placeholder with scan lines */}
                <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="100" fill="white" />
                  <rect x="10" y="10" width="25" height="25" fill="#0b0d0a" />
                  <rect x="15" y="15" width="15" height="15" fill="white" />
                  <rect x="18" y="18" width="9" height="9" fill="#eab308" />
                  <rect x="65" y="10" width="25" height="25" fill="#0b0d0a" />
                  <rect x="70" y="15" width="15" height="15" fill="white" />
                  <rect x="73" y="18" width="9" height="9" fill="#eab308" />
                  <rect x="10" y="65" width="25" height="25" fill="#0b0d0a" />
                  <rect x="15" y="70" width="15" height="15" fill="white" />
                  <rect x="18" y="73" width="9" height="9" fill="#eab308" />
                  <path d="M40 10h15v5H40zM40 25h10v10H40zM55 20h5v15h-5zM45 45h10v10H45zM65 45h25v5H65zM40 65h15v15H40zM60 65h10v20h-10zM75 60h15v10H75zM75 80h15v10H75z" fill="#0b0d0a"/>
                </svg>
              </div>

              <div className="bg-obsidian-950 p-3 rounded-lg border border-white/10 text-left font-mono mb-4">
                <span className="text-[10px] text-slate-400 block mb-1">Chave Copia e Cola:</span>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-300 truncate">{dummyPixCode}</span>
                  <button
                    onClick={copyPixCode}
                    className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white shrink-0"
                    title="Copiar código"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                {copiedPix && <p className="text-[10px] text-emerald-400 mt-1">Copiado para a área de transferência!</p>}
              </div>

              <div className="flex items-center justify-between font-mono text-xs mb-4">
                <span className="text-slate-400">Valor Final:</span>
                <span className="text-amberGold-400 font-extrabold text-base">
                  R$ {finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              {pixPaid ? (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-emerald-300 font-mono text-xs flex items-center justify-center gap-2 animate-pulse">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pagamento PIX Aprovado! Preparando Encomenda...</span>
                </div>
              ) : (
                <button
                  onClick={handleSimulatePixPayment}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Simular Pagamento Confirmado
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
