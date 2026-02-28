import "./style.css";

import { waitUntilIceCandidate } from "./wait-untilIce-candidate";
import {
  displayOwnDescription,
  displayOwnIceCandidates,
  OWN_INFO_HTML,
} from "./dom/own-info";
import {
  getRemoteRTCIceCandidates,
  getRemoteRTCSessionDescription,
  REMOTE_INFO_HTML,
} from "./dom/remote-info";
import { getAppElement } from "./dom/app";
import {
  CONNECTION_STATE_HTML,
  getConnectButtonElement,
  refreshConnectionState,
} from "./dom/connection";
import { addMessage, MESSAGE_HTML } from "./dom/message";

/** アプリのルートHTML要素 */
const app = getAppElement();
app.innerHTML = `
  <div class="receiver">
    <h1 class="receiver__title">受信ページ (Receiver)</h1>
    ${MESSAGE_HTML}
    ${CONNECTION_STATE_HTML}
    ${REMOTE_INFO_HTML}
    ${OWN_INFO_HTML}
  </div>
`;

/** WebRTCコネクション、nullは未接続 */
let connection: RTCPeerConnection | null = null;

/** データチャネル、nullは未接続 */
let dataChannel: RTCDataChannel | null = null;

/**
 * コネクションステートが変化したときの処理
 */
const onConnectionStateChange = () => {
  if (!connection) {
    throw new Error("接続が初期化されていません");
  }

  refreshConnectionState(connection.connectionState);
};

/**
 * DataChannelが接続されたときの処理
 * @param event イベント
 */
const onDataChannel = (event: RTCDataChannelEvent) => {
  dataChannel = event.channel;
  dataChannel.addEventListener("message", (event) => {
    const message = event.data;
    addMessage(`相手: ${message}`);
  });
}

/**
 * 接続ボタンが押されたときの処理
 */
const onConnectButtonPushed = async () => {
  connection = new RTCPeerConnection();
  connection.addEventListener("datachannel", onDataChannel);
  refreshConnectionState(connection.connectionState);
  connection.addEventListener("connectionstatechange", onConnectionStateChange);
  const remoteDescription = getRemoteRTCSessionDescription();
  const remoteIceCandidates = getRemoteRTCIceCandidates();
  await connection.setRemoteDescription(remoteDescription);
  await Promise.all(
    remoteIceCandidates.map((c) => connection?.addIceCandidate(c)),
  );
  const description = await connection.createAnswer();
  const [iceCandidates] = await Promise.all([
    // icecandidateイベントはsetLocalDescriptionの後に発生するため、先に待機しておく
    waitUntilIceCandidate(connection),
    connection.setLocalDescription(description),
  ]);
  displayOwnDescription(description);
  displayOwnIceCandidates(iceCandidates.map((c) => c.toJSON()));
};

/**
 * エントリポイント
 */
window.onload = async () => {
  const connectButton = getConnectButtonElement();
  connectButton.addEventListener("click", onConnectButtonPushed);
};
