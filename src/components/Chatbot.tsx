import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Minimize2, 
  Maximize2, 
  RotateCcw,
  ShoppingBag,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const N8N_WEBHOOK_URL = 'https://bhavanaaa.app.n8n.cloud/webhook/d8143a73-af69-4e99-877f-cc04b7ed8777/chat';

export const Chatbot: React.FC = () => {
  const { viewProduct, setCurrentView } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => {
    const existing = localStorage.getItem('lumora_chat_session');
    if (existing) return existing;
    const newId = 'session_' + Math.random().toString(36).substring(2, 11) + Date.now();
    localStorage.setItem('lumora_chat_session', newId);
    return newId;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Welcome to LUMORA. I am your personal shopping concierge. How may I assist your space, wardrobe, or order today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const messageToSend = (customText || inputMessage).trim();
    if (!messageToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: messageToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          chatInput: messageToSend,
          message: messageToSend,
          sessionId: sessionId,
          context: {
            brand: 'LUMORA',
            tagline: 'Simple things. Better living.',
            url: window.location.href,
          }
        }),
      });

      let replyText = '';

      if (response.ok) {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await response.json();
          // Check common n8n AI agent response shapes
          replyText = 
            data.output || 
            data.text || 
            data.response || 
            data.message || 
            (typeof data === 'string' ? data : JSON.stringify(data));
        } else {
          replyText = await response.text();
        }
      } else {
        replyText = "I'm having a brief connection issue with our studio server. Please feel free to ask again or reach our team at concierge@lumora.studio.";
      }

      const botMessage: ChatMessage = {
        id: 'bot_' + Date.now(),
        sender: 'bot',
        text: replyText || 'Thank you for your inquiry. How else may I assist you?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('n8n Chatbot Error:', error);
      const errorMessage: ChatMessage = {
        id: 'err_' + Date.now(),
        sender: 'bot',
        text: "I was unable to connect to the concierge service just now. Please try again in a moment, or browse our curated catalog.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: 'Conversation refreshed. What can I curate or answer for you today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  const quickPrompts = [
    'Recommend essentials for a quiet desk',
    'What promo codes or discounts are available?',
    'What is your shipping and return policy?',
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group cursor-pointer border border-stone-700/30"
          aria-label="Open Lumora AI Concierge"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full" />
          </div>
          <span className="text-xs font-semibold tracking-wide pr-1 hidden sm:inline">
            Studio Concierge
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[85vh] bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 px-5 bg-[#FAF9F6] dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center font-editorial text-lg shadow-sm">
                L
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                    LUMORA Concierge
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    n8n AI
                  </span>
                </div>
                <p className="text-[10px] text-stone-400 font-light">
                  Simple things. Better living.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg transition-colors"
                title="Restart conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-stone-50/50 dark:bg-stone-900/40">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-br-xs shadow-xs'
                      : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 border border-stone-200/80 dark:border-stone-700/80 rounded-bl-xs shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-stone-400 mt-1 px-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing / Loading indicator */}
            {isLoading && (
              <div className="flex items-start">
                <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-3 rounded-2xl rounded-bl-xs shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts (visible if conversation is short) */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 bg-stone-50 dark:bg-stone-900/80 border-t border-stone-100 dark:border-stone-800 flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                Suggested Inquiries:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(undefined, prompt)}
                    className="text-left text-[11px] px-2.5 py-1 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-700 dark:text-stone-300 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <form
            onSubmit={(e) => handleSendMessage(e)}
            className="p-3 bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about products, styling, or orders..."
              disabled={isLoading}
              className="flex-1 px-3.5 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl transition-all hover:bg-stone-800 dark:hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
