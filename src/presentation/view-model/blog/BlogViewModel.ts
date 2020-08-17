import BaseViewModel from "../BaseViewModel";

export default interface BlogViewModel extends BaseViewModel {
  allPosts: any;

  setTitlePost(value: string): void;

  setTextPost(value: string): void;

  setImageUrl(value: string): void;

  onCreateNewPost(): Promise<void>;

  onDeletePost(idItem: number): Promise<void>;
}
