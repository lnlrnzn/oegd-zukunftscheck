"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, X } from "lucide-react";
import { ChatPanel } from "./chat-panel";

const transport = new DefaultChatTransport({ api: "/api/chat" });

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage, status, stop } = useChat({ transport });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[400px] h-[560px] max-sm:fixed max-sm:inset-0 max-sm:w-full max-sm:h-full max-sm:rounded-none bg-white border shadow-2xl rounded-2xl flex flex-col overflow-hidden"
          >
            <ChatPanel
              messages={messages}
              sendMessage={sendMessage}
              status={status}
              stop={stop}
              onClose={() => setIsOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-oegd-blue text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow cursor-pointer"
        aria-label={isOpen ? "Chat schließen" : "Chat öffnen"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
