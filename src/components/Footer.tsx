import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenCustomizer: () => void;
  onOpenArtisan: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCustomizer, onOpenArtisan }) => {
  return (
    <footer className="bg-obsidian-950 pt-16 pb-12 text-slate-400 text-sm border-t border-white/10" data-purpose="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10 font-sans">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <a className="flex items-center gap-3 mb-4" href="#">
              <div className="w-9 h-9 rounded-xl bg-amberGold-500 text-black font-mono font-black flex items-center justify-center shadow-glow-gold">
                3D
              </div>
              <span className="text-xl font-extrabold tracking-wider text-white font-mono">
                POLLEXPERTS<span className="text-amberGold-400">3D</span>
              </span>
            </a>
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed mb-6 font-sans">
              A grife definitiva em tacos de sinuca artesanais de alto padrão, skins de elite do ecossistema CS2 e hinos musicais de perfil.
            </p>
            <div className="flex items-center gap-3">
              <a
                aria-label="Discord Oficial"
                className="w-9 h-9 rounded-lg bg-obsidian-900 border border-white/10 hover:border-amberGold-400 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                href="#customizador"
                onClick={e => { e.preventDefault(); onOpenArtisan(); }}
              >
                <span className="text-xs font-mono font-bold">DC</span>
              </a>
              <a
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-obsidian-900 border border-white/10 hover:border-amberGold-400 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                href="#tacos"
              >
                <span className="text-xs font-mono font-bold">IG</span>
              </a>
              <a
                aria-label="Steam Group"
                className="w-9 h-9 rounded-lg bg-obsidian-900 border border-white/10 hover:border-amberGold-400 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                href="#skins"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312l2.67-3.876a3.5 3.5 0 0 1-.226-.736L6.5 15a4.5 4.5 0 0 1-.5-2c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5c0 .358-.042.707-.123 1.042l3.414 2.458C19.78 14.83 20.5 13.01 20.5 11c0-4.694-3.806-8.5-8.5-8.5z"/>
                </svg>
              </a>
              <a
                aria-label="YouTube Showcase"
                className="w-9 h-9 rounded-lg bg-obsidian-900 border border-white/10 hover:border-amberGold-400 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                href="#musicas"
              >
                <span className="text-xs font-mono font-bold">YT</span>
              </a>
            </div>
          </div>

          {/* Links: Tacos */}
          <div>
            <h5 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              Tacos de Sinuca
            </h5>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a className="hover:text-amberGold-400 transition-colors" href="#tacos">Coleção Goku DBZ</a></li>
              <li><a className="hover:text-amberGold-400 transition-colors" href="#tacos">Modelos Fibra de Carbono</a></li>
              <li><a className="hover:text-amberGold-400 transition-colors" href="#tacos">Ponteiras de Alta Precisão</a></li>
              <li>
                <button onClick={onOpenCustomizer} className="hover:text-amberGold-400 transition-colors text-left cursor-pointer">
                  Encomenda Sob Medida
                </button>
              </li>
              <li>
                <button onClick={onOpenArtisan} className="hover:text-amberGold-400 transition-colors text-left cursor-pointer">
                  Manual de Cuidados
                </button>
              </li>
            </ul>
          </div>

          {/* Links: CS2 Skins */}
          <div>
            <h5 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              Mercado CS2
            </h5>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a className="hover:text-cyan-400 transition-colors" href="#skins">Butterfly Doppler P2</a></li>
              <li><a className="hover:text-cyan-400 transition-colors" href="#skins">AWP Dragon Lore</a></li>
              <li><a className="hover:text-cyan-400 transition-colors" href="#skins">Karambit Gamma Doppler</a></li>
              <li><a className="hover:text-cyan-400 transition-colors" href="#skins">Inspeção em Tempo Real</a></li>
              <li><a className="hover:text-cyan-400 transition-colors" href="#skins">Taxas e Regras de Troca</a></li>
            </ul>
          </div>

          {/* Links: Audio & Áreas */}
          <div>
            <h5 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              Hinos &amp; Som
            </h5>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a className="hover:text-fuchsia-400 transition-colors" href="#musicas">Áudio Kits de Perfil</a></li>
              <li><a className="hover:text-fuchsia-400 transition-colors" href="#musicas">Hinos de MVP Custom</a></li>
              <li><a className="hover:text-fuchsia-400 transition-colors" href="#musicas">Stingers para Streamers</a></li>
              <li><a className="hover:text-fuchsia-400 transition-colors" href="#musicas">Termos de Uso e Royalties</a></li>
              <li><a className="hover:text-fuchsia-400 transition-colors" href="#musicas">Segurança &amp; PIX</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <p>© 2026 POLLEXPERTS 3D — Todos os direitos reservados. Não associado diretamente com a Valve Corp.</p>
          <div className="flex items-center gap-6 font-mono">
            <a className="hover:text-white transition-colors" href="#tacos">Termos de Serviço</a>
            <a className="hover:text-white transition-colors" href="#tacos">Privacidade</a>
            <span className="text-amberGold-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> SSL 256-BIT ATIVO
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
