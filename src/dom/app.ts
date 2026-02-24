/**
 * アプリのルートHTML要素を取得する
 * @returns 取得したHTML要素、見つからない場合はエラーを投げる
 */
export const getAppElement = (): HTMLElement => {
  const found = document.getElementById("app");
  if (!found) {
    throw new Error("アプリのルートHTML要素が見つかりません");
  }

  return found;
};
