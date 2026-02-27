import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("app element not found");
}

app.innerHTML = `
	<div class="main">
		<h1 class="main__title">Local Only WebRTC Sample</h1>
		<p class="main__introduction">送信ページと受信ページを別エントリに分けたサンプルです。</p>
		<a class="main__sender" href="/sender.html">送信ページを開く</a>
		<a class="main__receiver" href="/receiver.html">受信ページを開く</a>
	</div>
`;
