import { createBrowserHistory, History } from "history";

const history: History = createBrowserHistory();

export default class BrowserHistoryHelper {
  static getHistory(): History {
    return history;
  }

  static moveTo(path: string): void {
    history.push(path);
  }

  static moveToAndReload(path: string): void {
    history.push(path);
    window.location.reload();
  }

  static replaceCurrectUrlInHistory(path: string): void {
    history.replace(path);
  }
}
