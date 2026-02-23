import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("app element not found");
}

app.innerHTML = `
	<div>
		<h1>Local Only WebRTC Sample</h1>
		<p>送信ページと受信ページを別エントリに分けたサンプルです。</p>
		<a href="/sender.html">送信ページを開く</a>
		<a href="/receiver.html">受信ページを開く</a>
	</div>
`;
