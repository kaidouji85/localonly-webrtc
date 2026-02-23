import './style.css'

type SignalMessage =
  | { type: 'offer'; sdp: RTCSessionDescriptionInit }
  | { type: 'answer'; sdp: RTCSessionDescriptionInit }
  | { type: 'ice-candidate'; from: 'sender' | 'receiver'; candidate: RTCIceCandidateInit }

const SIGNALING_CHANNEL = 'localonly-webrtc-signaling'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) {
  throw new Error('app element not found')
}

app.innerHTML = `
  <section class="stack">
    <h1>受信ページ (Receiver)</h1>
    <p>送信ページからのOfferを受け取り、映像を表示します。</p>
    <div class="card stack">
      <div class="links">
        <button id="readyBtn" type="button">受信待機を開始</button>
        <button id="stopBtn" type="button">接続停止</button>
        <a class="button-link" href="/">トップへ戻る</a>
      </div>
      <p class="status" id="statusText">待機中</p>
      <div class="videos">
        <div class="stack">
          <h2>Remote Video</h2>
          <video id="remoteVideo" autoplay playsinline></video>
        </div>
      </div>
    </div>
  </section>
`

const readyBtn = document.querySelector<HTMLButtonElement>('#readyBtn')
const stopBtn = document.querySelector<HTMLButtonElement>('#stopBtn')
const statusText = document.querySelector<HTMLParagraphElement>('#statusText')
const remoteVideo = document.querySelector<HTMLVideoElement>('#remoteVideo')

if (!readyBtn || !stopBtn || !statusText || !remoteVideo) {
  throw new Error('required elements not found')
}

let peerConnection: RTCPeerConnection | null = null
const signaling = new BroadcastChannel(SIGNALING_CHANNEL)
let isReady = false

const setStatus = (text: string) => {
  statusText.textContent = text
}

const closeAll = () => {
  if (peerConnection) {
    peerConnection.ontrack = null
    peerConnection.onicecandidate = null
    peerConnection.onconnectionstatechange = null
    peerConnection.close()
    peerConnection = null
  }

  remoteVideo.srcObject = null
  setStatus('停止しました')
}

const ensurePeerConnection = () => {
  if (peerConnection) {
    return peerConnection
  }

  peerConnection = new RTCPeerConnection()

  peerConnection.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0] ?? null
  }

  peerConnection.onicecandidate = (event) => {
    if (!event.candidate) {
      return
    }

    const message: SignalMessage = {
      type: 'ice-candidate',
      from: 'receiver',
      candidate: event.candidate.toJSON(),
    }
    signaling.postMessage(message)
  }

  peerConnection.onconnectionstatechange = () => {
    setStatus(`接続状態: ${peerConnection?.connectionState ?? 'unknown'}`)
  }

  return peerConnection
}

const handleOffer = async (offer: RTCSessionDescriptionInit) => {
  const connection = ensurePeerConnection()

  await connection.setRemoteDescription(offer)
  const answer = await connection.createAnswer()
  await connection.setLocalDescription(answer)

  const message: SignalMessage = {
    type: 'answer',
    sdp: answer,
  }
  signaling.postMessage(message)

  setStatus('Answer送信済み。接続中...')
}

readyBtn.addEventListener('click', () => {
  isReady = true
  setStatus('受信待機中。送信ページで接続開始してください。')
})

stopBtn.addEventListener('click', () => {
  closeAll()
})

signaling.onmessage = async (event: MessageEvent<SignalMessage>) => {
  if (!isReady) {
    return
  }

  const message = event.data

  if (message.type === 'offer') {
    await handleOffer(message.sdp)
    return
  }

  if (message.type === 'ice-candidate' && message.from === 'sender') {
    const connection = ensurePeerConnection()
    await connection.addIceCandidate(message.candidate)
  }
}

window.addEventListener('beforeunload', () => {
  closeAll()
  signaling.close()
})
