"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import data from "../../public/data.json";
import axios from "axios";

// --- HELPER COMPONENT: Expandable Text for Chat Bubble ---
const ExpandableText = ({ text, maxChars = 120 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;
  // If text is short, just show it
  if (text.length <= maxChars) {
    return (
      <p className="font-medium leading-relaxed text-sm text-gray-800">
        {text}
      </p>
    );
  }

  return (
    <div className="font-medium leading-relaxed text-sm text-gray-800">
      <p className="inline">
        {isExpanded ? text : `${text.substring(0, maxChars)}...`}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="ml-1 text-[#FF1C45] font-bold text-xs whitespace-nowrap hover:underline"
      >
        {isExpanded ? "Show less" : "Read more"}
      </button>
    </div>
  );
};

export const Footer = () => {
  const pathname = usePathname();

  // --- Animation States ---
  const [isAnimating, setIsAnimating] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [assistantText, setAssistantText] = useState("");

  // --- Data & Results States ---
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- Speech & Text States ---
  const [userQuery, setUserQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // 1. Text-to-Speech Function
  const speak = (text) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  // 2. Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        recognition.onresult = (event) => {
          let finalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + " ";
            }
          }
          if (finalTranscript) {
            setUserQuery((prev) => prev + finalTranscript);
          }
        };
        recognitionRef.current = recognition;
      }
    }
  }, []);

  // 3. Footer Pulse Loop
  useEffect(() => {
    if (isChatOpen) return;
    const startTimeout = setTimeout(() => triggerAnimation(), 100);
    const interval = setInterval(() => triggerAnimation(), 10000);
    const triggerAnimation = () => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2500);
    };
    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [isChatOpen]);

  // 4. Handle Chat Open/Close
  useEffect(() => {
    if (isChatOpen) {
      setAssistantText("");
      setUserQuery("");
      setRecommendedItems([]);
      setTimeout(() => {
        const greeting = "Hi! What are you craving today?";
        setAssistantText(greeting);
        speak(greeting);
        toggleMic(true);
      }, 800);
    } else {
      if (recognitionRef.current) recognitionRef.current.stop();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [isChatOpen]);

  // 5. Toggle Microphone
  const toggleMic = (forceStart = false) => {
    if (!recognitionRef.current) return;
    if (forceStart === true) {
      recognitionRef.current.start();
    } else if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // 6. HELPER: Search Logic
  const findItemsFromTags = (tagsArray) => {
    const results = [];
    tagsArray.forEach((tagSet) => {
      const serviceName = tagSet[0];
      const categoryName = tagSet[1];
      const itemName = tagSet[2];
      const safeCompare = (a, b) =>
        (a || "").toLowerCase().trim() === (b || "").toLowerCase().trim();

      const serviceData = data.find(
        (s) =>
          safeCompare(s.service, serviceName) ||
          safeCompare(s.store, serviceName),
      );

      if (serviceData && serviceData.data) {
        let categoryItems = serviceData.data[categoryName];
        if (!categoryItems) {
          const foundKey = Object.keys(serviceData.data).find((k) =>
            safeCompare(k, categoryName),
          );
          if (foundKey) categoryItems = serviceData.data[foundKey];
        }

        if (categoryItems) {
          const item = categoryItems.find((i) => safeCompare(i.name, itemName));
          if (item) results.push(item);
        }
      }
    });
    return results;
  };

  // 7. Submit Handler
  const handleSubmit = async () => {
    if (!userQuery.trim()) return;
    setIsProcessing(true);
    if (recognitionRef.current) recognitionRef.current.stop();

    // Call your LOCAL Next.js API route instead of the external URL
    try {
      const response = await axios
        .post("/api/chat", {
          query: userQuery,
        })
        .then((res) => res.data);

      console.log(response);
      setAssistantText(response.assistant_message);
      speak(response.assistant_message);
      const foundItems = findItemsFromTags(response.display_tags);
      setRecommendedItems(foundItems);
    } catch (error) {
      console.error("Chat Error", error);
      setAssistantText("Sorry, I'm having trouble connecting right now.");
      speak("Sorry, I'm having trouble connecting right now.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* =======================================================
          FULL SCREEN VOICE OVERLAY
         ======================================================= */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          isChatOpen
            ? "opacity-100 pointer-events-auto visible bg-black/95 backdrop-blur-xl"
            : "opacity-0 pointer-events-none invisible bg-black/0"
        }`}
      >
        <button
          onClick={() => setIsChatOpen(false)}
          className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2 z-50"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="w-full max-w-md px-6 relative h-screen flex flex-col pt-12">
          {/* --- ASSISTANT BUBBLE --- */}
          <div className="flex flex-col items-center mb-4">
            <div
              className={`relative transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${
                isChatOpen
                  ? recommendedItems.length > 0
                    ? "w-20 h-20 mb-2"
                    : "w-32 h-32 mb-6"
                  : "translate-y-[40vh] scale-50"
              }`}
            >
              <Image
                src="/maskot.png"
                alt="Voice Assistant"
                fill
                className="object-contain drop-shadow-[0_0_50px_rgba(255,28,69,0.3)]"
              />
            </div>

            {/* Speech Bubble */}
            <div
              className={`bg-white text-black px-6 py-4 rounded-3xl rounded-tl-none shadow-[0_0_30px_rgba(255,255,255,0.1)] w-full transform transition-all duration-500 ${
                isChatOpen
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-10 scale-90"
              }`}
            >
              {isProcessing ? (
                <span className="animate-pulse font-medium text-sm">
                  Thinking...
                </span>
              ) : (
                <ExpandableText text={assistantText || "..."} />
              )}
            </div>
          </div>

          {/* --- RECOMMENDED ITEMS GRID --- */}
          {recommendedItems.length > 0 && (
            <div className="flex-1 overflow-y-auto mb-4 -mx-2 px-2 space-y-4 scrollbar-hide">
              <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-2">
                Recommended for you
              </h3>
              {recommendedItems.map((item, idx) => (
                <Link
                  href={`/market/${item.name.replace(/\s+/g, "-").toLowerCase()}`}
                  key={idx}
                  className="block bg-[#1E1E1E] rounded-2xl p-4 flex gap-4 items-start border border-white/10 animate-fade-in-up hover:bg-[#252525] transition-colors cursor-pointer"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="relative w-28 h-28 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-gray-700">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between h-28">
                    <div>
                      <h4 className="text-white text-sm font-bold leading-tight line-clamp-2 mb-1">
                        {item.name}
                      </h4>
                      <p className="text-gray-400 text-xs leading-snug line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[#FF1C45] font-bold text-base">
                        {item.price} QAR
                      </span>
                      <span className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full">
                        ADD
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* --- INPUT AREA --- */}
          <div
            className={`w-full transition-all duration-500 ${recommendedItems.length > 0 ? "mt-0 mb-6" : "mt-auto mb-12"}`}
          >
            {!recommendedItems.length && (
              <div className="h-6 flex items-center justify-center gap-1 mb-4">
                {isListening ? (
                  <>
                    <div className="w-1 bg-[#FF1C45] rounded-full animate-[soundwave_0.5s_ease-in-out_infinite] h-3"></div>
                    <div className="w-1 bg-[#FF1C45] rounded-full animate-[soundwave_0.6s_ease-in-out_infinite_0.1s] h-6"></div>
                    <div className="w-1 bg-[#FF1C45] rounded-full animate-[soundwave_0.4s_ease-in-out_infinite_0.2s] h-4"></div>
                  </>
                ) : (
                  <span className="text-gray-500 text-[10px] tracking-widest uppercase">
                    Mic Paused
                  </span>
                )}
              </div>
            )}

            <div className="relative group">
              <textarea
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder={isListening ? "Listening..." : "Type or speak..."}
                className={`w-full bg-[#1A1A1A] text-white font-medium p-4 pr-24 rounded-[24px] outline-none border border-transparent focus:border-[#FF1C45]/50 focus:bg-[#222] transition-all resize-none shadow-inner placeholder:text-gray-600 ${recommendedItems.length > 0 ? "h-[50px] text-xs pt-3.5" : "h-[120px] text-lg"}`}
              />

              <div className="absolute bottom-2 right-2 flex gap-2">
                <button
                  onClick={() => toggleMic()}
                  className={`p-2.5 rounded-full transition-all ${isListening ? "bg-[#FF1C45] text-white shadow-[0_0_15px_#FF1C45]" : "bg-[#333] text-gray-400 hover:bg-[#444]"}`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                  </svg>
                </button>

                {(userQuery.length > 0 || isListening) && (
                  <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="bg-white text-black p-2.5 rounded-full hover:scale-105 transition-transform shadow-lg disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- NORMAL FOOTER --- */}
      <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 w-[370px] max-w-md bg-[#121212] rounded-full h-16 flex items-center justify-around z-50 shadow-lg border border-[#222]">
        <Link
          className={`flex flex-col items-center justify-center ${pathname === "/" ? "text-primary bg-[#333333]" : "text-[#B4B4B4]"} px-6 py-1 rounded-full transition-all duration-300`}
          href="/"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={pathname === "/" ? "#FF1C45" : "#B4B4B4"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 21V13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1054 14.2652 12 14 12H10C9.73478 12 9.48043 12.1054 9.29289 12.2929C9.10536 12.4804 9 12.7348 9 13V21" />
            <path d="M3 9.99999C2.99993 9.70906 3.06333 9.42161 3.18579 9.15771C3.30824 8.8938 3.4868 8.65979 3.709 8.47199L10.709 2.47199C11.07 2.1669 11.5274 1.99951 12 1.99951C12.4726 1.99951 12.93 2.1669 13.291 2.47199L20.291 8.47199C20.5132 8.65979 20.6918 8.8938 20.8142 9.15771C20.9367 9.42161 21.0001 9.70906 21 9.99999V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V9.99999Z" />
          </svg>
          <p className="text-xs font-medium">Order</p>
        </Link>
        <div
          onClick={() => setIsChatOpen(true)}
          className="relative w-20 flex flex-col items-center justify-end -top-2 cursor-pointer group"
        >
          <div
            className={`absolute bottom-[85px] z-10 bg-[#D9D9D9] whitespace-nowrap rounded-full text-sm px-3 py-1 text-black font-semibold shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${!isChatOpen && isAnimating ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-50 translate-y-8"}`}
          >
            Ask Snoonu
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[#D9D9D9]">
              <svg width="10" height="6" viewBox="0 0 7 6" fill="currentColor">
                <path d="M0 5.92261L0.752075 0H6.51805L0 5.92261Z" />
              </svg>
            </span>
          </div>
          <div className="relative w-[78px] h-[74px] flex items-center justify-center">
            <Image
              src="/maskot.png"
              alt="maskot"
              width={78}
              height={74}
              className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom ${!isChatOpen && isAnimating ? "scale-125 drop-shadow-2xl" : "scale-100"} ${isChatOpen ? "opacity-0 scale-0" : "opacity-100"}`}
            />
          </div>
        </div>
        <Link
          className={`flex flex-col items-center justify-center ${pathname.includes("/profile") ? "text-primary bg-[#333333]" : "text-[#B4B4B4]"} px-6 py-1 rounded-full transition-all duration-300`}
          href="/profile"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            stroke={pathname.includes("/profile") ? "#FF1C45" : "#B4B4B4"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 23.3333C21 21.4767 20.2625 19.6963 18.9497 18.3835C17.637 17.0708 15.8565 16.3333 14 16.3333C12.1435 16.3333 10.363 17.0708 9.05025 18.3835C7.7375 19.6963 7 21.4767 7 23.3333" />
            <path d="M14 16.3333C16.5774 16.3333 18.6667 14.244 18.6667 11.6667C18.6667 9.08934 16.5774 7 14 7C11.4227 7 9.33337 9.08934 9.33337 11.6667C9.33337 14.244 11.4227 16.3333 14 16.3333Z" />
            <path d="M14 25.6666C20.4434 25.6666 25.6667 20.4432 25.6667 13.9999C25.6667 7.5566 20.4434 2.33325 14 2.33325C7.55672 2.33325 2.33337 7.5566 2.33337 13.9999C2.33337 20.4432 7.55672 25.6666 14 25.6666Z" />
          </svg>
          <span className="text-xs font-medium">Profile</span>
        </Link>
      </div>

      <style jsx global>{`
        @keyframes soundwave {
          0%,
          100% {
            height: 30%;
            opacity: 0.5;
          }
          50% {
            height: 100%;
            opacity: 1;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
};
