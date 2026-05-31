"use client";

import { useEffect, useState } from "react";

import { typewriter } from "@/utils/typewriter";
import styles from "./Chat.module.css";

export function Chat() {
  const [text, setText] = useState("");

  useEffect(() => {
    typewriter("Looking for a starting point or more instructions? Head over to...", setText);
  }, []);

  return <div className={styles.container}>{text}</div>;
}
