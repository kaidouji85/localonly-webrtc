import "./style.css";

const app =
  document.querySelector<HTMLDivElement>("#app") ||
  document.createElement("div");
app.innerHTML = `
  <div class="stack">
    <h1>受信ページ (Receiver)</h1>
  </div>
`;
