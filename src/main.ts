import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
	throw new Error('app element not found')
}

app.innerHTML = `
	<section class="stack">
		<h1>Local Only WebRTC Sample</h1>
		<p>送信ページと受信ページを別エントリに分けたサンプルです。</p>
		<div class="card stack">
			<h2>ページ選択</h2>
			<div class="links">
				<a class="button-link" href="/sender.html">送信ページを開く</a>
				<a class="button-link" href="/receiver.html">受信ページを開く</a>
			</div>
			<p class="status">別タブでそれぞれ開くとローカル接続を確認できます。</p>
		</div>
	</section>
`

