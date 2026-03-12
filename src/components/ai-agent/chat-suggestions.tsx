"use client";

import { motion } from "motion/react";

const SUGGESTIONS = [
  "Was ist der ÖGD Zukunftscheck?",
  "Wie digital sind andere Gesundheitsämter?",
  "Was passiert nach dem Pakt ÖGD 2026?",
  "Welche Prozesse haben das größte Digitalisierungspotenzial?",
  "Wie berechnet sich der ROI?",
];

interface ChatSuggestionsProps {
  onSelect: (suggestion: string) => void;
}

export function ChatSuggestions({ onSelect }: ChatSuggestionsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4 pb-2">
      {SUGGESTIONS.map((suggestion, i) => (
        <motion.button
          key={suggestion}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.2 }}
          onClick={() => onSelect(suggestion)}
          className="text-left text-xs px-3 py-2 rounded-xl border border-oegd-blue/20 bg-oegd-blue-light text-oegd-blue hover:bg-oegd-blue-mid transition-colors cursor-pointer"
        >
          {suggestion}
        </motion.button>
      ))}
    </div>
  );
}
