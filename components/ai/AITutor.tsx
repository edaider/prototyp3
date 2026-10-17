
"use client";

import {
  useState,
  useRef,
  useEffect,
  FormEvent,
  ReactNode,
  KeyboardEvent,
} from "react";
import {
  Send,
  X,
  Bot,
  Sparkles,
  BookOpen,
  MessageCircle,
} from "lucide-react";

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
  placeholder?: string;
  welcomeMessage?: string;
};

export function AITutorShell({
  messages,
  loading = false,
  onSendMessage,
  quickActions,
  subtitle = "Din AI-handledare",
  placeholder = "Fråga Edda...",
  welcomeMessage,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, isOpen, loading]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const text = input.trim();

    if (!text || loading || !onSendMessage) return;

    onSendMessage(text);
    setInput("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <div className="relative">
      {/* EDDA – ÖPPNA OCH STÄNG CHATTEN */}
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={
            isOpen ? "Stäng chatten med Edda" : "Öppna chatten med Edda"
          }
          className="
            group relative flex flex-col items-center
            rounded-2xl focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-amber-600
            focus-visible:ring-offset-4
          "
        >
          {/* Ljusglöd */}
          <div
            className="
              absolute -inset-2 rounded-full
              bg-amber-400/30 blur-md
              transition-all group-hover:bg-amber-400/50
              group-hover:blur-lg
            "
            aria-hidden="true"
          />

          {/* Eddas bild */}
          <img
            src="/images/AItutor.png"
            alt=""
            className="
              relative h-24 w-24 object-contain drop-shadow-md
              transition-transform duration-300
              group-hover:scale-110
              group-active:scale-95
              sm:h-26 sm:w-26
            "
          />

          <div
            className="
              mt-1 flex items-center gap-1
              text-[11px] font-medium text-stone-600
              transition-colors group-hover:text-amber-900
            "
          >
            <Sparkles className="h-3 w-3 text-amber-600" />
            <span>{isOpen ? "Stäng Edda" : "Klicka för en tanke"}</span>
          </div>
        </button>
      </div>

      {/* FLYTANDE CHATTMODAL */}
      {isOpen && (
        <>
          {/* Bakgrund för små skärmar */}
          <button
            type="button"
            aria-label="Stäng chatten"
            onClick={() => setIsOpen(false)}
            className="
              fixed inset-0 z-40 bg-black/20
              sm:bg-transparent
            "
          />

          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Chatta med Edda"
            className="
              fixed inset-x-3 bottom-3 z-50
              flex h-[min(600px,85dvh)] flex-col
              overflow-hidden rounded-2xl
              border-2 border-amber-900/40
              bg-white shadow-2xl
              sm:inset-x-auto sm:bottom-6 sm:right-6
              sm:h-[520px] sm:w-96
              backdrop-blur-xl
            "
          >
            {/* HEADER */}
            <div
              className="
                flex shrink-0 items-center justify-between
                border-b border-amber-900/10
                bg-gradient-to-r from-amber-50
                via-stone-50 to-amber-100/50
                px-4 py-3
              "
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="
                    relative flex h-9 w-9 items-center
                    justify-center rounded-full
                    bg-amber-900 text-amber-100 shadow-sm
                  "
                >
                  <Bot className="h-4 w-4" />

                  <span
                    className="
                      absolute bottom-0 right-0 h-2.5 w-2.5
                      rounded-full bg-emerald-500
                      ring-2 ring-white
                    "
                    aria-label="Edda är tillgänglig"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold leading-none text-stone-900">
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
                className="
                  rounded-lg p-2 text-stone-400
                  transition hover:bg-stone-200/60
                  hover:text-stone-700
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-amber-600
                "
                aria-label="Stäng chatt"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* SNABBKNAPPAR */}
            {quickActions && (
              <div
                className="
                  flex shrink-0 flex-wrap items-center
                  justify-center gap-2 border-b
                  border-amber-900/10 bg-amber-50/50 p-2
                "
              >
                {quickActions}
              </div>
            )}

            {/* MEDDELANDEN */}
            <div
              className="
                flex-1 space-y-3 overflow-y-auto
                bg-stone-50/70 p-4 text-xs
                sm:text-sm
              "
              aria-label="Meddelanden"
              aria-live="polite"
              aria-relevant="additions"
            >
              {/* Valfritt välkomstmeddelande */}
              {welcomeMessage && messages.length === 0 && (
                <div className="flex justify-start">
                  <div
                    className="
                      max-w-[90%] rounded-2xl rounded-tl-none
                      border border-amber-900/10
                      bg-white px-3.5 py-3
                      leading-relaxed text-stone-800 shadow-sm
                    "
                  >
                    <div className="mb-1 flex items-center gap-1.5 font-bold text-amber-900">
                      <Sparkles className="h-3.5 w-3.5" />
                      Edda
                    </div>

                    <p className="whitespace-pre-wrap">{welcomeMessage}</p>
                  </div>
                </div>
              )}

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
                      className={`
                        max-w-[88%] rounded-2xl px-3.5 py-2.5
                        leading-relaxed shadow-sm
                        ${
                          isEdda
                            ? "rounded-tl-none border border-amber-900/10 bg-white text-stone-800"
                            : "rounded-tr-none bg-amber-800 font-medium text-amber-50"
                        }
                      `}
                    >
                      {isEdda && (
                        <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-amber-900/80">
                          <Bot className="h-3.5 w-3.5" />
                          {msg.title || "Edda"}
                        </div>
                      )}

                      {!isEdda && msg.title && (
                        <div className="mb-1 text-[10px] font-bold uppercase tracking-wide text-amber-100/80">
                          {msg.title}
                        </div>
                      )}

                      <p className="whitespace-pre-wrap break-words">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* LADDNINGSINDIKATOR */}
              {loading && (
                <div className="flex justify-start">
                  <div
                    className="
                      flex items-center gap-2 rounded-2xl
                      rounded-tl-none border border-amber-900/10
                      bg-white px-3.5 py-3
                      text-xs text-stone-500 shadow-sm
                    "
                    role="status"
                  >
                    <Bot className="h-4 w-4 animate-bounce text-amber-700" />
                    <span>Edda klurar...</span>
                  </div>
                </div>
              )}

              {/* Tomt läge */}
              {!welcomeMessage && messages.length === 0 && !loading && (
                <div className="flex h-full min-h-32 flex-col items-center justify-center gap-2 px-4 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                    <MessageCircle className="h-5 w-5" />
                  </div>

                  <p className="font-bold text-stone-700">
                    Vad funderar du på?
                  </p>

                  <p className="max-w-56 text-xs leading-relaxed text-stone-500">
                    Jag hjälper dig att förstå, tänka vidare och utveckla dina
                    svar.
                  </p>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* INMATNINGSFÄLT */}
            {onSendMessage && (
              <form
                onSubmit={handleSubmit}
                className="
                  shrink-0 border-t border-amber-900/10
                  bg-white p-3
                "
              >
                <label htmlFor="edda-message" className="sr-only">
                  Skriv ett meddelande till Edda
                </label>

                <div className="relative flex items-center">
                  <input
                    ref={inputRef}
                    id="edda-message"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={loading}
                    autoComplete="off"
                    maxLength={4000}
                    className="
                      w-full rounded-xl border border-stone-200
                      bg-stone-50 py-3 pl-3.5 pr-12
                      text-sm text-stone-800 outline-none
                      transition placeholder:text-stone-400
                      focus:border-amber-600 focus:bg-white
                      focus:ring-2 focus:ring-amber-600/20
                      disabled:opacity-50
                    "
                  />

                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    aria-label="Skicka meddelande"
                    className="
                      absolute right-1.5 flex h-8 w-8
                      items-center justify-center rounded-lg
                      bg-amber-800 text-amber-100
                      transition hover:bg-amber-900
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-amber-600
                      disabled:cursor-not-allowed disabled:opacity-40
                    "
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-1.5 px-1 text-[10px] text-stone-400">
                  Edda hjälper dig att lära dig – ett steg i taget.
                </p>
              </form>
            )}
          </aside>
        </>
      )}
    </div>
  );
}
