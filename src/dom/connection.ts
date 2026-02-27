/** コネクションステート HTML要素 ID */
export const CONNECTION_STATE_ELEMENT_ID = "connection-state";

/** 接続ボタン HTML要素 ID */
export const CONNECT_BUTTON_ELEMENT_ID = "connect-button";

/** コネクションステート HTML */
export const CONNECTION_STATE_HTML = `
<div class="connection">
  <h2 class="connection__title">コネクション</h2>
  <h3 class="connection__state-title">ステート</h3>
  <div class="connection__state-value" id="${CONNECTION_STATE_ELEMENT_ID}">connection not created</div>
  <button class="connection__connect-button" id="${CONNECT_BUTTON_ELEMENT_ID}">接続する</button>
</div>
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

/**
 * 接続ボタンを取得する
 * @returns 取得した接続ボタン、見つからない場合はエラーを投げる
 */
export const getConnectButtonElement = (): HTMLButtonElement => {
  const found = document.getElementById(CONNECT_BUTTON_ELEMENT_ID);
  if (!found) {
    throw new Error("接続ボタンが見つかりません");
  }

  return found as HTMLButtonElement;
};
