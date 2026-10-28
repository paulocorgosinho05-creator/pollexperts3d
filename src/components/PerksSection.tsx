import React from 'react';
import { Award, QrCode, Headset } from 'lucide-react';

export const PerksSection: React.FC = () => {
  return (
    <section className="py-14 bg-obsidian-900 border-b border-white/5" data-purpose="trust-badges">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Perk 1 */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-obsidian-950/60 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-amberGold-500/10 text-amberGold-400 flex items-center justify-center text-xl shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-sans">Madeiras Nobres &amp; PBR</h4>
              <p className="text-xs text-slate-400 font-sans">Precisão milimétrica e acabamento cerâmico.</p>
            </div>
          </div>

          {/* Perk 2 */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-obsidian-950/60 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xl shrink-0">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312l2.67-3.876a3.5 3.5 0 0 1-.226-.736L6.5 15a4.5 4.5 0 0 1-.5-2c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5c0 .358-.042.707-.123 1.042l3.414 2.458C19.78 14.83 20.5 13.01 20.5 11c0-4.694-3.806-8.5-8.5-8.5z"/>
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-sans">Trocas CS2 Seguras</h4>
              <p className="text-xs text-slate-400 font-sans">Autenticação Steam Guard com bot automatizado.</p>
            </div>
          </div>

          {/* Perk 3 */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-obsidian-950/60 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl shrink-0">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-sans">PIX &amp; Cripto Ativos</h4>
              <p className="text-xs text-slate-400 font-sans">Aprovação imediata e desconto de 5% no PIX.</p>
            </div>
          </div>

          {/* Perk 4 */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-obsidian-950/60 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 flex items-center justify-center text-xl shrink-0">
              <Headset className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-sans">Suporte VIP 24/7</h4>
              <p className="text-xs text-slate-400 font-sans">Atendimento personalizado pelo Discord e WhatsApp.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
