import "./style.css";

import { RTCIceCandidateInitSchema } from "./schemas/rtc-ice-candidate-init";
import { RTCSessionDescriptionInitSchema } from "./schemas/rtc-session-description-init";
import { waitUntilIceCandidate } from "./wait-untilIce-candidate";
import {
  displayOwnDescription,
  displayOwnIceCandidates,
  OWN_INFO_HTML,
} from "./dom/own-info";

/** アプリのルートHTML要素 */
const app =
  document.querySelector<HTMLDivElement>("#app") ??
  document.createElement("div");
app.innerHTML = `
  <div>
    <h1>送信ページ (Sender)</h1>

    ${OWN_INFO_HTML}

    <h2>相手の情報を入力する</h2>
    <h3>Remote RTCSessionDescriptionInit</h3>
    <textarea class="description-input" id="remote-description" placeholder="Remote RTCSessionDescriptionInitを入力してください"></textarea>
    <h3>Remote ICE RTCIceCandidateInit</h3>
    <textarea class="ice-input" id="remote-ice-candidate" placeholder="Remote RTCIceCandidateInitを入力してください"></textarea>
    <div><button id="connect-button">接続する</button></div>
  </div>
`;

/** WebRTCコネクション、nullは未接続 */
let connection: RTCPeerConnection | null = null;

/** WebRTCデータチャネル、nullは未作成 */
let sendChannel: RTCDataChannel | null = null;

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
const getRemoteRTCIceCandidateInits = (): RTCIceCandidateInit[] => {
  const found = document.getElementById("remote-ice-candidate");
  const remoteIceCandidateInput =
    found instanceof HTMLTextAreaElement
      ? found
      : document.createElement("textarea");
  const parsed = JSON.parse(remoteIceCandidateInput.value);
  if (!Array.isArray(parsed)) {
    throw new Error("Remote RTCIceCandidateInitは配列である必要があります");
  }
  return parsed.map((c) => RTCIceCandidateInitSchema.parse(c));
};

/**
 * 接続ボタンが押されたときの処理
 */
const onConnectButtonPushed = async () => {
  if (!connection) {
    throw new Error("接続が初期化されていません");
  }

  const remoteDescription = getRemoteRTCSessionDescriptionInit();
  const remoteIceCandidates = getRemoteRTCIceCandidateInits();
  await connection.setRemoteDescription(remoteDescription);
  await Promise.all([
    ...remoteIceCandidates.map((c) => connection?.addIceCandidate(c)),
  ]);
};

/**
 * エントリポイント
 */
window.onload = async () => {
  const connectButton =
    document.getElementById("connect-button") ??
    document.createElement("button");
  connectButton.addEventListener("click", onConnectButtonPushed);

  connection = new RTCPeerConnection();
  sendChannel = connection.createDataChannel("sendDataChannel");
  const description = await connection.createOffer();
  const [iceCandidates] = await Promise.all([
    // icecandidateイベントはsetLocalDescriptionの後に発生するため、先に待機しておく
    waitUntilIceCandidate(connection),
    connection.setLocalDescription(description),
  ]);
  displayOwnDescription(description);
  displayOwnIceCandidates(iceCandidates.map((c) => c.toJSON()));
};
