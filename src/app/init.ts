import { createEvent, type EventCallable } from "effector";
import type { PageStartedPayload } from "./types";

export function createPageStart<TData = void>(): EventCallable<PageStartedPayload<TData>> {
  return createEvent<PageStartedPayload<TData>>();
}

export const appStarted = createEvent();
