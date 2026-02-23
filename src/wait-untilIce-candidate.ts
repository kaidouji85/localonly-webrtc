/**
 * IceCandidateイベントが発生するまで待機する
 * @param connection 待機するコネクション
 * @returns IceCandidateイベント
 */
export const waitUntilIceCandidate = (
  connection: RTCPeerConnection,
): Promise<RTCPeerConnectionIceEvent> =>
  new Promise((resolve) => {
    connection.addEventListener("icecandidate", resolve, { once: true });
  });
