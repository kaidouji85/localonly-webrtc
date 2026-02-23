import { RTCIceCandidateInitSchema } from "./schemas/rtc-ice-candidate-init";
import { RTCSessionDescriptionInitSchema } from "./schemas/rtc-session-description-init";
import "./style.css";

const app =
  document.querySelector<HTMLDivElement>("#app") ||
  document.createElement("div");
app.innerHTML = `
  <div>
    <h1>受信ページ (Receiver)</h1>
    <h2>Remote RTCSessionDescriptionInit</h2>
    <textarea class="description-input" id="remote-description" placeholder="Remote RTCSessionDescriptionInitを入力してください"></textarea>
    <h2>Remote ICE RTCIceCandidateInit</h2>
    <textarea class="ice-input" id="remote-ice-candidate" placeholder="Remote RTCIceCandidateInitを入力してください"></textarea>
  </div>
`;

/**
 * 入力したRemote RTCSessionDescriptionInitを取得する
 * @returns 入力したRemote RTCSessionDescriptionInit、不正な場合は例外を投げる
 */
const getRemoteRTCSessionDescriptionInit = (): RTCSessionDescriptionInit => {
  const found = document.getElementById("remote-description");
  const remoteDescriptionInput =
    found instanceof HTMLTextAreaElement
      ? found
      : document.createElement("textarea");
  const parsed = JSON.parse(remoteDescriptionInput.value);
  return RTCSessionDescriptionInitSchema.parse(parsed);
};

/**
 * 入力したRemote RTCIceCandidateInitを取得する
 * @returns 入力したRemote RTCIceCandidateInit、不正な場合は例外を投げる
 */
const getRemoteRTCIceCandidateInit = (): RTCIceCandidateInit => {
  const found = document.getElementById("remote-ice-candidate");
  const remoteIceCandidateInput =
    found instanceof HTMLTextAreaElement
      ? found
      : document.createElement("textarea");
  const parsed = JSON.parse(remoteIceCandidateInput.value);
  return RTCIceCandidateInitSchema.parse(parsed);
};

window.onload = async () => {
  const connection = new RTCPeerConnection();
};
