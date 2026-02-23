import "./style.css";

const app =
  document.querySelector<HTMLDivElement>("#app") ||
  document.createElement("div");
app.innerHTML = `
  <div class="stack">
    <h1>送信ページ (Sender)</h1>
  </div>
`;
