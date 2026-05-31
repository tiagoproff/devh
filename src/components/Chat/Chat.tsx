"use client";

import { useState } from "react";

import { useChat } from "@/hooks/useChat";
import styles from "./Chat.module.css";

export function Chat() {
  const { messages, send } = useChat();
  const [text, setText] = useState("");

  function handleSend() {
    if (!text.trim()) {
      return;
    }

    send(text);
    setText("");
  }

  return (
    <div>
      <div className={styles.container}>
        {messages.map((message) => (
          <div key={message.id}>
            <strong>{message.author}</strong>
            {" : "}
            {message.content}
          </div>
        ))}
      </div>

      <input value={text} onChange={(event) => setText(event.target.value)} />
      <button onClick={handleSend}>Enviar</button>
    </div>
  );
}
