/** 自身のdescription HTML要素のID */
export const OWN_DESCRIPTION_ELEMENT_ID = "own-description";

/** 自身のICE候補 HTML要素のID */
export const OWN_ICE_CANDIDATE_ELEMENT_ID = "own-ice-candidate";

/** 自身の情報 HTML */
export const OWN_INFO_HTML = `
  <h2>自身の情報</h2>
  <h3>RTCSessionDescriptionInit</h3>
  <div id="${OWN_DESCRIPTION_ELEMENT_ID}"></div>
  <h3>RTCIceCandidateInit</h3>
  <div id="${OWN_ICE_CANDIDATE_ELEMENT_ID}"></div>
`;

/**
 * 自身のRTCSessionDescriptionInitを表示するHTML要素を取得する
 * @returns 取得したHTML要素、見つからない場合は新しいdiv要素を返す
 */
export const getOwnDescriptionElement = (): HTMLElement =>
  document.getElementById(OWN_DESCRIPTION_ELEMENT_ID) ??
  document.createElement("div");

/**
 * 自身のRTCSessionDescriptionInitを画面に表示する
 * @param value 表示するRTCSessionDescriptionInit
 */
export const displayOwnDescription = (
  description: RTCSessionDescriptionInit,
) => {
  const descriptionElement = getOwnDescriptionElement();
  descriptionElement.textContent = JSON.stringify(description);
};

/**
 * 自身のRTCIceCandidateInitを表示するHTML要素を取得する
 * @returns 取得したHTML要素、見つからない場合は新しいdiv要素を返す
 */
export const getOwnIceCandidateElement = (): HTMLElement =>
  document.getElementById(OWN_ICE_CANDIDATE_ELEMENT_ID) ??
  document.createElement("div");

/**
 * すべてのRTCIceCandidateInitを画面に表示する
 * @param value 表示するRTCIceCandidateInit
 */
export const displayOwnIceCandidateInits = (
  candidates: RTCIceCandidateInit[],
) => {
  const iceCandidateElement = getOwnIceCandidateElement();
  iceCandidateElement.textContent = JSON.stringify(candidates);
};
