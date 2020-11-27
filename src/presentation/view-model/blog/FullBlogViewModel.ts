import BaseViewModel from "../BaseViewModel";
import PostResponse from "../../../data/models/blog/PostsResponse";

export default interface FullBlogViewModel extends BaseViewModel {
  postByIdData?: PostResponse;
  isShowDeleteModal: boolean;
  isShowFieldsForChanges: boolean;

  setIsShowFieldsForChanges(value: boolean): void;

  setChangedTitle(value: string): void;

  setChangedImage(value: string): void;

  setChangedContent(value: string): void;

  onSubmitChangedPost(postByIdData: PostResponse): Promise<void>;

  setIsShowDeleteModal(isShowDeleteModal: boolean): void;
}
