import "./style.css";

const app =
  document.querySelector<HTMLDivElement>("#app") ??
  document.createElement("div");
app.innerHTML = `
  <div>
    <h1>送信ページ (Sender)</h1>
    <h3>Description</h3>
    <div id="description"></div>
    <h3>ICE Candidate</h3>
    <div id="ice-candidate"></div>
  </div>
`;

/**
 * Descriptionを画面に表示する
 * @param description 表示するDescription
 */
const displayDescription = (description: RTCSessionDescriptionInit) => {
  const descriptionElement =
    document.getElementById("description") ?? document.createElement("div");
  descriptionElement.textContent = JSON.stringify(description);
};

/**
 * ICE Candidateを画面に表示する
 * @param candidate 表示するICE Candidate
 */
const displayIceCandidate = (candidate: RTCIceCandidate) => {
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
    waitUntilIceCandidate(connection),
    connection.setLocalDescription(description),
  ]);
  if (!iceCandidateEvent.candidate) {
    throw new Error("ICE Candidateが見つかりませんでした");
  }
  
  displayDescription(description);
  displayIceCandidate(iceCandidateEvent.candidate);
};
