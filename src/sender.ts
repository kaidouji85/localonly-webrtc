import "./style.css";

const app =
  document.querySelector<HTMLDivElement>("#app") ||
  document.createElement("div");
app.innerHTML = `
  <div>
    <h1>送信ページ (Sender)</h1>
  </div>
`;

const waitUntilIceCandidate = (connection: RTCPeerConnection) =>
  new Promise((resolve) => {
    connection.addEventListener("icecandidate", resolve);
  });

/**
 * エントリポイント
 */
window.onload = async () => {
  console.log("Sender page loaded");
  const connection = new RTCPeerConnection();
  const sendChannel = connection.createDataChannel("sendDataChannel");
  const description = await connection.createOffer();
  console.log("Offer created:", description);
  const [iceCandidateEvent] = await Promise.all([
    waitUntilIceCandidate(connection),
    connection.setLocalDescription(description)
  ]);
  console.log("ICE candidate event:", iceCandidateEvent);
};
