# localonly-webrtc

ローカル環境だけで WebRTC のシグナリングを手動で行うサンプルです。  
`sender.html` と `receiver.html` の 2 ページ間で、`RTCSessionDescriptionInit` と `RTCIceCandidateInit` をコピペして接続します。

## 前提ソフト

- Node.js（推奨: 20 以上）
- npm（Node.js に同梱）
- WebRTC 対応ブラウザ（Chrome / Edge など）

## セットアップ

```bash
npm ci
```

## 開発サーバー起動

```bash
npm run dev
```

起動後、表示された URL（通常 `http://localhost:5173`）を開きます。

## 使い方

### 1. 送信ページを開く

- `http://localhost:5173/sender.html` を開く
- 「自身の情報」に表示された以下をコピーする
  - `RTCSessionDescriptionInit`
  - `RTCIceCandidateInit`

### 2. 受信ページで接続処理を行う

- 別タブ（または別ウィンドウ）で `http://localhost:5173/receiver.html` を開く
- 「相手の情報を入力する」に、送信ページからコピーした JSON を貼り付ける
  - `Remote RTCSessionDescriptionInit`
  - `Remote ICE RTCIceCandidateInit`
- 「接続する」を押す
- 「自身の情報」に表示された以下をコピーする
  - `RTCSessionDescriptionInit`
  - `RTCIceCandidateInit`

### 3. 送信ページで接続を完了する

- 送信ページに戻る
- 受信ページからコピーした JSON を貼り付ける
  - `Remote RTCSessionDescriptionInit`
  - `Remote ICE RTCIceCandidateInit`
- 「接続する」を押す

## 補足

- JSON の形式が不正な場合はエラーになります（`zod` でバリデーション）。
- このサンプルは手動シグナリング前提です。シグナリングサーバーは含みません。
