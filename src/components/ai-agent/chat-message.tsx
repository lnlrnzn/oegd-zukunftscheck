"use client";

import type { UIMessage } from "ai";
import { memo, type ReactNode } from "react";
import { code } from "@streamdown/code";
import { Streamdown } from "streamdown";
import {
  Message,
  MessageContent,
} from "@/components/ai-elements/message";
import {
  Reasoning,
  ReasoningTrigger,
  ReasoningContent,
} from "@/components/ai-elements/reasoning";
import { Shimmer } from "@/components/ai-elements/shimmer";

const streamdownPlugins = { code };

function getThinkingMessage(
  isStreaming: boolean,
  duration?: number
): ReactNode {
  if (isStreaming || duration === 0) {
    return <Shimmer duration={1}>Denkt nach...</Shimmer>;
  }
  if (duration === undefined) {
    return <p>Hat kurz nachgedacht</p>;
  }
  return <p>Hat {duration} Sekunden nachgedacht</p>;
}

function getTextContent(message: UIMessage): string {
  return message.parts
    .filter((p): p is Extract<typeof p, { type: "text" }> => p.type === "text")
    .map((p) => p.text)
    .join("");
}

interface ChatMessageProps {
  message: UIMessage;
}

export const ChatMessage = memo(function ChatMessage({
  message,
}: ChatMessageProps) {
  if (message.role === "user") {
    return (
      <Message from="user">
        <MessageContent className="group-[.is-user]:bg-oegd-blue group-[.is-user]:text-white group-[.is-user]:rounded-2xl group-[.is-user]:rounded-br-md">
          {getTextContent(message)}
        </MessageContent>
      </Message>
    );
  }

  return (
    <Message from="assistant">
      <MessageContent className="group-[.is-assistant]:bg-muted/50 group-[.is-assistant]:rounded-2xl group-[.is-assistant]:rounded-bl-md group-[.is-assistant]:px-4 group-[.is-assistant]:py-3">
        {message.parts.map((part, i) => {
          if (part.type === "reasoning") {
            return (
              <Reasoning key={i} isStreaming={part.state === "streaming"}>
                <ReasoningTrigger getThinkingMessage={getThinkingMessage} />
                <ReasoningContent>{part.text}</ReasoningContent>
              </Reasoning>
            );
          }

          if (part.type === "text") {
            return (
              <Streamdown
                key={i}
                plugins={streamdownPlugins}
                isAnimating={part.state === "streaming"}
                className="chat-content [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
              >
                {part.text}
              </Streamdown>
            );
          }

          return null;
        })}
      </MessageContent>
    </Message>
  );
});
