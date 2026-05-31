import { Chat } from "@/components/Chat";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Chat />
      </main>
    </div>
  );
}
