import { RTCIceCandidateInitSchema } from "../schemas/rtc-ice-candidate-init";
import { RTCSessionDescriptionInitSchema } from "../schemas/rtc-session-description-init";

/** 相手のDescription HTML要素のID */
export const REMOTE_DESCRIPTION_ELEMENT_ID = "remote-description";

/** 相手のICE Candidate HTML要素のID */
export const REMOTE_ICE_CANDIDATE_ELEMENT_ID = "remote-ice-candidate";

/** 相手の情報 HTML */
export const REMOTE_INFO_HTML = `
<div class="remote-info">
  <h2 class="remote-info__title">相手の情報を入力する</h2>
  <h3 class="remote-info__description-title">Remote RTCSessionDescriptionInit</h3>
  <textarea
    class="remote-info__description-input"
    id="${REMOTE_DESCRIPTION_ELEMENT_ID}"
    placeholder="Remote RTCSessionDescriptionInitを入力してください"
  ></textarea>
  <h3 class="remote-info__ice-title">Remote ICE RTCIceCandidateInit</h3>
  <textarea
    class="remote-info__ice-input"
    id="${REMOTE_ICE_CANDIDATE_ELEMENT_ID}"
    placeholder="Remote RTCIceCandidateInitを入力してください"
  ></textarea>
</div>
`;

/**
 * 相手のDescriptionを入力するHTML要素を取得する
 * @returns 取得したHTML要素、見つからない場合はエラーを投げる
 */
export const getRemoteDescriptionElement = (): HTMLTextAreaElement => {
  const found = document.getElementById(REMOTE_DESCRIPTION_ELEMENT_ID);
  if (!(found instanceof HTMLTextAreaElement)) {
    throw new Error("相手のDescriptionを入力するHTML要素が見つかりません");
  }

  return found;
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
 * @returns 取得したHTML要素、見つからない場合はエラーを投げる
 */
export const getRemoteIceCandidateElement = (): HTMLTextAreaElement => {
  const found = document.getElementById(REMOTE_ICE_CANDIDATE_ELEMENT_ID);
  if (!(found instanceof HTMLTextAreaElement)) {
    throw new Error("相手のICE Candidateを入力するHTML要素が見つかりません");
  }

  return found;
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
