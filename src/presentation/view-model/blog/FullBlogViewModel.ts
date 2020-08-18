import BaseViewModel from "../BaseViewModel";
import PostsResponse from "../../../data/models/blog/PostsResponse";

export default interface FullBlogViewModel extends BaseViewModel {
  postByIdData: PostsResponse[];
}
