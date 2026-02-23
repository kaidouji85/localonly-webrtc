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
    <h1>送信ページ (Sender)</h1>
    <p>カメラ映像を取得して受信ページへ送信します。</p>
    <div class="card stack">
      <div class="links">
        <button id="startBtn" type="button">接続開始</button>
        <button id="stopBtn" type="button">接続停止</button>
        <a class="button-link" href="/">トップへ戻る</a>
      </div>
      <p class="status" id="statusText">待機中</p>
      <div class="videos">
        <div class="stack">
          <h2>Local Preview</h2>
          <video id="localVideo" autoplay playsinline muted></video>
        </div>
      </div>
    </div>
  </section>
`

const startBtn = document.querySelector<HTMLButtonElement>('#startBtn')
const stopBtn = document.querySelector<HTMLButtonElement>('#stopBtn')
const statusText = document.querySelector<HTMLParagraphElement>('#statusText')
const localVideo = document.querySelector<HTMLVideoElement>('#localVideo')

if (!startBtn || !stopBtn || !statusText || !localVideo) {
  throw new Error('required elements not found')
}

let peerConnection: RTCPeerConnection | null = null
let localStream: MediaStream | null = null
const signaling = new BroadcastChannel(SIGNALING_CHANNEL)

const setStatus = (text: string) => {
  statusText.textContent = text
}

const closeAll = () => {
  if (peerConnection) {
    peerConnection.onicecandidate = null
    peerConnection.onconnectionstatechange = null
    peerConnection.close()
    peerConnection = null
  }

  if (localStream) {
    for (const track of localStream.getTracks()) {
      track.stop()
    }
    localStream = null
  }

  localVideo.srcObject = null
  setStatus('停止しました')
}

const startConnection = async () => {
  closeAll()

  setStatus('カメラ取得中...')
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  localVideo.srcObject = localStream

  peerConnection = new RTCPeerConnection()
  for (const track of localStream.getTracks()) {
    peerConnection.addTrack(track, localStream)
  }

  peerConnection.onicecandidate = (event) => {
    if (!event.candidate) {
      return
    }

    const message: SignalMessage = {
      type: 'ice-candidate',
      from: 'sender',
      candidate: event.candidate.toJSON(),
    }
    signaling.postMessage(message)
  }

  peerConnection.onconnectionstatechange = () => {
    setStatus(`接続状態: ${peerConnection?.connectionState ?? 'unknown'}`)
  }

  const offer = await peerConnection.createOffer()
  await peerConnection.setLocalDescription(offer)

  const message: SignalMessage = {
    type: 'offer',
    sdp: offer,
  }
  signaling.postMessage(message)

  setStatus('Offer送信済み。受信ページで待機してください。')
}

signaling.onmessage = async (event: MessageEvent<SignalMessage>) => {
  if (!peerConnection) {
    return
  }

  const message = event.data

  if (message.type === 'answer') {
    await peerConnection.setRemoteDescription(message.sdp)
    setStatus('Answer受信。接続中...')
    return
  }

  if (message.type === 'ice-candidate' && message.from === 'receiver') {
    await peerConnection.addIceCandidate(message.candidate)
  }
}

startBtn.addEventListener('click', async () => {
  startBtn.disabled = true
  try {
    await startConnection()
  } catch (error) {
    console.error(error)
    setStatus('接続開始に失敗しました')
  } finally {
    startBtn.disabled = false
  }
})

stopBtn.addEventListener('click', () => {
  closeAll()
})

window.addEventListener('beforeunload', () => {
  closeAll()
  signaling.close()
})
