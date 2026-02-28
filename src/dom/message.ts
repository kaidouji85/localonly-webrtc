/** メッセージ内容 HTML要素 ID */
export const MESSAGE_CONTENT_ELEMENT_ID = "message-content";

/** メッセージ入力 HTML要素 ID */
export const MESSAGE_INPUT_ELEMENT_ID = "message-input";

/** メッセージ送信ボタン HTML要素 ID */
export const MESSAGE_SEND_BUTTON_ELEMENT_ID = "message-send-button";

/** メッセージ HTML 要素 */
export const MESSAGE_HTML = `
<div class="message">
  <h2 class="message__title">メッセージ</h2>
  <div class="message__content" id="${MESSAGE_CONTENT_ELEMENT_ID}"></div>
  <input class="message__input" id="${MESSAGE_INPUT_ELEMENT_ID}" type="text" placeholder="Type your message here..." />
  <button class="message__send-button" id="${MESSAGE_SEND_BUTTON_ELEMENT_ID}">送信</button>
</div>
`;

/**
 * メッセージ内容を表示するHTML要素を取得する
 * @returns 取得したHTML要素、見つからない場合はエラーを投げる
 */
export const getMessageContentElement = (): HTMLElement => {
  const found = document.getElementById(MESSAGE_CONTENT_ELEMENT_ID);
  if (!found) {
    throw new Error("メッセージ内容を表示するHTML要素が見つかりません");
  }

  return found;
};

/**
 * メッセージを追加する
 * @param message 追加するメッセージ内容
 */
export const addMessage = (message: string): void => {
  const messageContentElement = getMessageContentElement();
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  messageContentElement.appendChild(messageElement);
};

/**
 * メッセージ入力HTML要素を取得する
 * @returns 取得したHTML要素、見つからない場合はエラーを投げる
 */
export const getMessageInputElement = (): HTMLInputElement => {
  const found = document.getElementById(MESSAGE_INPUT_ELEMENT_ID);
  if (!(found instanceof HTMLInputElement)) {
    throw new Error("メッセージ入力HTML要素が見つかりません");
  }

  return found;
};

/**
 * メッセージ入力をクリアする
 */
export const clearMessageInput = (): void => {
  const messageInputElement = getMessageInputElement();
  messageInputElement.value = "";
};

/**
 * メッセージ送信ボタンHTML要素を取得する
 * @returns 取得したHTML要素、見つからない場合はエラーを投げる
 */
export const getMessageSendButtonElement = (): HTMLButtonElement => {
  const found = document.getElementById(MESSAGE_SEND_BUTTON_ELEMENT_ID);
  if (!(found instanceof HTMLButtonElement)) {
    throw new Error("メッセージ送信ボタンHTML要素が見つかりません");
  }

  return found;
};
