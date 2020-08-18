import BaseViewModel from "../BaseViewModel";
import PostsResponse from "../../../data/models/blog/PostsResponse";

export default interface FullBlogViewModel extends BaseViewModel {
  postByIdData: PostsResponse[];
  isShowFieldsForChanges: boolean;

  setIsShowFieldsForChanges(value: boolean): void;

  setChangedTitle(value: string): void;

  setChangedImage(value: string): void;

  setChangedContent(value: string): void;

  onSubmitChangedPost(): Promise<void>;
}
