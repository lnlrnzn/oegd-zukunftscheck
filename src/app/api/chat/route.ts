import {
  streamText,
  convertToModelMessages,
  type UIMessage,
} from "ai";
import { anthropic, type AnthropicLanguageModelOptions } from "@ai-sdk/anthropic";
import { buildSystemPrompt } from "@/lib/chat-system-prompt";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: buildSystemPrompt(),
    messages: await convertToModelMessages(messages),
    headers: {
      "anthropic-beta": "interleaved-thinking-2025-05-14",
    },
    providerOptions: {
      anthropic: {
        thinking: { type: "enabled", budgetTokens: 4096 },
      } satisfies AnthropicLanguageModelOptions,
    },
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
  });
}
