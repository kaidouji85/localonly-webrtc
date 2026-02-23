import "./style.css";

const app =
  document.querySelector<HTMLDivElement>("#app") ??
  document.createElement("div");
app.innerHTML = `
  <div>
    <h1>送信ページ (Sender)</h1>
    <h3>RTCSessionDescriptionInit</h3>
    <div id="description"></div>
    <h3>RTCIceCandidateInit</h3>
    <div id="ice-candidate"></div>
  </div>
`;

/**1
 * RTCSessionDescriptionInitを画面に表示する
 * @param value 表示するRTCSessionDescriptionInit
 */
const displayRTCSessionDescriptionInit = (description: RTCSessionDescriptionInit) => {
  const descriptionElement =
    document.getElementById("description") ?? document.createElement("div");
  descriptionElement.textContent = JSON.stringify(description);
};

/**
 * RTCIceCandidateInitを画面に表示する
 * @param value 表示するRTCIceCandidateInit
 */
const displayRTCIceCandidate = (candidate: RTCIceCandidateInit) => {
  const iceCandidateElement =
    document.getElementById("ice-candidate") ?? document.createElement("div");
  iceCandidateElement.textContent = JSON.stringify(candidate);
};

/**
 * IceCandidateイベントが発生するまで待機する
 * @param connection 待機するコネクション
 * @returns IceCandidateイベント
 */
const waitUntilIceCandidate = (
  connection: RTCPeerConnection,
): Promise<RTCPeerConnectionIceEvent> =>
  new Promise((resolve) => {
    connection.addEventListener("icecandidate", resolve, { once: true });
  });

/**
 * エントリポイント
 */
window.onload = async () => {
  const connection = new RTCPeerConnection();
  const sendChannel = connection.createDataChannel("sendDataChannel");
  const description = await connection.createOffer();
  const [iceCandidateEvent] = await Promise.all([
    // icecandidateイベントはsetLocalDescriptionの後に発生するため、先に待機しておく
    waitUntilIceCandidate(connection),
    connection.setLocalDescription(description),
  ]);
  if (!iceCandidateEvent.candidate) {
    throw new Error("ICE Candidateが見つかりませんでした");
  }
  
  displayRTCSessionDescriptionInit(description);
  displayRTCIceCandidate(iceCandidateEvent.candidate.toJSON());
};
