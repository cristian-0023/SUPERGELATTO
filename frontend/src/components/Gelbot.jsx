import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot } from 'lucide-react';

const Gelbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: '¡Hola! Soy Gelbot 🍦 ¿En qué puedo ayudarte hoy?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Auto response
    setTimeout(() => {
      let reply = 'Lo siento, no entiendo del todo. ¿Quieres ver el menú o saber sobre los SuperPoints?';
      if (input.toLowerCase().includes('hola')) reply = '¡Hola de nuevo! ¿Ganas de un gelato?';
      if (input.toLowerCase().includes('menu') || input.toLowerCase().includes('sabores')) reply = '¡Claro! Nuestra especialidad es el de Frutos del Bosque y Caramelo Salado.';
      if (input.toLowerCase().includes('puntos') || input.toLowerCase().includes('super')) reply = 'Los SuperPoints se ganan con cada compra. Cada $1000 = 1 punto.';
      
      const botMsg = { id: Date.now() + 1, text: reply, sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 glass-card shadow-2xl overflow-hidden flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="p-4 bg-gold-premium/10 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-background-dark flex items-center justify-center overflow-hidden border-2 border-gold-premium shadow-lg">
                  <img src="/images/gelbot-logo.png" alt="Gelbot" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Gelbot</h4>
                  <p className="text-[10px] text-green-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> En línea
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-white/30 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                    ? 'bg-gold-premium text-background-dark font-medium rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 text-white rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/10 flex gap-2 bg-background-dark/50">
              <input
                type="text"
                placeholder="Pregunta algo..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 text-sm focus:outline-none focus:border-gold-premium/50"
              />
              <button className="p-2 bg-gold-premium rounded-full text-background-dark hover:scale-105 transition-transform">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 rounded-full bg-background-dark shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center z-50 overflow-hidden group border-2 border-gold-premium relative p-0"
      >
        <div className="absolute inset-0 bg-gold-premium/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10" />
        <img 
          src="/images/gelbot-logo.png" 
          alt="Gelbot Toggle" 
          className="w-full h-full object-cover relative z-0 scale-100 group-hover:scale-110 transition-transform duration-500" 
        />
      </motion.button>
    </div>
  );
};

export default Gelbot;
