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
import { CONNECT_HTML, getConnectButtonElement } from "./dom/connect";
import { getAppElement } from "./dom/app";
import {
  CONNECTION_STATE_HTML,
  refreshConnectionState,
} from "./dom/connection-state";

/** アプリのルートHTML要素 */
const app = getAppElement();
app.innerHTML = `
  <div>
    <h1>送信ページ (Sender)</h1>
    ${CONNECTION_STATE_HTML}
    ${OWN_INFO_HTML}
    ${REMOTE_INFO_HTML}
    ${CONNECT_HTML}
  </div>
`;

/** WebRTCコネクション、nullは未接続 */
let connection: RTCPeerConnection | null = null;

/**
 * 接続ボタンが押されたときの処理
 */
const onConnectButtonPushed = async () => {
  if (!connection) {
    throw new Error("接続が初期化されていません");
  }

  const remoteDescription = getRemoteRTCSessionDescription();
  const remoteIceCandidates = getRemoteRTCIceCandidates();
  await connection.setRemoteDescription(remoteDescription);
  await Promise.all([
    ...remoteIceCandidates.map((c) => connection?.addIceCandidate(c)),
  ]);
};

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
 * エントリポイント
 */
window.onload = async () => {
  const connectButton = getConnectButtonElement();
  connectButton.addEventListener("click", onConnectButtonPushed);

  connection = new RTCPeerConnection();
  refreshConnectionState(connection.connectionState);
  connection.addEventListener("connectionstatechange", onConnectionStateChange);
  connection.createDataChannel("sendDataChannel");
  const description = await connection.createOffer();
  const [iceCandidates] = await Promise.all([
    // icecandidateイベントはsetLocalDescriptionの後に発生するため、先に待機しておく
    waitUntilIceCandidate(connection),
    connection.setLocalDescription(description),
  ]);
  displayOwnDescription(description);
  displayOwnIceCandidates(iceCandidates.map((c) => c.toJSON()));
};
