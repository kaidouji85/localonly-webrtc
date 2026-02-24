import { RTCIceCandidateInitSchema } from "../schemas/rtc-ice-candidate-init";
import { RTCSessionDescriptionInitSchema } from "../schemas/rtc-session-description-init";

/** 相手のDescription HTML要素のID */
export const REMOTE_DESCRIPTION_ELEMENT_ID = "remote-description";

/** 相手のICE Candidate HTML要素のID */
export const REMOTE_ICE_CANDIDATE_ELEMENT_ID = "remote-ice-candidate";

/** 相手の情報 HTML */
export const REMOTE_INFO_HTML = `
  <h2>相手の情報を入力する</h2>
  <h3>Remote RTCSessionDescriptionInit</h3>
  <textarea class="description-input" id="${REMOTE_DESCRIPTION_ELEMENT_ID}" placeholder="Remote RTCSessionDescriptionInitを入力してください"></textarea>
  <h3>Remote ICE RTCIceCandidateInit</h3>
  <textarea class="ice-input" id="${REMOTE_ICE_CANDIDATE_ELEMENT_ID}" placeholder="Remote RTCIceCandidateInitを入力してください"></textarea>
  <div><button id="connect-button">接続する</button></div>
`;

/**
 * 相手のDescriptionを入力するHTML要素を取得する
 * @returns 取得したHTML要素、見つからない場合は新しいtextarea要素を返す
 */
export const getRemoteDescriptionElement = (): HTMLTextAreaElement => {
  const found = document.getElementById(REMOTE_DESCRIPTION_ELEMENT_ID);
  return found instanceof HTMLTextAreaElement
    ? found
    : document.createElement("textarea");
};

/**
 * 入力したRemote RTCSessionDescriptionInitを取得する
 * @returns 入力したRemote RTCSessionDescriptionInit、不正な場合は例外を投げる
 */
export const getRemoteRTCSessionDescription = (): RTCSessionDescriptionInit => {
  const remoteDescriptionInput = getRemoteDescriptionElement();
  const parsed = JSON.parse(remoteDescriptionInput.value);
  return RTCSessionDescriptionInitSchema.parse(parsed);
};

/**
 * 相手のICE Candidateを入力するHTML要素を取得する
 * @returns 取得したHTML要素、見つからない場合は新しいtextarea要素を返す
 */
export const getRemoteIceCandidateElement = (): HTMLTextAreaElement => {
  const found = document.getElementById(REMOTE_ICE_CANDIDATE_ELEMENT_ID);
  return found instanceof HTMLTextAreaElement
    ? found
    : document.createElement("textarea");
};

/**
 * 入力したRemote RTCIceCandidateInitを取得する
 * @returns 入力したRemote RTCIceCandidateInit、不正な場合は例外を投げる
 */
export const getRemoteRTCIceCandidates = (): RTCIceCandidateInit[] => {
  const remoteIceCandidateInput = getRemoteIceCandidateElement();
  const parsed = JSON.parse(remoteIceCandidateInput.value);
  if (!Array.isArray(parsed)) {
    throw new Error("Remote RTCIceCandidateInitは配列である必要があります");
  }

  return parsed.map((c) => RTCIceCandidateInitSchema.parse(c));
};
