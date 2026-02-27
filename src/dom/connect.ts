/** @deprecated 接続ボタン HTML要素のID */
export const CONNECT_BUTTON_ELEMENT_ID = "connect-button";

/** @deprecated 接続用 HTML */
export const CONNECT_HTML = `
  <div><button id="${CONNECT_BUTTON_ELEMENT_ID}">接続する</button></div>
`;

/**
 * @deprecated 接続ボタン HTML要素を取得する
 * @returns 取得したHTML要素、見つからない場合はエラーを投げる
 */
export const getConnectButtonElement = (): HTMLButtonElement => {
  const found = document.getElementById(CONNECT_BUTTON_ELEMENT_ID);
  if (!(found instanceof HTMLButtonElement)) {
    throw new Error("接続ボタンのHTML要素が見つかりません");
  }

  return found;
};
