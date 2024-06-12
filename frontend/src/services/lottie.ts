import axios from "axios";
import { WSPostBody } from "../../../types/messages";
import { EVENTS } from "../../../constants/events";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL + "/v1/websockets/event";

export function lockLayer(layerIndex: number, clientId: string) {
  const payload: WSPostBody = {
    event: EVENTS.LAYER_LOCKED,
    json: {
      layerIndex,
    },
    sessionId: clientId,
  };
  return axios.post(BACKEND_URL, payload);
}

export function unlockLayer(layerIndex: number, clientId: string) {
  const payload: WSPostBody = {
    event: EVENTS.LAYER_UNLOCKED,
    json: {
      layerIndex,
    },
    sessionId: clientId,
  };
  return axios.post(BACKEND_URL, payload);
}

export function lottieUpdated(
  lottieUpdateBody: LottieUpdateBody,
  clientId: string,
) {
  const payload: WSPostBody = {
    event: EVENTS.LOTTIE_UPDATED,
    json: lottieUpdateBody,
    sessionId: clientId,
  };
  return axios.post(BACKEND_URL, payload);
}

export function propagateLottie(lottie: Record<string, any>, clientId: string) {
  const payload: WSPostBody = {
    event: EVENTS.PROPAGATE_LOTTIE_FILE,
    json: lottie,
    sessionId: clientId,
  };
  return axios.post(BACKEND_URL, payload);
}

export function userConnected(clientId: string) {
  const payload: WSPostBody = {
    event: EVENTS.USER_CONNECTED,
    json: {},
    sessionId: clientId,
  };
  return axios.post(BACKEND_URL, payload);
}
