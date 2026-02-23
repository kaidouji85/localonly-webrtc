import "./style.css";

const app =
  document.querySelector<HTMLDivElement>("#app") ||
  document.createElement("div");
app.innerHTML = `
  <div>
    <h1>受信ページ (Receiver)</h1>
    <h2>Remote Description</h2>
    <textarea class="description-input" id="remote-description" placeholder="Remote Descriptionを入力してください"></textarea>
    <h2>Remote ICE Candidate</h2>
    <textarea class="ice-input" id="remote-ice-candidate" placeholder="Remote ICE Candidateを入力してください"></textarea>
  </div>
`;

window.onload = async () => {
  const connection = new RTCPeerConnection();
};
