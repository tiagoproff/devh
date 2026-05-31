"use client";

import { useState } from "react";

import { useChat } from "@/hooks/useChat";

import { ChatPanel } from "../ChatPanel/ChatPanel";
import styles from "./Chat.module.css";

export function Chat() {
  const [text, setText] = useState("");
  const { messages, send } = useChat();

  const handleSend = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!text.trim()) {
      return;
    }

    await send(text);
    setText("");
  };

  return (
    <section className={styles.container}>
      <header className={styles.avatar}>
        <h1>Atendente Virtual</h1>
      </header>

      <article className={styles.chat}>
        <header className={styles.header}>
          <h2>DevH</h2>
        </header>

        <ChatPanel className={styles.messages} messages={messages} />

        <footer className={styles.footer}>
          <form>
            <input
              id="chat-input"
              type="text"
              placeholder="Digite sua mensagem..."
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <button type="submit" onClick={handleSend}>
              Enviar
            </button>
          </form>
        </footer>
      </article>
      <legend className={styles.legend}>
        <p>
          ATENÇÃO: Só respondo por xícaras de café. E o limite diário é: 42.
        </p>
      </legend>
    </section>
  );
}
