import { EVENTS } from "../constants/events";

export type EventTypes = keyof typeof EVENTS;

export type WSPostBody = {
  json: Record<string, any>;
  event: EventTypes;
  sessionId: string;
};
