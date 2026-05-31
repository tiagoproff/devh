export type MessageAuthor = "user" | "assistant";

export interface Message {
  id: string;
  author: MessageAuthor;
  content: string;
  date: string;
}
