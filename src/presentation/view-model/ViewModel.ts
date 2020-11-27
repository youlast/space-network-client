import BaseView from "../view/BaseView";
import BaseViewModel from "./BaseViewModel";

export default class ViewModel implements BaseViewModel {
  public baseView?: BaseView;

  public attachView(baseView: BaseView): void {
    this.baseView = baseView;
  }

  public detachView(baseView: BaseView): void {
    this.baseView = baseView;
  }

  protected notifyViewAboutChanges(): void {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  }
}
