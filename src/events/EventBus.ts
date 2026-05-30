import { Events } from "@/types/Events";

type Callback<T = unknown> = (payload?: T) => void;

const listeners = new Map<Events, Set<Callback>>();

export function emit(event: Events, payload?: unknown) {
  listeners.get(event)?.forEach((cb) => cb(payload));
}

export function on(event: Events, callback: Callback) {
  if (!listeners.has(event)) {
    listeners.set(event, new Set());
  }

  listeners.get(event)?.add(callback);

  return () => listeners.get(event)?.delete(callback);
}
