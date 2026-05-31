"use client";

import { useState } from "react";

import { Message } from "@/types/Message";
import { typewriter } from "@/utils/typewriter";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  async function send(text: string) {
    const content = text.trim();

    if (!content) {
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      author: "user",
      content,
      date: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      const assistantId = crypto.randomUUID();

      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          author: "assistant",
          content: "",
          date: new Date().toISOString(),
        },
      ]);

      await typewriter(data.message, (currentContent) => {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId
              ? {
                  ...message,
                  content: currentContent,
                }
              : message,
          ),
        );
      });
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          author: "assistant",
          content: "Até eu consegui quebrar isso.",
          date: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    messages,
    send,
    isLoading,
  };
}
