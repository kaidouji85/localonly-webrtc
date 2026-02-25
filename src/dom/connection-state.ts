/** コネクションステート HTML要素 ID */
export const CONNECTION_STATE_ELEMENT_ID = "connection-state";

/** コネクションステート HTML */
export const CONNECTION_STATE_HTML = `
  <h2>コネクションステート</h2>
  <div id="${CONNECTION_STATE_ELEMENT_ID}"></div>
`;

/**
 * コネクションステートを表示するHTML要素を取得する
 * @returns 取得したHTML要素、見つからない場合はエラーを投げる
 */
export const getConnectionStateElement = (): HTMLElement => {
  const found = document.getElementById(CONNECTION_STATE_ELEMENT_ID);
  if (!found) {
    throw new Error("コネクションステートを表示するHTML要素が見つかりません");
  }

  return found;
};

/**
 * コネクションステートを更新する
 * @param state 表示するコネクションステート
 */
export const refreshConnectionState = (state: RTCPeerConnectionState) => {
  const connectionStateElement = getConnectionStateElement();
  connectionStateElement.textContent = state;
};
