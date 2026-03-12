"use client";

import type { UIMessage, ChatStatus } from "ai";
import { useState, useCallback } from "react";
import { Shield, X, Send, Square, Loader2 } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { ChatMessage } from "./chat-message";
import { ChatSuggestions } from "./chat-suggestions";
import { ChatEmptyState } from "./chat-empty-state";

interface ChatPanelProps {
  messages: UIMessage[];
  sendMessage: (message: { text: string }) => Promise<void>;
  status: ChatStatus;
  stop: () => void;
  onClose: () => void;
}

export function ChatPanel({
  messages,
  sendMessage,
  status,
  stop,
  onClose,
}: ChatPanelProps) {
  const [input, setInput] = useState("");
  const isStreaming = status === "streaming" || status === "submitted";

  const doSend = useCallback(
    (text: string) => {
      if (!text.trim() || isStreaming) return;
      sendMessage({ text });
      setInput("");
    },
    [isStreaming, sendMessage]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      doSend(input);
    },
    [input, doSend]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        doSend(input);
      }
    },
    [input, doSend]
  );

  const isEmpty = messages.length === 0;

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-oegd-blue text-white shrink-0">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span className="font-semibold text-sm">ÖGD Zukunftscheck</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Chat schließen"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages — ai-elements Conversation for proper auto-scroll */}
      <Conversation>
        <ConversationContent className="gap-4">
          {isEmpty ? (
            <>
              <ChatEmptyState />
              <ChatSuggestions onSelect={doSend} />
            </>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {/* Input */}
      <div className="border-t p-3 shrink-0">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ihre Frage..."
            rows={1}
            autoFocus
            className="flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-oegd-blue/30 field-sizing-content max-h-32"
          />
          {isStreaming ? (
            <button
              type="button"
              onClick={() => stop()}
              className="shrink-0 w-9 h-9 rounded-xl bg-oegd-red text-white flex items-center justify-center hover:bg-oegd-red/90 transition-colors cursor-pointer"
              aria-label="Stopp"
            >
              {status === "submitted" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Square className="h-3.5 w-3.5 fill-current" />
              )}
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="shrink-0 w-9 h-9 rounded-xl bg-oegd-blue text-white flex items-center justify-center disabled:opacity-40 hover:bg-oegd-blue/90 transition-colors cursor-pointer disabled:cursor-not-allowed"
              aria-label="Nachricht senden"
            >
              <Send className="h-4 w-4" />
            </button>
          )}
        </form>
      </div>
    </>
  );
}
