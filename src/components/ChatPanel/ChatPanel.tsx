"use client";

import { Message } from "@/types/Message";

import styles from "./ChatPanel.module.css";

interface ChatPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly messages: Message[];
}

export function ChatPanel({ messages, ...props }: ChatPanelProps) {
  return (
    <div {...props}>
      <div className={styles.messages}>
        <ul>
          {messages.map((message) => (
            <li
              key={message.id}
              className={
                message.author === "user"
                  ? styles.userMessage
                  : styles.agentMessage
              }
            >
              {message.content}
              <time dateTime={message.date}>{message.date}</time>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
