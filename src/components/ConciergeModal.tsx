import React, { useState } from 'react';
import { X, Send, Bot, CheckCheck, User, Sparkles } from 'lucide-react';

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'artesao' | 'user';
  text: string;
  time: string;
}

export const ConciergeModal: React.FC<ConciergeModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'artesao',
      text: 'Olá! Sou o Guilherme, mestre artesão da Pollexperts 3D. Em que posso te ajudar hoje sobre os tacos customizados de 145cm, skins CS2 ou produção de áudio?',
      time: 'Agora'
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const quickQuestions = [
    'Qual madeira é usada no Goku Saiyan Pro?',
    'Como funciona a gravação a laser no taco?',
    'As skins do CS2 possuem trade lock?',
    'Como peço uma música exclusiva para meu canal?'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsgs: Message[] = [
      ...messages,
      { sender: 'user', text, time: 'Agora' }
    ];
    setMessages(newMsgs);
    if (!textToSend) setInputText('');

    setTimeout(() => {
      let reply = 'Perfeito! Nossos artesãos preparam cada peça sob medida com tolerância de 0,05mm. Podemos iniciar sua produção imediatamente com envio por Sedex com seguro total!';
      const lower = text.toLowerCase();
      if (lower.includes('madeira') || lower.includes('goku')) {
        reply = 'Utilizamos Maple Canadense selecionado envelhecido a vácuo por 18 meses, com núcleo interno em fibra de carbono aeronáutica para amortecer vibrações nas tacadas de efeito!';
      } else if (lower.includes('laser') || lower.includes('grav')) {
        reply = 'A gravação a laser CO2 de alta precisão penetra 0,3mm na madeira e recebe acabamento selador cerâmico UV, garantindo que o seu nickname nunca se apague com o suor das mãos!';
      } else if (lower.includes('skin') || lower.includes('trade')) {
        reply = 'Todas as skins exibidas estão no bot com Trade Lock 0 Dias! Assim que o pagamento via PIX ou troca é confirmado, o bot envia a proposta instantaneamente para o seu Steam Trade URL.';
      } else if (lower.includes('musica') || lower.includes('exclusiv') || lower.includes('canal')) {
        reply = 'Produzimos trilhas personalizadas em 24-bit / 96kHz com direitos autorais 100% seus! Você recebe o pacote com introdução, clutch 1v5, contagem de bomba e versão para stream.';
      }

      setMessages(prev => [
        ...prev,
        { sender: 'artesao', text: reply, time: 'Agora' }
      ]);
    }, 750);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-obsidian-900 border border-amberGold-500/40 rounded-2xl max-w-lg w-full flex flex-col h-[520px] text-white shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-obsidian-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-amberGold-500/20 border border-amberGold-400 text-amberGold-400 flex items-center justify-center font-bold">
                GA
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black"></span>
            </div>
            <div>
              <h4 className="font-mono font-bold text-sm text-white">Guilherme Alves • Mestre Luthier</h4>
              <p className="text-[11px] text-slate-400 font-mono">Atendimento Artesanal Pollexperts</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message history */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl ${
                  m.sender === 'user'
                    ? 'bg-amberGold-500 text-black font-semibold rounded-tr-none'
                    : 'bg-obsidian-800 text-slate-200 border border-white/10 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Quick suggestions */}
        <div className="px-4 py-2 border-t border-white/5 bg-obsidian-950 flex gap-1.5 overflow-x-auto text-[11px] font-mono no-scrollbar">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 whitespace-nowrap border border-white/5 transition-colors shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-3 border-t border-white/10 bg-obsidian-950 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Digite sua dúvida sobre materiais, medidas ou skins..."
            className="flex-1 bg-obsidian-900 border border-white/10 px-3 py-2 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amberGold-400"
          />
          <button
            onClick={() => handleSend()}
            className="p-2.5 rounded-xl bg-amberGold-500 hover:bg-amberGold-400 text-black transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
