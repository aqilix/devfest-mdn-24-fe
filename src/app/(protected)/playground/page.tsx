"use client"

import { useEffect, useRef, useState } from "react"
import { Send } from "lucide-react";

import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Button } from "@/components/ui/button";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeDisplayBlock from "./code-display-block";
import { useChat } from "@/hooks/use-chat";

export default function Page() {
  const [loading, setLoading] = useState(true)

  const [isGenerating, setIsGenerating] = useState(false);
  const {
    messages,
    // setMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    onResponse(response) {
      if (response) {
        setIsGenerating(false);
      }
    },
    onError(error) {
      if (error) {
        setIsGenerating(false);
      }
    },
  });

  const messagesRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGenerating(true);
    handleSubmit(e);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isGenerating || isLoading || !input) return;
      setIsGenerating(true);
      onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-zinc-200/60 md:min-h-min animate-fade animate-infinite animate-duration-[550ms] animate-ease-in-out animate-alternate-reverse animate-fill-both" />
        <div className="h-[60px] rounded-xl bg-zinc-200/60 md:min-h-min animate-fade animate-infinite animate-duration-[550ms] animate-ease-in-out animate-alternate-reverse animate-fill-both" />
      </div>
    )
  }

  console.log('usmessageser', messages)

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
      {/* <ExpandableChatHeader className="bg-muted/60 flex-col text-center justify-center">
        <h1 className="text-xl font-semibold">Chat with our AI ✨</h1>
        <p>Ask any question for our AI to answer</p>
      </ExpandableChatHeader> */}

      {/* Chat List */}
      <div className="flex flex-1 flex-col gap-4 min-h-[100vh] md:min-h-min">
        <ChatMessageList className="bg-muted/25" ref={messagesRef}>
          {/* Initial message */}
          <ChatBubble variant="received">
            <ChatBubbleAvatar src="/google-gemini-icon.webp" fallback="🤖" />
            <ChatBubbleMessage>
              Hello! I&apos;m the AI assistant. How can I help you today?
            </ChatBubbleMessage>
          </ChatBubble>

          {/* Messages */}
          {messages?.map((message, index) => (
            <ChatBubble
              key={`chat-bubble-${message.id || index}`}
              variant={message.role == "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                src=""
                fallback={message.role == "user" ? "👨🏽" : "🤖"}
              />
              <ChatBubbleMessage
                variant={message.role == "user" ? "sent" : "received"}
              >
                {message.content
                  ?.split("```")
                  ?.map((part: string, index: number) => {
                    if (index % 2 === 0) {
                      return (
                        <Markdown key={`message-content-markdown-${part?.substring(10)}-${index}`} remarkPlugins={[remarkGfm]}>
                          {part}
                        </Markdown>
                      );
                    } else {
                      return (
                        <pre className=" pt-2" key={`message-content-pre-${part?.substring(10)}-${index}`}>
                          <CodeDisplayBlock code={part} lang="" />
                        </pre>
                      );
                    }
                  })}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {/* Loading */}
          {isGenerating && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar src="" fallback="🤖" />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </div>

      {/* Chat input */}
      <div className="md:min-h-min">
        <form ref={formRef} className="flex relative gap-2" onSubmit={onSubmit}>
          <ChatInput
            value={input}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            className="min-h-12 bg-background shadow-none"
          />
          <Button
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
            type="submit"
            size="icon"
            disabled={isLoading || isGenerating || !input}
          >
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  )

}
