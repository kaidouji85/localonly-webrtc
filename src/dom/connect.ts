/** 接続ボタン HTML要素のID */
export const CONNECT_BUTTON_ELEMENT_ID = "connect-button";

/** 接続用 HTML */
export const CONNECT_HTML = `
  <div><button id="${CONNECT_BUTTON_ELEMENT_ID}">接続する</button></div>
`;

/**
 * 接続ボタン HTML要素を取得する
 * @returns 取得したHTML要素、見つからない場合は新しいbutton要素を返す
 */
export const getConnectButtonElement = (): HTMLButtonElement => {
  const found = document.getElementById(CONNECT_BUTTON_ELEMENT_ID);
  return found instanceof HTMLButtonElement
    ? found
    : document.createElement("button");
};
