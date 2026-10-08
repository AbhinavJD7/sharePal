"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";

interface Message {
  id: string;
  sender: "agent" | "user";
  text: string;
  time: string;
}

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [greenOnTop, setGreenOnTop] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Looping layer-swap animation: green comes on top of blue, then blue on top of green
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setGreenOnTop((prev) => !prev);
      }, 250);
      setTimeout(() => {
        setIsAnimating(false);
      }, 550);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "agent",
      text: "Hi there! 👋 Looking for a specific console or accessories?",
      time: "Just now",
    },
    {
      id: "2",
      sender: "agent",
      text: "I can help you check availability, delivery to your Bangalore pincode, or rental dates!",
      time: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setIsTyping(true);

    // Simulated Smart Reply
    setTimeout(() => {
      let reply =
        "Our team is ready to dispatch gaming consoles across Bangalore! Do you need delivery by this weekend?";
      const lower = text.toLowerCase();
      if (lower.includes("ps5") || lower.includes("playstation")) {
        reply =
          "We have PS5 Slim & Disc editions in stock with FC25/26 and extra controllers! Doorstep delivery available in 2 hours.";
      } else if (lower.includes("deposit") || lower.includes("security")) {
        reply =
          "Great news! SharePal offers 100% Zero Security Deposit on gaming consoles with simple instant KYC.";
      } else if (lower.includes("delivery") || lower.includes("bangalore")) {
        reply =
          "We deliver across all Bangalore areas (Indiranagar, Koramangala, Whitefield, HSR, Bellandur, etc.) between 10 AM - 9 PM.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "agent",
          text: reply,
          time: "Just now",
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  const quickChips = [
    "Rent PS5 Console",
    "Zero Security Deposit?",
    "Bangalore Delivery Areas",
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Expanded Support Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="SharePal Support Chat"
          className="w-[320px] sm:w-[350px] h-[460px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden mb-3 animate-in slide-in-from-bottom-3 duration-200"
        >
          {/* Green Header */}
          <div className="bg-[#00d632] text-white p-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 shadow-xs overflow-hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 500 500"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <defs>
                      <clipPath id="header-chat-clip">
                        <rect width="500" height="500" x="0" y="0"></rect>
                      </clipPath>
                    </defs>
                    <g clipPath="url(#header-chat-clip)">
                      <g transform="matrix(1,0,0,1,228.48,224.22)">
                        <path
                          fill="#9DFF00"
                          d="M-64.81,87.93 C-61.46,86.7 -57.74,86.99 -54.63,88.74 C-37.99,98.24 -19.16,103.2 0,103.12 C59.24,103.12 107.29,56.98 107.29,0 C107.29,-56.98 59.24,-103.12 0,-103.12 C-59.23,-103.12 -107.29,-56.98 -107.29,0 C-107.3,16.96 -103,33.64 -94.75,48.46 C-93.02,51.49 -92.59,55.09 -93.57,58.44 L-104.77,94.93 C-105.47,97.2 -104.19,99.6 -101.93,100.3 C-101.04,100.57 -100.09,100.55 -99.21,100.24 L-64.81,87.93 Z"
                        />
                      </g>
                      <g transform="matrix(1,0,0,1,271.45,275.96)">
                        <path
                          fill="#1845E7"
                          d="M64.8,87.77 C61.46,86.55 57.75,86.84 54.64,88.58 C38,98.07 19.16,103.02 0,102.94 C-59.24,102.94 -107.29,56.88 -107.29,0 C-107.29,-56.88 -59.24,-102.95 0,-102.95 C59.24,-102.95 107.29,-56.9 107.29,0 C107.3,16.93 102.99,33.58 94.75,48.38 C93.02,51.4 92.59,55.01 93.58,58.36 L104.75,94.76 C105.44,97.03 104.17,99.43 101.9,100.13 C101.01,100.4 100.07,100.38 99.2,100.07 L64.8,87.77 Z"
                        />
                      </g>
                      <g fill="#FFFFFF">
                        <circle cx="219.89" cy="266.95" r="17.19" />
                        <circle cx="271.45" cy="261.14" r="17.19" />
                        <circle cx="323.02" cy="256.93" r="17.19" />
                      </g>
                    </g>
                  </svg>
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-300 border-2 border-[#00d632] rounded-full" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight leading-tight">
                  SharePal Support
                </h3>
                <p className="text-[11px] text-emerald-100 font-medium">
                  Online • Replies instantly
                </p>
              </div>
            </div>

            {/* Minimize / Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-black/10 text-white transition cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#f8fafc] text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl shadow-2xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#4e1173] text-white rounded-br-xs"
                      : "bg-white text-gray-800 border border-gray-100 rounded-bl-xs"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`text-[9px] block text-right mt-1 ${
                      msg.sender === "user" ? "text-purple-200" : "text-gray-400"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 justify-start">
                <div className="bg-white border border-gray-100 text-gray-400 px-3 py-2 rounded-2xl rounded-bl-xs flex items-center gap-1 shadow-2xs">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}

            {/* Quick Suggestions Chips */}
            <div className="pt-2">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                Quick Questions
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickChips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSendMessage(chip)}
                    className="px-2.5 py-1 bg-white hover:bg-emerald-50 hover:border-emerald-200 border border-gray-200 rounded-full text-[11px] text-gray-700 transition cursor-pointer text-left shadow-2xs"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <div ref={messagesEndRef} />
          </div>

          {/* Reply Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-white border-t border-gray-100 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00d632] text-gray-900"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-8 h-8 rounded-full bg-[#00d632] hover:bg-[#00c02c] active:scale-95 text-white flex items-center justify-center transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Animated Dual Bubble Mascot (No white circle container, authentic SharePal look) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer relative filter drop-shadow-lg"
        aria-label={isOpen ? "Close Support Chat" : "Open Support Chat"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full overflow-visible select-none pointer-events-none"
        >
          <defs>
            <clipPath id="chat-fab-clip">
              <rect width="500" height="500" x="0" y="0"></rect>
            </clipPath>
          </defs>

          <g clipPath="url(#chat-fab-clip)">
            {greenOnTop ? (
              <>
                {/* 1. Blue Bubble in the Back */}
                <g
                  className="transition-all duration-500 ease-out"
                  style={{
                    transformOrigin: "271px 275px",
                    transform: isAnimating
                      ? "scale(0.9) translate(12px, 12px)"
                      : "scale(0.96) translate(0px, 0px)",
                  }}
                >
                  <g transform="matrix(1,0,0,1,271.45,275.96)">
                    <path
                      fill="#1845E7"
                      d="M64.8,87.77 C61.46,86.55 57.75,86.84 54.64,88.58 C38,98.07 19.16,103.02 0,102.94 C-59.24,102.94 -107.29,56.88 -107.29,0 C-107.29,-56.88 -59.24,-102.95 0,-102.95 C59.24,-102.95 107.29,-56.9 107.29,0 C107.3,16.93 102.99,33.58 94.75,48.38 C93.02,51.4 92.59,55.01 93.58,58.36 L104.75,94.76 C105.44,97.03 104.17,99.43 101.9,100.13 C101.01,100.4 100.07,100.38 99.2,100.07 L64.8,87.77 Z"
                    />
                  </g>
                  {/* Blue Bubble Typing Dots */}
                  <g fill="#FFFFFF">
                    <circle cx="219.89" cy="266.95" r="17.19">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 -16; 0 0; 0 0"
                        keyTimes="0; 0.25; 0.5; 1"
                        dur="1.2s"
                        repeatCount="indefinite"
                        begin="0s"
                      />
                    </circle>
                    <circle cx="271.45" cy="261.14" r="17.19">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 -16; 0 0; 0 0"
                        keyTimes="0; 0.25; 0.5; 1"
                        dur="1.2s"
                        repeatCount="indefinite"
                        begin="0.2s"
                      />
                    </circle>
                    <circle cx="323.02" cy="256.93" r="17.19">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 -16; 0 0; 0 0"
                        keyTimes="0; 0.25; 0.5; 1"
                        dur="1.2s"
                        repeatCount="indefinite"
                        begin="0.4s"
                      />
                    </circle>
                  </g>
                </g>

                {/* 2. Green Bubble in the Front */}
                <g
                  className="transition-all duration-500 ease-out"
                  style={{
                    transformOrigin: "228px 224px",
                    transform: isAnimating
                      ? "scale(1.12) translate(-8px, -8px)"
                      : "scale(1.04) translate(0px, 0px)",
                  }}
                >
                  <g transform="matrix(1,0,0,1,228.48,224.22)">
                    <path
                      fill="#9DFF00"
                      d="M-64.81,87.93 C-61.46,86.7 -57.74,86.99 -54.63,88.74 C-37.99,98.24 -19.16,103.2 0,103.12 C59.24,103.12 107.29,56.98 107.29,0 C107.29,-56.98 59.24,-103.12 0,-103.12 C-59.23,-103.12 -107.29,-56.98 -107.29,0 C-107.3,16.96 -103,33.64 -94.75,48.46 C-93.02,51.49 -92.59,55.09 -93.57,58.44 L-104.77,94.93 C-105.47,97.2 -104.19,99.6 -101.93,100.3 C-101.04,100.57 -100.09,100.55 -99.21,100.24 L-64.81,87.93 Z"
                    />
                  </g>
                  {/* Green Bubble Typing Dots */}
                  <g fill="#FFFFFF">
                    <circle cx="176.92" cy="230.03" r="17.19">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 -16; 0 0; 0 0"
                        keyTimes="0; 0.25; 0.5; 1"
                        dur="1.2s"
                        repeatCount="indefinite"
                        begin="0s"
                      />
                    </circle>
                    <circle cx="228.48" cy="224.22" r="17.19">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 -16; 0 0; 0 0"
                        keyTimes="0; 0.25; 0.5; 1"
                        dur="1.2s"
                        repeatCount="indefinite"
                        begin="0.2s"
                      />
                    </circle>
                    <circle cx="280.04" cy="220.01" r="17.19">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 -16; 0 0; 0 0"
                        keyTimes="0; 0.25; 0.5; 1"
                        dur="1.2s"
                        repeatCount="indefinite"
                        begin="0.4s"
                      />
                    </circle>
                  </g>
                </g>
              </>
            ) : (
              <>
                {/* 1. Green Bubble in the Back */}
                <g
                  className="transition-all duration-500 ease-out"
                  style={{
                    transformOrigin: "228px 224px",
                    transform: isAnimating
                      ? "scale(0.9) translate(-12px, -12px)"
                      : "scale(0.96) translate(0px, 0px)",
                  }}
                >
                  <g transform="matrix(1,0,0,1,228.48,224.22)">
                    <path
                      fill="#9DFF00"
                      d="M-64.81,87.93 C-61.46,86.7 -57.74,86.99 -54.63,88.74 C-37.99,98.24 -19.16,103.2 0,103.12 C59.24,103.12 107.29,56.98 107.29,0 C107.29,-56.98 59.24,-103.12 0,-103.12 C-59.23,-103.12 -107.29,-56.98 -107.29,0 C-107.3,16.96 -103,33.64 -94.75,48.46 C-93.02,51.49 -92.59,55.09 -93.57,58.44 L-104.77,94.93 C-105.47,97.2 -104.19,99.6 -101.93,100.3 C-101.04,100.57 -100.09,100.55 -99.21,100.24 L-64.81,87.93 Z"
                    />
                  </g>
                  {/* Green Bubble Typing Dots */}
                  <g fill="#FFFFFF">
                    <circle cx="176.92" cy="230.03" r="17.19">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 -16; 0 0; 0 0"
                        keyTimes="0; 0.25; 0.5; 1"
                        dur="1.2s"
                        repeatCount="indefinite"
                        begin="0s"
                      />
                    </circle>
                    <circle cx="228.48" cy="224.22" r="17.19">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 -16; 0 0; 0 0"
                        keyTimes="0; 0.25; 0.5; 1"
                        dur="1.2s"
                        repeatCount="indefinite"
                        begin="0.2s"
                      />
                    </circle>
                    <circle cx="280.04" cy="220.01" r="17.19">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 -16; 0 0; 0 0"
                        keyTimes="0; 0.25; 0.5; 1"
                        dur="1.2s"
                        repeatCount="indefinite"
                        begin="0.4s"
                      />
                    </circle>
                  </g>
                </g>

                {/* 2. Blue Bubble in the Front */}
                <g
                  className="transition-all duration-500 ease-out"
                  style={{
                    transformOrigin: "271px 275px",
                    transform: isAnimating
                      ? "scale(1.12) translate(8px, 8px)"
                      : "scale(1.04) translate(0px, 0px)",
                  }}
                >
                  <g transform="matrix(1,0,0,1,271.45,275.96)">
                    <path
                      fill="#1845E7"
                      d="M64.8,87.77 C61.46,86.55 57.75,86.84 54.64,88.58 C38,98.07 19.16,103.02 0,102.94 C-59.24,102.94 -107.29,56.88 -107.29,0 C-107.29,-56.88 -59.24,-102.95 0,-102.95 C59.24,-102.95 107.29,-56.9 107.29,0 C107.3,16.93 102.99,33.58 94.75,48.38 C93.02,51.4 92.59,55.01 93.58,58.36 L104.75,94.76 C105.44,97.03 104.17,99.43 101.9,100.13 C101.01,100.4 100.07,100.38 99.2,100.07 L64.8,87.77 Z"
                    />
                  </g>
                  {/* Blue Bubble Typing Dots */}
                  <g fill="#FFFFFF">
                    <circle cx="219.89" cy="266.95" r="17.19">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 -16; 0 0; 0 0"
                        keyTimes="0; 0.25; 0.5; 1"
                        dur="1.2s"
                        repeatCount="indefinite"
                        begin="0s"
                      />
                    </circle>
                    <circle cx="271.45" cy="261.14" r="17.19">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 -16; 0 0; 0 0"
                        keyTimes="0; 0.25; 0.5; 1"
                        dur="1.2s"
                        repeatCount="indefinite"
                        begin="0.2s"
                      />
                    </circle>
                    <circle cx="323.02" cy="256.93" r="17.19">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 -16; 0 0; 0 0"
                        keyTimes="0; 0.25; 0.5; 1"
                        dur="1.2s"
                        repeatCount="indefinite"
                        begin="0.4s"
                      />
                    </circle>
                  </g>
                </g>
              </>
            )}
          </g>
        </svg>
      </button>
    </div>
  );
};
