import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ShoppingCart, RotateCcw, Gift } from "lucide-react";
import type { ChatMessage, Product } from "../types";
import { getTherapyResponse } from "../data/responses";
import { getProduct, PRODUCTS } from "../data/products";
import { POPUP_MESSAGES } from "../data/popups";
import { getSeverity } from "../utils/severity";
import { ProductCard } from "./ProductCard";
import { EmotionalMeter } from "./EmotionalMeter";
import { CountdownTimer } from "./CountdownTimer";
import { FakePopup } from "./FakePopup";
import { LiveActivityFeed } from "./LiveActivityFeed";
import { SpinWheel } from "./SpinWheel";
import { TherapyBundle } from "./TherapyBundle";
import { Confetti } from "./Confetti";

const SUGGESTIONS = [
  "I feel lonely",
  "My boyfriend dumped me",
  "I'm burnt out",
  "I have no purpose",
  "I feel empty",
];

interface TherapyChatProps {
  onBack: () => void;
}

interface ActivePopup {
  id: string;
  message: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export function TherapyChat({ onBack }: TherapyChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Welcome to Temu Therapist™. I'm not licensed, but I AM 74% off. Tell me what's hurting you emotionally so I can recommend products.",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [popups, setPopups] = useState<ActivePopup[]>([]);
  const [showWheel, setShowWheel] = useState(false);
  const [showBundle, setShowBundle] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [chaosLevel, setChaosLevel] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const severity = getSeverity(userMessageCount);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, scrollToBottom]);

  useEffect(() => {
    if (userMessageCount === 0) return;
    const popupInterval = setInterval(() => {
      if (Math.random() > 0.4 - chaosLevel * 0.05) {
        const msg = POPUP_MESSAGES[Math.floor(Math.random() * POPUP_MESSAGES.length)];
        const positions: ActivePopup["position"][] = ["top-left", "top-right", "bottom-left", "bottom-right"];
        setPopups((prev) => [
          ...prev.slice(-2),
          {
            id: `${Date.now()}-${Math.random()}`,
            message: msg,
            position: positions[Math.floor(Math.random() * positions.length)],
          },
        ]);
      }
    }, 5000 - chaosLevel * 400);
    return () => clearInterval(popupInterval);
  }, [userMessageCount, chaosLevel]);

  useEffect(() => {
    if (userMessageCount >= 3 && userMessageCount % 3 === 0) {
      setShowBundle(true);
    }
    if (userMessageCount >= 2 && Math.random() > 0.6) {
      setShowWheel(true);
    }
  }, [userMessageCount]);

  const dismissPopup = (id: string) => {
    setPopups((prev) => prev.filter((p) => p.id !== id));
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setChaosLevel((c) => c + 1);

    let advice = "";
    let reasoning: string | undefined;
    let products: Product[] = [];
    let isLive = false;
    const minDelay = new Promise((r) => setTimeout(r, 1200));

    try {
      const ac = new AbortController();
      const timeoutId = setTimeout(() => ac.abort(), 25000);
      const apiRes = await fetch("/api/temu-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
        signal: ac.signal,
      });
      clearTimeout(timeoutId);

      if (apiRes.ok) {
        const data = (await apiRes.json()) as {
          advice?: string;
          reasoning?: string;
          products?: Product[];
          fallback?: boolean;
        };
        if (!data.fallback && data.advice && data.products && data.products.length > 0) {
          advice = data.advice;
          reasoning = data.reasoning;
          products = data.products;
          isLive = true;
        }
      }
    } catch {
      // network error / timeout → fall through to canned
    }

    if (!isLive) {
      const response = getTherapyResponse(trimmed);
      advice = response.advice;
      reasoning = response.reasoning;
      products = response.productIds
        .map((id) => getProduct(id))
        .filter((p): p is Product => p !== undefined);
    }

    await minDelay;

    const fullText = reasoning ? `${advice}\n\n${reasoning}` : advice;

    const assistantMsg: ChatMessage = {
      id: `ai-${Date.now()}`,
      role: "assistant",
      text: fullText,
      products,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setTyping(false);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 100);
  };

  const bundleProducts = [...PRODUCTS].sort(() => Math.random() - 0.5).slice(0, 6);

  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-gradient-to-b from-orange-50 to-white">
      <Confetti active={confetti} />

      <header className="sticky top-0 z-40 border-b-4 border-black bg-orange-500 px-3 py-2 shadow-[0_4px_0_#000] sm:px-4 sm:py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 sm:gap-3">
          <div className="min-w-0">
            <h1 className="font-display text-base text-white drop-shadow-[2px_2px_0_#000] sm:text-2xl">
              Temu Therapist
            </h1>
            <p className="hidden text-xs font-bold text-yellow-200 sm:block">Healing. But affordable.</p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="sm:hidden">
              <CountdownTimer compact />
            </div>
            <div className="hidden sm:block">
              <CountdownTimer />
            </div>
            <motion.div
              className="flex items-center gap-1.5 rounded-full border-2 border-black bg-white px-3 py-1.5 font-black sm:gap-2 sm:px-4 sm:py-2"
              animate={cartCount > 0 ? { scale: [1, 1.1, 1] } : {}}
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">{cartCount}</span>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-4 px-3 py-3 sm:px-4 sm:py-4">
        <LiveActivityFeed />

        <main className="flex min-w-0 flex-1 flex-col">
          <EmotionalMeter level={severity.level} percent={severity.percent} />

          <div
            className={`mt-3 flex min-h-0 flex-1 flex-col rounded-xl border-[3px] border-black bg-white shadow-[4px_4px_0_#000] sm:mt-4 sm:rounded-2xl sm:border-4 sm:shadow-[6px_6px_0_#000] ${
              chaosLevel >= 3 ? "animate-pulse-glow" : ""
            }`}
          >
            <div className="min-h-[300px] flex-1 overflow-y-auto p-3 scrollbar-hide sm:p-4">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`mb-3 flex sm:mb-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl px-3 py-2.5 sm:max-w-[85%] sm:px-4 sm:py-3 ${
                        msg.role === "user"
                          ? "rounded-br-sm bg-orange-500 font-semibold text-white"
                          : "rounded-bl-sm border-2 border-orange-200 bg-orange-50 text-gray-900"
                      }`}
                    >
                      {msg.role === "assistant" && (
                        <span className="mb-1 block text-[10px] font-black uppercase text-orange-600">
                          🧠 AI Therapist (not real)
                        </span>
                      )}
                      <p className="whitespace-pre-wrap text-sm leading-snug">{msg.text}</p>
                      {msg.products && msg.products.length > 0 && (
                        <div className="mt-3 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                          {msg.products.map((product, i) => (
                            <ProductCard
                              key={product.id}
                              product={product}
                              index={i}
                              onAddToCart={() => {
                                setCartCount((c) => c + 1);
                                setConfetti(true);
                                setTimeout(() => setConfetti(false), 50);
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {typing && (
                <motion.div
                  className="mb-4 flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div className="rounded-2xl rounded-bl-sm border-2 border-orange-200 bg-orange-50 px-4 py-3">
                    <span className="text-[10px] font-black uppercase text-orange-600">Analyzing trauma...</span>
                    <div className="mt-2 flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-2 w-2 rounded-full bg-orange-500"
                          animate={{ y: [0, -6, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                    <motion.div
                      className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-200"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="h-full bg-orange-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2 }}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {userMessageCount === 0 && (
              <div className="flex flex-wrap gap-1.5 border-t-2 border-orange-100 px-3 py-2 sm:gap-2 sm:px-4">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => sendMessage(s)}
                    className="rounded-full border-2 border-orange-400 bg-orange-100 px-2.5 py-1 text-[11px] font-bold text-orange-800 hover:bg-orange-200 sm:px-3 sm:text-xs"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              className="flex gap-2 border-t-4 border-black p-3 sm:p-4"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your emotional damage..."
                className="min-w-0 flex-1 rounded-xl border-[3px] border-black px-3 py-3 text-base font-semibold outline-none focus:ring-4 focus:ring-neon-green/50 sm:border-4 sm:px-4"
                disabled={typing}
              />
              <motion.button
                type="submit"
                disabled={typing || !input.trim()}
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl border-[3px] border-black bg-neon-green px-3 py-3 font-black uppercase shadow-[3px_3px_0_#000] disabled:opacity-50 sm:border-4 sm:px-5 sm:shadow-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Send"
              >
                <Send className="h-5 w-5" />
                <span className="hidden sm:inline">Heal</span>
              </motion.button>
            </form>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 pb-safe sm:mt-4">
            <button
              type="button"
              onClick={() => setShowWheel(true)}
              className="animate-float rounded-lg border-2 border-black bg-gold px-3 py-2 text-[11px] font-black uppercase shadow-[3px_3px_0_#000] sm:px-4 sm:text-xs"
            >
              🎡 Spin Wheel
            </button>
            <button
              type="button"
              onClick={() => setShowBundle(true)}
              className="rounded-lg border-2 border-black bg-purple-400 px-3 py-2 text-[11px] font-black uppercase text-white shadow-[3px_3px_0_#000] sm:px-4 sm:text-xs"
            >
              <Gift className="inline h-3.5 w-3.5 sm:h-4 sm:w-4" /> Bundle
            </button>
            <button
              type="button"
              onClick={onBack}
              className="ml-auto rounded-lg border-2 border-gray-400 px-3 py-2 text-[11px] font-bold text-gray-600 sm:px-4 sm:text-xs"
            >
              <RotateCcw className="inline h-3.5 w-3.5 sm:h-4 sm:w-4" /> Escape
            </button>
          </div>
        </main>
      </div>

      {popups.map((popup) => (
        <FakePopup
          key={popup.id}
          message={popup.message}
          position={popup.position}
          onDismiss={() => dismissPopup(popup.id)}
        />
      ))}

      <AnimatePresence>
        {showWheel && <SpinWheel onClose={() => setShowWheel(false)} />}
      </AnimatePresence>

      {showBundle && (
        <TherapyBundle products={bundleProducts} onDismiss={() => setShowBundle(false)} />
      )}

      {chaosLevel >= 4 && (
        <motion.button
          type="button"
          className="fixed bottom-3 left-3 z-30 animate-shake rounded-full border-[3px] border-black bg-red-600 px-4 py-3 text-sm font-black text-white shadow-lg sm:bottom-4 sm:left-4 sm:border-4 sm:px-6 sm:py-4 sm:text-base"
          onClick={() => setShowWheel(true)}
        >
          SPIN NOW
        </motion.button>
      )}
    </div>
  );
}
