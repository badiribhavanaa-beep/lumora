import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { getLocalConciergeResponse } from '../utils/conciergeFallback';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw,
  Settings,
  HelpCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  source?: 'n8n' | 'fallback';
}

const DEFAULT_N8N_URL = 'https://bhavanaaa.app.n8n.cloud/webhook/d8143a73-af69-4e99-877f-cc04b7ed8777/chat';

export const Chatbot: React.FC = () => {
  const { viewProduct, setCurrentView, showToast } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  
  const [webhookUrl, setWebhookUrl] = useState(() => {
    return localStorage.getItem('lumora_n8n_url') || DEFAULT_N8N_URL;
  });
  const [tempWebhookUrl, setTempWebhookUrl] = useState(webhookUrl);

  const [n8nStatus, setN8nStatus] = useState<'connected' | 'not-active' | 'offline'>('not-active');

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
      text: 'Welcome to LUMORA. I am your personal studio concierge. Ask me for recommendations, styling guidance, discounts, or order inquiries.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'fallback',
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

    let finalReply = '';
    let responseSource: 'n8n' | 'fallback' = 'fallback';

    // Step 1: Attempt to contact the user's trained n8n webhook
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);

      const response = await fetch(webhookUrl, {
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
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        setN8nStatus('connected');
        responseSource = 'n8n';
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await response.json();
          finalReply = 
            data.output || 
            data.text || 
            data.response || 
            data.message || 
            (typeof data === 'string' ? data : JSON.stringify(data));
        } else {
          finalReply = await response.text();
        }
      } else {
        // n8n returned 404 or inactive
        setN8nStatus('not-active');
        finalReply = getLocalConciergeResponse(messageToSend);
      }
    } catch (err: any) {
      // Network failure, CORS, or inactive n8n workflow
      console.warn('n8n connection unfulfilled, activating Lumora intelligence fallback:', err);
      setN8nStatus('not-active');
      finalReply = getLocalConciergeResponse(messageToSend);
    } finally {
      setIsLoading(false);
    }

    if (!finalReply) {
      finalReply = getLocalConciergeResponse(messageToSend);
    }

    const botMessage: ChatMessage = {
      id: 'bot_' + Date.now(),
      sender: 'bot',
      text: finalReply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: responseSource,
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: 'Conversation refreshed. How may I assist your space, desk, or wardrobe today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'fallback',
      }
    ]);
  };

  const saveWebhookUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUrl = tempWebhookUrl.trim();
    if (!cleanUrl) return;
    setWebhookUrl(cleanUrl);
    localStorage.setItem('lumora_n8n_url', cleanUrl);
    setShowConfig(false);
    showToast('n8n Webhook URL updated.');
  };

  const quickPrompts = [
    'Recommend essentials for a quiet desk',
    'What promo codes or discounts are available?',
    'Tell me about the Kanso Travertine Lamp',
    'What is your shipping and return policy?',
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2.5 group cursor-pointer border border-stone-700/30"
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
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[600px] max-h-[85vh] bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 px-5 bg-[#FAF9F6] dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center font-editorial text-lg shadow-sm">
                L
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                    LUMORA Concierge
                  </h3>
                  <span className={`inline-flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-sm ${
                    n8nStatus === 'connected'
                      ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60'
                      : 'text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${n8nStatus === 'connected' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <span>{n8nStatus === 'connected' ? 'n8n Live' : 'Active'}</span>
                  </span>
                </div>
                <p className="text-[10px] text-stone-400 font-light">
                  Simple things. Better living.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowConfig(!showConfig)}
                className={`p-1.5 rounded-lg transition-colors ${
                  showConfig ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-white' : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
                title="Webhook settings & Status"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
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

          {/* Webhook Configuration & Troubleshooting Banner */}
          {showConfig && (
            <div className="p-4 bg-stone-100 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 text-xs space-y-3 animate-in fade-in">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>n8n Webhook Configuration</span>
                  </span>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Make sure your n8n workflow has the <strong>Active toggle switched ON</strong> in the top-right corner of the n8n canvas so production calls respond with 200 OK.
                  </p>
                </div>
              </div>

              <form onSubmit={saveWebhookUrl} className="space-y-2">
                <input
                  type="url"
                  value={tempWebhookUrl}
                  onChange={(e) => setTempWebhookUrl(e.target.value)}
                  placeholder="https://...app.n8n.cloud/webhook/.../chat"
                  className="w-full px-3 py-1.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-xs font-mono"
                  required
                />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-stone-400">
                    Fallback: Built-in LUMORA intelligence is active
                  </span>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold rounded-lg"
                  >
                    Save URL
                  </button>
                </div>
              </form>
            </div>
          )}

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
                <div className="flex items-center gap-1.5 mt-1 px-1 text-[9px] text-stone-400 font-mono">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'bot' && (
                    <span>· {msg.source === 'n8n' ? 'n8n AI' : 'Concierge'}</span>
                  )}
                </div>
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

          {/* Quick Prompts */}
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
                    className="text-left text-[11px] px-2.5 py-1 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-700 dark:text-stone-300 transition-colors cursor-pointer"
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
