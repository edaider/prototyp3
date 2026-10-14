"use client";

import { useState, useRef, useEffect, FormEvent, ReactNode } from "react";
import { Send, X, Bot, Sparkles } from "lucide-react";

export type Message = {
  id: string;
  sender: "edda" | "user";
  title?: string;
  text: string;
};

type Props = {
  messages: Message[];
  loading?: boolean;
  onSendMessage?: (text: string) => void;
  quickActions?: ReactNode;
  subtitle?: string;
};

export function AITutorShell({
  messages,
  loading = false,
  onSendMessage,
  quickActions,
  subtitle = "Din AI-handledare",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, loading]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSendMessage?.(input.trim());
    setInput("");
  }

  return (
    <div className="relative">
      {/* HOVNARREN/EDDA - PLACERAD HÖGST UPP TILL HÖGER */}
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex flex-col items-center focus:outline-none"
        >
          {/* Ljusglöd bakom ikonen */}
          <div className="absolute -inset-2 rounded-full bg-amber-400/30 blur-md transition-all group-hover:bg-amber-400/50 group-hover:blur-lg" />

          {/* Bilden på hovnarren/AItutor */}
          <img
            src="/images/AItutor.png"
            alt="Edda AI-lärare"
            className="relative h-24 w-24 sm:h-26 sm:w-26 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110 active:scale-95"
          />

          <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-stone-600 transition-colors group-hover:text-amber-900">
            <Sparkles className="h-3 w-3 text-amber-600" />
            <span>Klicka för en tanke</span>
          </div>
        </button>
      </div>

      {/* FLYTANDE CHATTMODAL */}
      {isOpen && (
        <aside className="fixed bottom-6 right-6 z-50 flex h-[520px] w-80 sm:w-96 flex-col overflow-hidden rounded-2xl border-2 border-amber-900/40 bg-white/98 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-amber-900/10 bg-gradient-to-r from-amber-50 via-stone-50 to-amber-100/50 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-amber-900 text-amber-100 shadow-xs">
                <Bot className="h-4 w-4" />
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900 leading-none">
                  Edda
                </h3>
                <span className="text-[10px] font-medium text-stone-500">
                  {subtitle}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-stone-400 hover:bg-stone-200/60 hover:text-stone-700 transition"
              aria-label="Stäng chatt"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {quickActions && (
            <div className="flex items-center justify-center gap-2 border-b border-amber-900/10 bg-amber-50/50 p-2">
              {quickActions}
            </div>
          )}

          {/* Meddelandelista */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-xs sm:text-sm bg-stone-50/50">
            {messages.map((msg) => {
              const isEdda = msg.sender === "edda";
              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    isEdda ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-xs ${
                      isEdda
                        ? "rounded-tl-none border border-amber-900/10 bg-white text-stone-800"
                        : "rounded-tr-none bg-amber-800 text-amber-50 font-medium"
                    }`}
                  >
                    {msg.title && (
                      <div className="mb-1 text-[11px] font-bold tracking-wide uppercase text-amber-900/80">
                        {msg.title}
                      </div>
                    )}
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-none border border-amber-900/10 bg-white px-3.5 py-2 text-xs italic text-stone-500 shadow-xs">
                  <Bot className="h-3.5 w-3.5 animate-bounce text-amber-700" />
                  <span>Edda klurar...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input-fält */}
          {onSendMessage && (
            <form
              onSubmit={handleSubmit}
              className="border-t border-amber-900/10 bg-white p-3"
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Fråga Edda..."
                  disabled={loading}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 py-2.5 pl-3.5 pr-10 text-xs sm:text-sm text-stone-800 outline-none transition focus:border-amber-600 focus:bg-white focus:ring-1 focus:ring-amber-600/20 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="absolute right-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-amber-800 text-amber-100 transition hover:bg-amber-900 disabled:opacity-40"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          )}
        </aside>
      )}
    </div>
  );
}